'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import Image from 'next/image'
import { useState } from 'react'
import ConfirmCreateEvent from './confirm-create-event'
import { toast } from 'sonner'
import { LockClosedIcon } from '@heroicons/react/24/outline';
import EventDetails from './EventDetails'
import { CalendarEvent, CalendarEventObj, EventStatus } from '../lib/definitions'
import { EventClickArg, EventContentArg } from '@fullcalendar/core/index.js'

interface Props {
    events: Partial<CalendarEvent>[]
    addEvent: (date: string) => Promise<{
        success: boolean;
        errors: {
            date?: string[] | undefined;
            user_id?: string[] | undefined;
        };
        message: string;
    } | {
        success: boolean;
        message: string;
        errors?: undefined;
    }>,
    cancelEvent: (id: string, date: number) => Promise<{ message: string }>
    revokeEvent: (id: string, date: number) => Promise<{ success: boolean; message: string }>
}

const Calendar = ({ events = [], addEvent, cancelEvent, revokeEvent }: Props) => {

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('');
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [event, setEvent] = useState<CalendarEventObj | undefined>(undefined);

    const handleDateClick = (arg: { date: Date }) => {
        const today = new Date();
        const selectedDate = new Date(arg.date);

        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            const niceDate = selectedDate.toLocaleDateString("en-US", {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            });
            return toast.error("Can't book a date from the past", {
                description: `${niceDate} is in the past!`,
            });
        }

        const formattedDate = arg.date.toISOString().split('T')[0];
        setOpen(true);
        setDate(formattedDate);
    }

    const handleEventClick = (arg: EventClickArg) => {
        const calendarEvent = arg.event as unknown as CalendarEventObj;
        setDetailsOpen(true);
        setEvent(calendarEvent);
    }
    const renderEventContent = (event: EventContentArg) => {
        const calendarEvent = event.event as unknown as CalendarEventObj;
        const show = calendarEvent?.extendedProps?.show;
        const myEvent = calendarEvent?.extendedProps?.myEvent;
        const image_url = calendarEvent?.extendedProps?.image_url;
        const status = calendarEvent?.extendedProps?.status;
        return show && status === EventStatus.CANCELLED ? ( // TODO: join 'show && status === EventStatus.CANCELLED' and 'show || myEvent' ???
            <div className={`
                text-center pt-1 md:p-2 relative
            `}>
                <Image
                    src={image_url}
                    className="mx-auto rounded-full border-2 border-gray-300"
                    width={28}
                    height={28}
                    alt={`${calendarEvent.title}'s profile picture`}
                />
                <p className='text-[10px] md:text-base whitespace-pre-line truncate'>{calendarEvent.title}</p>
                <div className='absolute top-[32px] left-0 -rotate-45 text-rose-600 border-2 border-rose-600 rounded bg-black/50'>CANCELLED</div>
            </div>
        ) :
            show || myEvent ? (
                <div className={`
                text-center pt-1 md:p-2
            `}>
                    <Image
                        src={image_url}
                        className="mx-auto rounded-full border-2 border-gray-300"
                        width={28}
                        height={28}
                        alt={`${calendarEvent.title}'s profile picture`}
                    />
                    <p className='text-[10px] md:text-base whitespace-pre-line truncate'>{calendarEvent.title}</p>
                </div>
            ) : (
                <div className={`
                text-center pt-1 md:p-2
            `}>
                    <LockClosedIcon className='w-8 mx-auto' />
                    <p className='text-[10px] md:text-base whitespace-pre-line truncate'>taken</p>
                </div>
            )
    }

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                contentHeight={'auto'}
                events={events}
                eventClick={handleEventClick}
                eventContent={(event) => renderEventContent(event)}
                firstDay={1}
                timeZone='local'

            />
            <ConfirmCreateEvent open={open} setOpen={setOpen} date={date} addEvent={addEvent} />
            <EventDetails open={detailsOpen} setOpen={setDetailsOpen} event={event} cancelEvent={cancelEvent} revokeEvent={revokeEvent} />
        </>
    )
}

export default Calendar;