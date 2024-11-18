import { auth } from "@/auth";
import Profile from "./Profile";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function Page() {
    const session = await auth();

    return (
        <div className='h-screen w-full flex justify-center'>
            <Card className='flex flex-col rounded-lg bg-black/50 px-6 pb-4 pt-8 gap-4 border-0 text-white h-min w-full xl:w-3/4 items-center xl:items-start'>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent className="w-[-webkit-fill-available] justify-items-center">
                    <Profile
                        user={session?.user}
                        settings={{ editProfile: false, createEvent: true, cancelEvent: false, revokeEvent: false, sevenDayReminder: false, oneDayReminder: false }} />
                </CardContent>
            </Card>
        </div>
    );
}