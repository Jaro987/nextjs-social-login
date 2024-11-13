/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { date, z } from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { CreateEventError, EventStatus, UserRole } from './definitions';
import { auth, getUserByEmail } from '@/auth';

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

const EventSchema = z.object({
    user_id: z.string(),
    date: z.string(),
});

export async function createEvent(formData: FormData) {
    let response;
    const validatedFields = EventSchema.safeParse({
        user_id: formData.get('user_id'),
        date: formData.get('date'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Event.',
        };
    }
    const { user_id, date } = validatedFields.data;

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
        INSERT INTO calendar_events (date, user_id, status)
        VALUES (${date}, ${user_id}, ${EventStatus.ACTIVE})
      `;
    } catch (error) {
        console.log({ error });

        return {
            success: false,
            message: CreateEventError.NO_USER,
        };
    }
    revalidatePath('/book');
    return {
        success: true,
        message: 'Successfully created event!',
    };

}

export async function deactivateEvent(id: string, date: number) {
    const session = await auth();
    const canceller = await getUserByEmail(session?.user?.email as string);

    try {
        await sql`
            UPDATE calendar_events
            SET status = ${EventStatus.CANCELLED}
            WHERE id = ${id};
          `;
        await sql`
            INSERT INTO cancellation (event_id, cancelled_at, cancelled_by)
            VALUES (${id}, ${new Date(date).toISOString()}, ${canceller?.id});
          `
        revalidatePath('/book');
        return { message: 'Deleted Event.' };
    } catch (error) {
        console.log({ error });

        return { message: 'Database Error: Failed to Delete Event.' };
    }
}

export async function activateEvent(id: string, date: number) {
    const session = await auth();
    const revoker = await getUserByEmail(session?.user?.email as string);
    try {
        const res = await sql`
        SELECT date
        FROM calendar_events
        WHERE id = ${id};
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
        return { success: false, message: 'Database Error: Failed to Revoke Event.' };
    }
    try {
        await sql`BEGIN`;
        await sql`
            UPDATE calendar_events
            SET status = ${EventStatus.ACTIVE}
            WHERE id = ${id};
        `;
        await sql`
            UPDATE cancellation
            SET revoked_at = ${new Date(date).toISOString()}, revoked_by = ${revoker?.id}
            WHERE event_id = ${id} AND revoked_at IS NULL AND revoked_by IS NULL;
        `;
        await sql`COMMIT`;
        revalidatePath('/book');
        return { success: true, message: 'Event Successfully Revoked.' };

    } catch (error) {
        await sql`ROLLBACK`;
        return { success: false, message: 'Database Error: Failed to Revoke Event.' };
    }


}