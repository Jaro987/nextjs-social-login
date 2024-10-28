import { Metadata } from 'next';
import Calendar from './calendar';
import { Card, CardContent } from '@/components/ui/card';
import { fetchAllCalendarEvents, fetchAllCalendarEventsForAdmin } from '../lib/data';
import { Suspense } from 'react';
import { createEvent, deleteEvent } from '../lib/actions';
import { auth, getUser } from '@/auth';
import { CalendarEvent, UserRole } from '../lib/definitions';

export const metadata: Metadata = {
    title: 'Book',
};
export default async function Page() {
    const session = await auth();
    const events = session?.user?.role === UserRole.ADMIN || session?.user?.role === UserRole.HOST ? await fetchAllCalendarEventsForAdmin() : await fetchAllCalendarEvents();

    const formatEvents = (events: CalendarEvent[]) => {
        return events.map((e) => {
            return {
                id: e.event_id,
                title: e.name,
                date: e.date,
                backgroundColor: session?.user.role === UserRole.ADMIN || session?.user.role === UserRole.HOST || e.email === session?.user?.email ? e.color + '60' : '#87878760',
                borderColor: session?.user.role === UserRole.ADMIN || session?.user.role === UserRole.HOST || e.email === session?.user?.email ? e.color + '80' : '#87878760',
                image_url: e.image_url,
                email: e.email,
                myEvent: e.email === session?.user?.email,
                show: session?.user?.role === UserRole.ADMIN || session?.user?.role === UserRole.HOST,
                cancellations: e.cancellations
            }
        })
    }

    const addEvent = async (date: string) => {
        'use server'
        const user = await getUser(session?.user?.email as string);
        const eventData = new FormData();
        eventData.append('user_id', user?.id as string);
        eventData.append('date', date);
        const e = await createEvent(eventData);
        return e;

    }

    const cancelEvent = async (id: string, date: number) => {
        'use server'
        return await deleteEvent(id, date);
    }

    return (
        <Suspense fallback={'Loading...'}>
            <Card className="flex h-full w-full pt-4 xl:w-4/5 2xl:w-3/4 m-auto items-center justify-center text-[10px] md:text-2xl text-white bg-black/50 rounded-lg border-0">
                <CardContent>
                    <Calendar events={formatEvents(events)} addEvent={addEvent} cancelEvent={cancelEvent} />
                </CardContent>
            </Card>
        </Suspense>
    );

}
