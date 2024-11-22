import { auth, getUserByEmail } from "@/auth";
import Profile from "./Profile";
import { Card, CardContent } from "@/components/ui/card";
import { fetchSettingsByUserId } from "../lib/data";
import { mapDBUserSettingsToUserSettings } from "../lib/utils";
import { sendUserUpdatedEmail, SendUserUpdatedEmailProps } from "../lib/mails";

export default async function Page() {
    const session = await auth();
    const user = await getUserByEmail(session?.user?.email as string);
    const dbUserSettings = await fetchSettingsByUserId(user!.id as string);
    const userSettings = mapDBUserSettingsToUserSettings(dbUserSettings);

    async function sendMail({ recipientMailAddress, recipientName, changes }: SendUserUpdatedEmailProps) {
        'use server'
        await sendUserUpdatedEmail({ recipientMailAddress, recipientName, changes });
    }

    return (
        <div className='h-screen w-full flex justify-center'>
            <Card className='flex flex-col rounded-lg bg-black/50 px-6 pb-4 pt-8 gap-4 border-0 text-white h-min w-full xl:w-3/4 items-center xl:items-start'>
                {/* <CardHeader>
                    <CardTitle>Profile</CardTitle>
                </CardHeader> */}
                <CardContent className="w-[-webkit-fill-available] justify-items-center">
                    <Profile
                        user={session?.user}
                        settings={userSettings}
                        sendMail={sendMail}
                    />
                </CardContent>
            </Card>
        </div>
    );
}