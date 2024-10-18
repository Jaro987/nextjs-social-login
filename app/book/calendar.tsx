'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import Image from 'next/image'

type Props = {
    events: { title: string; date: string; backgroundColor: string; borderColor: string; image_url: string; }[],
    addEvent: (date: string) => void
}

const Calendar = ({ events = [], addEvent }: Props) => {

    const handleDateClick = (arg: { date: Date }) => {
        const formattedDate = arg.date.toISOString().split('T')[0];
        console.log(formattedDate)
        console.log(new Date(formattedDate))
        addEvent(formattedDate);
    }
    const handleEventClick = (event: { event: { title: string, extendedProps: { [key: string]: string } } }) => {
        alert(event.event.title)
    }

    const renderEventContent = ({ event }: { event: { title: string, extendedProps: { [key: string]: string } } }) => {

        return (
            <div className="flex flex-col items-left p-2 w-[130px]">
                <Image
                    src={event.extendedProps.image_url}
                    className="mr-2 rounded-full"
                    width={28}
                    height={28}
                    alt={`${event.title}'s profile picture`}
                />
                <p className='text-md whitespace-pre-line truncate'>{event.title}</p>
            </div>
        )
    }

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            contentHeight={'auto'}
            events={events}
            eventClick={(event) => handleEventClick(event)}
            eventContent={(event) => renderEventContent(event)}
            dayCellClassNames={'h-[162px] mb-0'}
            firstDay={1}
            eventClassNames={'h-[90px] mb-0'}
            timeZone='UTC'
        />
    )
}

export default Calendar;