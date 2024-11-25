import { Resend } from "resend";
import { render } from "@react-email/render";
import { CancelledEventToHostTemplate } from "@/components/emailToHostTemplates/CancelledEventToHostTemplate";
import { CreatedEventToHostTemplate } from "@/components/emailToHostTemplates/CreatedEventToHostTemplate";
import { CreatedUserToHostTemplate } from "@/components/emailToHostTemplates/CreatedUserToHostTemplate";
import { RevokedEventToHostTemplate } from "@/components/emailToHostTemplates/RevokedEventToHostTemplate";
import { EditedUserToHostTemplate } from "@/components/emailToHostTemplates/EditedUserToHostTemplate";

const resend = new Resend('re_XEEdCZRL_5BkBWPgE1fgmhDFG4j1ePBQ1');

type SendCancelledEmailProps = {
    hosts: string[],
    eventOwnerEmail: string,
    eventOwnerName: string,
    cancellerName?: string,
    eventDate: string
}
export async function sendCancelledEventEmailToHost({ hosts, eventOwnerEmail, eventOwnerName, cancellerName, eventDate }: SendCancelledEmailProps) {

    const html = await render(
        CancelledEventToHostTemplate({ eventOwnerName, eventOwnerEmail, cancellerName, eventDate }) as React.ReactElement,
    );

    try {
        const data = await resend.emails.send({
            from: 'A-frame pool house <host@devsandbox.in.rs>', //tenant domain
            to: hosts,
            subject: 'Reservation cancelled',
            html: html
        });
        // todo: add logger
        if (!data.error) {
            //todo: return { message: 'Email sent.' };
        }
    } catch (error) {
        console.log(error);

    }
}

type SendRevokedEmailProps = {
    hosts: string[],
    eventOwnerName: string;
    eventOwnerEmail: string;
    revokerName?: string;
    eventDate: string
}

export async function sendRevokedEmailToHost({ hosts, eventOwnerName, eventOwnerEmail, revokerName, eventDate }: SendRevokedEmailProps) {

    const html = await render(
        RevokedEventToHostTemplate({ eventOwnerName, eventOwnerEmail, revokerName, eventDate }) as React.ReactElement,
    );

    try {
        const data = await resend.emails.send({
            from: 'A-frame pool house <host@devsandbox.in.rs>', //tenant email
            to: hosts,
            subject: 'Reservation revoked',
            html: html
        });
        // todo: add logger
        if (!data.error) {
            //todo: return { message: 'Email sent.' };
        }
    } catch (error) {
        console.log(error);

    }
}

type SendCreatedEmailProps = {
    hosts: string[],
    eventOwnerEmail: string,
    eventOwnerName: string,
    eventDate: string
}

export async function sendCreatedEventEmailToHost({ hosts, eventOwnerEmail, eventOwnerName, eventDate }: SendCreatedEmailProps) {

    const html = await render(
        CreatedEventToHostTemplate({ eventOwnerName, eventOwnerEmail, eventDate }) as React.ReactElement,
    );

    try {
        const data = await resend.emails.send({
            from: 'A-frame pool house <host@devsandbox.in.rs>', //tenant email
            to: hosts,
            subject: 'Reservation created',
            html: html
        });
        // todo: add logger
        if (!data.error) {
            //todo: return { message: 'Email sent.' };
        }
    } catch (error) {
        console.log(error);

    }
}


type SendCreatedUserEmailProps = {
    hosts: string[],
    newUserMail: string,
    newUserName: string,
    origin?: string,
}

export async function sendCreatedUserEmailToHost({ hosts, newUserMail, newUserName, origin }: SendCreatedUserEmailProps) {

    const html = await render(
        CreatedUserToHostTemplate({ newUserName, newUserMail, origin }) as React.ReactElement,
    );

    try {
        const data = await resend.emails.send({
            from: 'A-frame pool house <host@devsandbox.in.rs>', //tenant email
            to: hosts,
            subject: 'User account created',
            html: html
        });
        // todo: add logger
        if (!data.error) {
            //todo: return { message: 'Email sent.' };
        }
    } catch (error) {
        console.log(error);

    }
}

export type SendUserUpdatedEmailProps = {
    hosts: string[],
    userChangedName: string,
    userChangedEmail: string,
    changes: Record<string, string | boolean>,
}

export async function sendUserEditedEmailToHost({ hosts, userChangedEmail, userChangedName, changes }: SendUserUpdatedEmailProps) {

    const html = await render(
        EditedUserToHostTemplate({ userChangedName, userChangedEmail, changes }) as React.ReactElement,
    );

    try {
        const data = await resend.emails.send({
            from: 'A-frame pool house <host@devsandbox.in.rs>', //tenant email
            to: hosts,
            subject: 'User account edited',
            html: html
        });
        // todo: add logger
        if (!data.error) {
            //todo: return { message: 'Email sent.' };
        }
    } catch (error) {
        console.log(error);

    }
}  