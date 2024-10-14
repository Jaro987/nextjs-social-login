import { Metadata } from 'next';
import Calendar from './calendar';
import { Card, CardContent } from '@/components/ui/card';
import { fetchAllCalendarEvents } from '../lib/data';
import { Suspense } from 'react';
import { createEvent } from '../lib/actions';
import { auth, getUser } from '@/auth';
import { CalendarEvent } from '../lib/definitions';

export const metadata: Metadata = {
    title: 'Book',
};
export default async function Page() {
    const events = await fetchAllCalendarEvents();

    const session = await auth();

    const formatEvents = (events: CalendarEvent[]) => {
        return events.map((e) => {
            return {
                title: e.name,
                date: e.date,
                backgroundColor: e.color + '60',
                borderColor: e.color + '80',
                image_url: e.image_url
            }
        })
    }

    const addEvent = async (date: Date) => {
        'use server'
        const user = await getUser(session?.user?.email as string);
        const eventData = new FormData();
        const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
        eventData.append('user_id', user?.id as string);
        eventData.append('date', utcDate.toISOString());
        await createEvent(eventData);

    }

    return (
        <Suspense fallback={'Loading...'}>
            <Card className="flex h-full w-full p-4 xl:w-4/5 2xl:w-3/4 m-auto items-center justify-center text-2xl text-white bg-black/50 rounded-lg border-0">
                <CardContent>
                    <Calendar events={formatEvents(events)} addEvent={addEvent} />
                </CardContent>
            </Card>
        </Suspense>
    );

}
