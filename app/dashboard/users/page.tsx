import { fetchEventsForUser, fetchUserEmailsWithHostRole, fetchUsersWithoutEvents } from '@/app/lib/data';
import { Metadata } from 'next';
import UsersOverview from './UsersOverview';
import { sendUserEditedEmail } from '@/app/lib/mails';
import { User } from '@/app/lib/definitions';
import { sendUserEditedEmailToHost } from '@/app/lib/mailsForHost';
import { updateUser } from '@/app/lib/actions';

export const metadata: Metadata = {
    title: 'Users',
};
export default async function Page() {
    const allUsers = await fetchUsersWithoutEvents();
    const hosts = await fetchUserEmailsWithHostRole();

    const getEvents = async (userId: string) => {
        'use server';
        return await fetchEventsForUser(userId);
    }

    const changeRole = async ({ user, changes }: { user: Partial<User>; changes: Record<string, string>; }) => {
        'use server';
        const updatedUser = await updateUser(user.email!, changes);

        if (updatedUser.success) {
            await sendUserEditedEmail({ recipientMailAddress: user.email!, recipientName: user.name!, changes });
            await sendUserEditedEmailToHost({ hosts, userChangedEmail: user.email!, userChangedName: user.name!, changes });
        }
        return { success: updatedUser.success, message: updatedUser.message, description: updatedUser.description };
    };
    return <UsersOverview users={allUsers} getEvents={getEvents} changeRole={changeRole} />;
}
