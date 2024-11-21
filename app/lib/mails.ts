import { CancelledEventTemplate } from "@/components/emailTemplates/CancelledEvent";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { RevokedEventTemplate } from "@/components/emailTemplates/RevokedEvent";

const resend = new Resend(process.env.RESEND_API_KEY);

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