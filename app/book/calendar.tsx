'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import Image from 'next/image'
import { useState } from 'react'
import ConfirmCreateEvent from './confirm-create-event'
import { toast } from 'sonner'

interface Props {
    events: { title: string; date: string; backgroundColor: string; borderColor: string; image_url: string; }[]
    addEvent: (date: string) => Promise<boolean | { errors: { user_id?: string[] | undefined; date?: string[] | undefined; }; message: string; } | { message: string; errors?: undefined; }>
}

const Calendar = ({ events = [], addEvent }: Props) => {

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('');

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


    const handleEventClick = (event: { event: { title: string, extendedProps: { [key: string]: string } } }) => {
        alert(event.event.title)
    }

    const renderEventContent = ({ event }: { event: { title: string, extendedProps: { [key: string]: string } } }) => {
        return (
            <div className={`
                text-center md:text-left md:items-left pt-1 md:p-2
            `}>
                <Image
                    src={event.extendedProps.image_url}
                    className="mx-auto rounded-full border-2 border-gray-300"
                    width={28}
                    height={28}
                    alt={`${event.title}'s profile picture`}
                />
                <p className='text-[10px] md:text-md whitespace-pre-line truncate'>{event.title}</p>
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
                // dayCellClassNames={'h-[100px] md:h-[160px] mb-0'}
                firstDay={1}
                // eventClassNames={'h-[64px] mb-0'}
                timeZone='UTC'

            />
            <ConfirmCreateEvent open={open} setOpen={setOpen} date={date} addEvent={addEvent} />
        </>
    )
}

export default Calendar;