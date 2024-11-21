import { CancelledEventTemplate } from "@/components/emailTemplates/CancelledEvent";
import { Resend } from "resend";
import { render } from "@react-email/render";

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