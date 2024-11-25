import { auth, getUserByEmail } from "@/auth";
import Profile from "./Profile";
import { Card, CardContent } from "@/components/ui/card";
import { fetchSettingsByUserId, fetchUserEmailsWithHostRole } from "../lib/data";
import { mapDBUserSettingsToUserSettings } from "../lib/utils";
import { sendUserEditedEmail, SendUserUpdatedEmailProps } from "../lib/mails";
import { sendUserEditedEmailToHost } from "../lib/mailsForHost";

export default async function Page() {
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email as string);
    const dbUserSettings = await fetchSettingsByUserId(user!.id as string);
    const userSettings = mapDBUserSettingsToUserSettings(dbUserSettings);
    const hosts = await fetchUserEmailsWithHostRole();

    async function sendMail({ recipientMailAddress, recipientName, changes }: SendUserUpdatedEmailProps) {
        'use server'
        await sendUserEditedEmail({ recipientMailAddress, recipientName, changes });
        await sendUserEditedEmailToHost({ hosts, userChangedEmail: recipientMailAddress, userChangedName: recipientName, changes });
    }

    return (
        <div className='h-screen w-full flex justify-center'>
            <Card className='flex flex-col rounded-lg bg-black/50 px-6 pb-4 pt-8 gap-4 border-0 text-white h-min w-full xl:w-3/4 items-center xl:items-start'>
                {/* <CardHeader>
                    <CardTitle>Profile</CardTitle>
                </CardHeader> */}
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