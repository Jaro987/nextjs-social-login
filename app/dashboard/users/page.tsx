import { fetchAllUsersForAdmin } from '@/app/lib/data';
import { Metadata } from 'next';
import UsersOverview from './UsersOverview';

export const metadata: Metadata = {
    title: 'Users',
};
export default async function Page() {
    const allUsers = await fetchAllUsersForAdmin();
    return <UsersOverview users={allUsers} />;
}
