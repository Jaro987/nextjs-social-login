'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import Image from 'next/image'

const Calendar = ({ events = [], addEvent }: { events: { title: string; date: string; backgroundColor: string; borderColor: string; image_url: string; }[], addEvent: (date: Date) => void }) => {

    const handleDateClick = (arg: { date: Date }) => {
        addEvent(arg.date)
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

        />
    )
}

export default Calendar;