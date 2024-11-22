import { CancelledEventTemplate } from "@/components/emailTemplates/CancelledEvent";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { RevokedEventTemplate } from "@/components/emailTemplates/RevokedEvent";
import { CreatedEventTemplate } from "@/components/emailTemplates/CreatedEvent";
import { CreatedUserTemplate } from "@/components/emailTemplates/CreatedUser";
import { EditedUserTemplate } from "@/components/emailTemplates/EditedUser";

const resend = new Resend('re_XEEdCZRL_5BkBWPgE1fgmhDFG4j1ePBQ1');

type SendCancelledEmailProps = {
    recipientMailAddress: string,
    recipientName: string,
    cancellerName?: string,
    eventDate: string
}
export async function sendCancelledEmail({ recipientMailAddress, recipientName, cancellerName, eventDate }: SendCancelledEmailProps) {

    const html = await render(
        CancelledEventTemplate({ recipientName, cancellerName, eventDate }) as React.ReactElement,
    );

    try {
        const data = await resend.emails.send({
            from: 'A-frame pool house <host@devsandbox.in.rs>', //tenant email
            to: [recipientMailAddress],
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
    recipientMailAddress: string,
    recipientName: string,
    revokerName?: string,
    eventDate: string
}

export async function sendRevokedEmail({ recipientMailAddress, recipientName, revokerName, eventDate }: SendRevokedEmailProps) {

    const html = await render(
        RevokedEventTemplate({ recipientName, revokerName, eventDate }) as React.ReactElement,
    );

    try {
        const data = await resend.emails.send({
            from: 'A-frame pool house <host@devsandbox.in.rs>', //tenant email
            to: [recipientMailAddress],
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

export async function sendCreatedEventEmail({ recipientMailAddress, recipientName, eventDate }: SendRevokedEmailProps) {

    const html = await render(
        CreatedEventTemplate({ recipientName, eventDate }) as React.ReactElement,
    );

    try {
        const data = await resend.emails.send({
            from: 'A-frame pool house <host@devsandbox.in.rs>', //tenant email
            to: [recipientMailAddress],
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
    recipientMailAddress: string,
    recipientName: string,
    origin?: string,
}

export async function sendCreatedUserEmail({ recipientMailAddress, recipientName, origin }: SendCreatedUserEmailProps) {

    const html = await render(
        CreatedUserTemplate({ recipientName, origin }) as React.ReactElement,
    );

    try {
        const data = await resend.emails.send({
            from: 'A-frame pool house <host@devsandbox.in.rs>', //tenant email
            to: [recipientMailAddress],
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
    recipientMailAddress: string,
    recipientName: string,
    changes: Record<string, string | boolean>,
}

export async function sendUserUpdatedEmail({ recipientMailAddress, recipientName, changes }: SendUserUpdatedEmailProps) {
    const html = await render(
        EditedUserTemplate({ recipientName, changes }) as React.ReactElement,
    );

    try {
        const data = await resend.emails.send({
            from: 'A-frame pool house <host@devsandbox.in.rs>', //tenant email
            to: [recipientMailAddress],
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