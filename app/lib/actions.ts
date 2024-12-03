/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { date, z } from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { CreateEventError, EventStatus, UserRole, UserSettings } from './definitions';
import { auth, getUserByEmail } from '@/auth';
import { sendCancelledEventEmail, sendCreatedEventEmail, sendRevokedEmail } from './mails';
import { fetchUserEmailsWithHostRole, getUserMailSettingsByEmail } from './data';
import { sendCancelledEventEmailToHost, sendCreatedEventEmailToHost, sendRevokedEmailToHost } from './mailsForHost';
import logToFile from './logger';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
    eventId: z.string().optional(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};


export async function createInvoice(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
        eventId: formData.get('eventId'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { customerId, amount, status, eventId } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date, event_id)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date}, ${eventId})
      `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    revalidatePath('/dashboard/invoices');
    return {
        success: true,
        message: 'Created Invoice.',
    };
}

export async function createInvoiceWithRedirect(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function updateInvoice(
    id: string,
    prevState: State,
    formData: FormData,
) {
    logToFile(`Update Invoice attempt by ${formData.get('customerId')} with amount ${formData.get('amount')} and status ${formData.get('status')}`);
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;

    try {
        await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
    } catch (error) {
        logToFile('Updated Invoice fail');

        return { message: 'Database Error: Failed to Update Invoice.' };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return { message: 'Deleted Invoice.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' };
    }
}


const UserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    image: z.string(),
    password: z.string(),
    role: z.enum([UserRole.ADMIN, UserRole.HOST, UserRole.USER], { invalid_type_error: 'Invalid role.' }),
});

export async function createUser(formData: FormData) {
    const validatedFields = UserSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        image: formData.get('image'),
        role: formData.get('role'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create User.',
        };
    }

    const { name, email, image, password, role } = validatedFields.data;
    try {
        return await sql`
        INSERT INTO users (name, email, password, image_url, role)
        VALUES (${name}, ${email}, ${password}, ${image}, ${role})
      `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create User.',
        };
    }
}

const UpdateUserSchema = z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    phone: z.string().optional(),
});

export async function updateUser(userEmail: string, updates: Record<string, unknown>) {
    const validatedFields = UpdateUserSchema.safeParse(updates);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid Fields. Failed to Update User.',
        };
    }

    const { name, image, phone } = validatedFields.data;

    let query = 'UPDATE users SET ';


    const fields: string[] = [];

    if (name !== undefined) fields.push(`name = '${name}'`);
    if (image !== undefined) fields.push(`image_url = '${image}'`);
    if (phone !== undefined) fields.push(`phone = '${phone}'`);

    if (fields.length === 0) {
        return {
            success: false,
            message: 'No fields to update.',
        }
    }

    query += fields.join(', ') + ` WHERE email = '${userEmail}';`

    try {
        const r = await sql.query(query);
        if (r.rowCount > 0) {
            return {
                success: true,
                message: 'User Updated Successfully.',
                description: "Log in again to see the changes.",
            }
        }
        return {
            success: false,
            message: 'Updating User Failed. Please Try Again.',
        }

    } catch (error) {
        return {
            success: false,
            message: 'Updating User Failed. Please Try Again.',
        }
    }
}


const EventSchema = z.object({
    user_id: z.string(),
    date: z.string(),
    adults: z.coerce.number(),
    children: z.coerce.number(),
    infants: z.coerce.number(),
    price: z.coerce.number(),
});

export async function createEvent(formData: FormData) {
    const session = await auth();
    const hosts = await fetchUserEmailsWithHostRole();
    const recipientMailSettings = await getUserMailSettingsByEmail({ email: session?.user?.email as string });

    let response;
    const validatedFields = EventSchema.safeParse({
        user_id: formData.get('user_id'),
        date: formData.get('date'),
        price: formData.get('price'),
        adults: formData.get('adults'),
        children: formData.get('children'),
        infants: formData.get('infants'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Event.',
        };
    }
    const { user_id, date, price, adults, children, infants } = validatedFields.data;

    try {
        const existingEvent = await sql`
                SELECT * FROM calendar_events
                WHERE date = ${date} AND status = ${EventStatus.ACTIVE}
            `;

        if (existingEvent.rowCount > 0) {
            return {
                success: false,
                message: CreateEventError.DATE_BOOKED,
            };
        }
        response = await sql`
        INSERT INTO calendar_events (date, user_id, status, adults, children, infants, price)
        VALUES (${date}, ${user_id}, ${EventStatus.ACTIVE}, ${adults}, ${children}, ${infants}, ${price * 100})
        RETURNING *
      `;
    } catch (error) {
        console.log({ error });

        return {
            success: false,
            message: CreateEventError.NO_USER,
        };
    }
    if (recipientMailSettings?.createMyEvent) {
        const r = await sendCreatedEventEmail({ recipientMailAddress: session?.user?.email, recipientName: session?.user?.name, eventDate: date });
    }
    const r2 = await sendCreatedEventEmailToHost({ hosts, eventOwnerEmail: session?.user?.email, eventOwnerName: session?.user?.name, eventDate: date });

    revalidatePath('/book');
    return {
        success: true,
        message: 'Successfully created event!',
        id: response.rows[0].id,
    };

}

type EventManipulationType = {
    eventId: string;
    recipientMailAddress: string;
    recipientName: string;
    date: number;
    eventDate: string
}
export async function deactivateEvent({ eventId, recipientMailAddress, recipientName, date, eventDate }: EventManipulationType) {
    const session = await auth();
    const canceller = await getUserByEmail(session?.user?.email as string);
    const hosts = await fetchUserEmailsWithHostRole();
    const recipientMailSettings = await getUserMailSettingsByEmail({ email: recipientMailAddress });

    try {
        //TODO: try sql.emit or dispatch or something used eariler for sequential requests
        await sql`
            UPDATE calendar_events
            SET status = ${EventStatus.CANCELLED}
            WHERE id = ${eventId};
          `;
        await sql`
            INSERT INTO cancellation (event_id, cancelled_at, cancelled_by)
            VALUES (${eventId}, ${new Date(date).toISOString()}, ${canceller?.id});
          `;
        if (recipientMailSettings?.cancelMyEvent) {
            const r = await sendCancelledEventEmail({ recipientMailAddress, recipientName, cancellerName: canceller?.name, eventDate });
        }
        const r2 = await sendCancelledEventEmailToHost({ hosts, eventOwnerEmail: recipientMailAddress, eventOwnerName: recipientName, cancellerName: canceller?.name, eventDate });
        revalidatePath('/book');
        return { message: 'Deleted Event.' };
    } catch (error) {
        console.log({ error });

        return { message: 'Database Error: Failed to Delete Event.' };
    }
}

export async function activateEvent({ eventId, recipientMailAddress, recipientName, date, eventDate }: EventManipulationType) {
    const session = await auth();
    const revoker = await getUserByEmail(session?.user?.email as string);
    const hosts = await fetchUserEmailsWithHostRole();
    const recipientMailSettings = await getUserMailSettingsByEmail({ email: recipientMailAddress });

    try {
        const res = await sql`
        SELECT date
        FROM calendar_events
        WHERE id = ${eventId};
        `

        const activeEvent = await sql`
        SELECT *
        FROM calendar_events
        WHERE date = ${res.rows[0].date} AND status = ${EventStatus.ACTIVE};
        `

        if (activeEvent.rowCount > 0) {
            return { success: false, message: 'Date already booked.' };

        }

    } catch (error) {
        console.log({ error });

        return { success: false, message: 'Database Error: Failed to Revoke Event.' };
    }
    try {
        await sql`BEGIN`;
        await sql`
        UPDATE calendar_events
        SET status = ${EventStatus.ACTIVE}
        WHERE id = ${eventId};
        `;
        await sql`
        UPDATE cancellation
        SET revoked_at = ${new Date(date).toISOString()}, revoked_by = ${revoker?.id}
        WHERE event_id = ${eventId} AND revoked_at IS NULL AND revoked_by IS NULL;
        `;
        await sql`COMMIT`;
        if (recipientMailSettings?.revokeMyEvent) {
            const r = await sendRevokedEmail({ recipientMailAddress, recipientName, revokerName: revoker?.name, eventDate });
        }
        const r2 = await sendRevokedEmailToHost({ hosts, eventOwnerEmail: recipientMailAddress, eventOwnerName: recipientName, revokerName: revoker?.name, eventDate });
        revalidatePath('/book');
        return { success: true, message: 'Event Successfully Revoked.' };

    } catch (error) {
        await sql`ROLLBACK`;
        return { success: false, message: 'Database Error: Failed to Revoke Event.' };
    }
}


export async function createUserSettings({ userId }: { userId?: string }) {
    try {
        return await sql`
        INSERT INTO user_settings (user_id, create_profile, edit_my_profile, create_my_event, cancel_my_event, revoke_my_event, seven_day_reminder, one_day_reminder)
        VALUES (${userId}, true, true, true, true, true, true, true)
      `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create User.',
        };
    }
}


const UpdateUserSettingsSchema = z.object({
    editMyProfile: z.boolean().optional(),
    createMyEvent: z.boolean().optional(),
    cancelMyEvent: z.boolean().optional(),
    revokeMyEvent: z.boolean().optional(),
    sevenDayReminder: z.boolean().optional(),
    oneDayReminder: z.boolean().optional(),
});

export async function updateUserSettings({ id, newSettings }: { id: string, newSettings: Partial<UserSettings> }) {
    const validatedFields = UpdateUserSettingsSchema.safeParse(newSettings);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Invalid Fields. Failed to Update User Settings.',
        };
    }

    const { editMyProfile, createMyEvent, cancelMyEvent, revokeMyEvent, sevenDayReminder, oneDayReminder } = validatedFields.data;

    let query = 'UPDATE user_settings SET ';


    const fields: string[] = [];

    if (editMyProfile !== undefined) fields.push(`edit_my_profile = '${editMyProfile}'`);
    if (createMyEvent !== undefined) fields.push(`create_my_event = '${createMyEvent}'`);
    if (cancelMyEvent !== undefined) fields.push(`cancel_my_event = '${cancelMyEvent}'`);
    if (revokeMyEvent !== undefined) fields.push(`revoke_my_event = '${revokeMyEvent}'`);
    if (sevenDayReminder !== undefined) fields.push(`seven_day_reminder = '${sevenDayReminder}'`);
    if (oneDayReminder !== undefined) fields.push(`one_day_reminder = '${oneDayReminder}'`);

    if (fields.length === 0) {
        return {
            success: false,
            message: 'No fields to update.',
        }
    }

    query += fields.join(', ') + ` WHERE id = '${id}';`

    try {
        const r = await sql.query(query);
        if (r.rowCount > 0) {
            return {
                success: true,
                message: 'User Settings Updated Successfully.',
            }
        }
        return {
            success: false,
            message: 'Updating User Settings Failed. Please Try Again.',
        }

    } catch (error) {
        return {
            success: false,
            message: 'Updating User Settings Failed. Please Try Again.',
        }
    }
}