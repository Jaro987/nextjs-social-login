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
import { CalendarEvent } from '../lib/definitions'
import AuthContext from '../AuthContext'

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
    }>
}

type EventObj = {
    title: string;
    backgroundColor: string;
    startStr: string;
    extendedProps: {
        [key: string]: string;
    }
}

const Calendar = ({ events = [], addEvent }: Props) => {

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('');
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [event, setEvent] = useState<EventObj | undefined>(undefined);

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


    const handleEventClick = (event: { event: EventObj }) => {
        setDetailsOpen(true);
        setEvent(event.event);
    }

    const renderEventContent = ({ event }: { event: EventObj }) => {

        return event.extendedProps.myEvent ? (
            <div className={`
                text-center pt-1 md:p-2
            `}>
                <Image
                    src={event.extendedProps.image_url}
                    className="mx-auto rounded-full border-2 border-gray-300"
                    width={28}
                    height={28}
                    alt={`${event.title}'s profile picture`}
                />
                <p className='text-[10px] md:text-base whitespace-pre-line truncate'>{event.title}</p>
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
        <AuthContext>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                contentHeight={'auto'}
                events={events}
                eventClick={handleEventClick}
                eventContent={(event) => renderEventContent(event)}
                // dayCellClassNames={'h-[100px] md:h-[160px] mb-0'}
                firstDay={1}
                // eventClassNames={'h-[64px] mb-0'}
                timeZone='UTC'

            />
            <ConfirmCreateEvent open={open} setOpen={setOpen} date={date} addEvent={addEvent} />
            <EventDetails open={detailsOpen} setOpen={setDetailsOpen} event={event} />
        </AuthContext>
    )
}

export default Calendar;