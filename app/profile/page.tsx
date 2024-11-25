import { auth } from "@/auth";
import Profile from "./Profile";
import { Card, CardContent } from "@/components/ui/card";
import { fetchUserEmailsWithHostRole, getUserMailSettingsByEmail } from "../lib/data";
import { sendUserEditedEmail, SendUserUpdatedEmailProps } from "../lib/mails";
import { sendUserEditedEmailToHost } from "../lib/mailsForHost";
import { UserSettings } from "../lib/definitions";

export default async function Page() {
    const session = await auth();
    const hosts = await fetchUserEmailsWithHostRole();
    const userSettings = await getUserMailSettingsByEmail({ email: session?.user?.email as string }) as UserSettings;

    async function sendMail({ recipientMailAddress, recipientName, changes }: SendUserUpdatedEmailProps) {
        'use server'
        if (userSettings.editMyProfile) {
            await sendUserEditedEmail({ recipientMailAddress, recipientName, changes });
        }
        await sendUserEditedEmailToHost({ hosts, userChangedEmail: recipientMailAddress, userChangedName: recipientName, changes });
    }

    return (
        <div className='h-screen w-full flex justify-center'>
            <Card className='flex flex-col rounded-lg bg-black/50 px-6 pb-4 pt-8 gap-4 border-0 text-white h-min w-full xl:w-3/4 items-center xl:items-start'>
                <CardContent className="w-[-webkit-fill-available] justify-items-center">
                    {session?.user && <Profile
                        user={session.user}
                        settings={userSettings}
                        sendMail={sendMail}
                    />}
                </CardContent>
            </Card>
        </div>
    );
}