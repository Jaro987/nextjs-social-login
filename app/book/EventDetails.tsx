import { Button } from "@/components/ui/button";
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import Image from "next/image";
import { CalendarEventObj } from "../lib/definitions";

type Props = {
    open: boolean
    setOpen: (open: boolean) => void,
    event?: CalendarEventObj
    cancelEvent: (id: string, date: number) => Promise<{ message: string }>;
}

const EventDetails = ({ open, setOpen, event, cancelEvent }: Props) => {
    const { id, title, startStr, backgroundColor, extendedProps } = event || {};
    const { image_url, email, phone, show, myEvent, cancellations } = extendedProps || {};

    const formatDate = (dateStr?: string) => {
        if (!dateStr) {
            return '';
        }
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateStr));

    }

    const bookingDetails = () => {
        if (show) {
            return (
                <>
                    <p className="font-bold">Guest:</p>
                    <div className={`flex flex-row gap-6 bg-[${backgroundColor}]`}>
                        <Image src={image_url || ''} className="rounded-full border-2 border-gray-300" width={80} height={80} alt={`${title}'s profile picture`} />
                        <div className="flex flex-col">
                            <p>{title}</p>
                            <p>{email}</p>
                            <p>{phone}</p>
                        </div>
                    </div >
                    <p className="font-bold">Date:</p>
                    <p>{formatDate(startStr)}</p>
                    {/* TODO: format this UI nicely */}
                    {cancellations?.map((cancellation) => (
                        <div key={cancellation.cancelled_at}>
                            <p>{cancellation.cancelled_at}</p>
                            <p>{cancellation.cancelled_by}</p>
                        </div>
                    ))}
                </>
            )
        }
        if (myEvent) {
            return (
                <>
                    <p className="font-bold">Guest:</p>
                    <div className={`flex flex-row gap-6 bg-[${backgroundColor}]`}>
                        <Image src={image_url || ''} className="rounded-full border-2 border-gray-300" width={80} height={80} alt={`${title}'s profile picture`} />
                        <div className="flex flex-col">
                            <p>{title}</p>
                            <p>{email}</p>
                            <p>{phone}</p>
                        </div>
                    </div >
                    <p className="font-bold">Date:</p>
                    <p>{formatDate(startStr)}</p>
                </>
            )
        }
        return (
            <p>For privacy and security reasons, access to booking details is restricted to your own reservations only.</p>
        )
    }

    const deleteEvent = async (id: string) => {
        await cancelEvent(id, Date.now());
        setOpen(false);
    }

    const bookingFooter = () => {
        if (myEvent || show) {

            return (
                <DialogFooter>
                    <Button variant="destructive" onClick={() => deleteEvent(id || '')}>Cancel Booking</Button>
                </DialogFooter>)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Booking Details</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                {bookingDetails()}
                {bookingFooter()}
            </DialogContent>
        </Dialog>

    )
}

export default EventDetails;