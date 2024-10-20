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
                backgroundColor: e.email === session?.user?.email ? e.color + '60' : '#87878760',
                borderColor: e.email === session?.user?.email ? e.color + '80' : '#87878760',
                image_url: e.image_url,
                myEvent: e.email === session?.user?.email
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

    return (
        <Suspense fallback={'Loading...'}>
            <Card className="flex h-full w-full pt-4 xl:w-4/5 2xl:w-3/4 m-auto items-center justify-center text-[10px] md:text-2xl text-white bg-black/50 rounded-lg border-0">
                <CardContent>
                    <Calendar events={formatEvents(events)} addEvent={addEvent} />
                </CardContent>
            </Card>
        </Suspense>
    );

}
