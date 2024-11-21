import { Button } from "@/components/ui/button";
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import Image from "next/image";
import { CalendarEventObj, EventStatus } from "../lib/definitions";
import { formatDateToLocal } from "../lib/utils";
import { ArrowUturnDownIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

type Props = {
    open: boolean
    setOpen: (open: boolean) => void,
    event?: CalendarEventObj
    cancelEvent: ({ eventId, recipientMailAddress, recipientName, date, eventDate }: { eventId: string, recipientMailAddress: string, recipientName: string, date: number, eventDate: string }) => Promise<{ message: string }>
    revokeEvent: (id: string, date: number) => Promise<{ success: boolean; message: string }>
}

const EventDetails = ({ open, setOpen, event, cancelEvent, revokeEvent }: Props) => {
    const { id, title, startStr, backgroundColor, extendedProps } = event || {};
    const { image_url, email, phone, show, myEvent, cancellations, status } = extendedProps || {};

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
                    <p>{formatDateToLocal({ dateStr: startStr })}</p>
                    {cancellations && cancellations?.length > 0 && <p className="font-bold">History:</p>}
                    {cancellations?.map((cancellation) => (
                        <div key={cancellation.cancelled_at} className="flex flex-col">
                            <div className="flex flex-row gap-2">
                                <XCircleIcon className="w-4 pt-1" color="red" />
                                <p className="text-red-500">Cancelled on {formatDateToLocal({ dateStr: cancellation.cancelled_at, withTime: true })} by {cancellation.cancelled_by}</p>
                            </div>
                            {cancellation.revoked_at &&
                                <div className="flex flex-row gap-2 ml-4">
                                    <ArrowUturnDownIcon className="w-4 pt-1" color="green" />
                                    <p className="text-green-500">Revoked on {formatDateToLocal({ dateStr: cancellation.revoked_at, withTime: true })} by {cancellation.revoked_by}</p>
                                </div>
                            }
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
                    <p>{formatDateToLocal({ dateStr: startStr })}</p>
                </>
            )
        }
        return (
            <p>For privacy and security reasons, access to booking details is restricted to your own reservations only.</p>
        )
    }

    const deleteEvent = async () => {
        await cancelEvent({ eventId: id!, recipientMailAddress: email!, recipientName: title!, date: Date.now(), eventDate: startStr! });
        setOpen(false);
    }

    const undoDelete = async (id: string) => {
        const r = await revokeEvent(id, Date.now());

        if (r.success) {
            toast.success(r.message);
        } else {
            toast.error(r.message, {
                description: 'Please try again later or contact your host.'
            });
        }
        setOpen(false);
    }

    const bookingFooter = () => {
        const isPastEvent = event?.startStr && event?.startStr <= new Date().toISOString().split('T')[0];
        if (isPastEvent) {
            return <></>
        }
        if ((myEvent || show) && status === EventStatus.ACTIVE) {

            return (
                <DialogFooter>
                    <Button variant="destructive" onClick={() => deleteEvent()}>Cancel Reservation</Button>
                </DialogFooter>)
        } else if (show && status === EventStatus.CANCELLED) {
            return (
                <DialogFooter>
                    <Button className="text-white bg-green-500" onClick={() => undoDelete(id || '')}>Revoke Reservation</Button>
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