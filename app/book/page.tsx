import { Metadata } from 'next';
import Calendar from './calendar';
import { Card, CardContent } from '@/components/ui/card';
import { fetchAllCalendarEvents, fetchAllCalendarEventsForAdminOrHost } from '../lib/data';
import { Suspense } from 'react';
import { activateEvent, createEvent, createInvoice, deactivateEvent } from '../lib/actions';
import { auth, getUserByEmail } from '@/auth';
import { CalendarEvent, CreateEventError, UserRole } from '../lib/definitions';

export const metadata: Metadata = {
    title: 'Book',
};
export default async function Page() {
    const session = await auth();
    const events = session?.user?.role === UserRole.ADMIN || session?.user?.role === UserRole.HOST ? await fetchAllCalendarEventsForAdminOrHost() : await fetchAllCalendarEvents();

    const formatEvents = (events: CalendarEvent[]) => {
        return events.map((e) => {
            return {
                id: e.event_id,
                title: e.name,
                date: e.date,
                backgroundColor: session?.user.role === UserRole.ADMIN || session?.user.role === UserRole.HOST || e.email === session?.user?.email ? e.color + '60' : '#87878760',
                borderColor: session?.user.role === UserRole.ADMIN || session?.user.role === UserRole.HOST || e.email === session?.user?.email ? e.color + '80' : '#87878780',
                image_url: e.image_url,
                email: e.email,
                myEvent: e.email === session?.user?.email,
                show: session?.user?.role === UserRole.ADMIN || session?.user?.role === UserRole.HOST,
                cancellations: e.cancellations,
                status: e.status,
                adults: e.adults,
                children: e.children,
                infants: e.infants,
                price: e.price
            }
        })
    }

    const addEvent = async (date: string, adults: number, children: number, infants: number, price: number) => {
        'use server'
        const user = await getUserByEmail(session?.user?.email as string);
        if (!user) {
            return { success: false, message: CreateEventError.NO_USER };
        };
        const eventData = new FormData();
        eventData.append('user_id', user?.id as string);
        eventData.append('date', date);
        eventData.append('adults', adults.toString());
        eventData.append('children', children.toString());
        eventData.append('infants', infants.toString());
        eventData.append('price', price.toString());
        const newEvent = await createEvent(eventData);
        if (newEvent.success && newEvent.id) {
            const invoiceData = new FormData();
            invoiceData.append('customerId', user?.id as string);
            invoiceData.append('amount', price.toString());
            invoiceData.append('status', 'pending');
            invoiceData.append('eventId', newEvent.id);
            const newInvoice = await createInvoice({}, invoiceData);
            if (newInvoice.success) {
                return { success: true, message: 'Event and pending invoice created.' };
            }
        }
        return newEvent;
    }

    const cancelEvent = async ({ eventId, recipientMailAddress, recipientName, date, eventDate }: { eventId: string, recipientMailAddress: string, recipientName: string, date: number, eventDate: string }) => {
        'use server'
        return await deactivateEvent({ eventId, recipientMailAddress, recipientName, date, eventDate });
    }

    const revokeEvent = async ({ eventId, recipientMailAddress, recipientName, date, eventDate }: { eventId: string, recipientMailAddress: string, recipientName: string, date: number, eventDate: string }) => {
        'use server'
        return await activateEvent({ eventId, recipientMailAddress, recipientName, date, eventDate });
    }

    return (
        <Suspense fallback={'Loading...'}>
            <Card className="flex h-full w-full pt-4 xl:w-4/5 2xl:w-3/4 m-auto items-center justify-center text-[10px] md:text-2xl text-white bg-black/50 rounded-lg border-0">
                <CardContent>
                    <Calendar events={formatEvents(events)} addEvent={addEvent} cancelEvent={cancelEvent} revokeEvent={revokeEvent} />
                </CardContent>
            </Card>
        </Suspense>
    );

}
