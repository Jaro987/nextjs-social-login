import { fetchEventsForUser, fetchUsersWithoutEvents } from '@/app/lib/data';
import { Metadata } from 'next';
import UsersOverview from './UsersOverview';

export const metadata: Metadata = {
    title: 'Users',
};
export default async function Page() {
    const allUsers = await fetchUsersWithoutEvents();
    const getEvents = async (userId: string) => {
        'use server';
        return await fetchEventsForUser(userId);
    }
    return <UsersOverview users={allUsers} getEvents={getEvents} />;
}
