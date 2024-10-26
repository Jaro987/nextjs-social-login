import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from "next/image";
import { useSession } from 'next-auth/react';
import { UserRole } from "../lib/definitions";

type Props = {
    open: boolean
    setOpen: (open: boolean) => void,
    event?: {
        title: string;
        startStr: string;
        backgroundColor: string;
        extendedProps: {
            [key: string]: string;
        };
    }
}

const EventDetails = ({ open, setOpen, event }: Props) => {
    const { data: session } = useSession();

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
        if (session?.user?.name === event?.title || session?.user.role === UserRole.ADMIN || session?.user.role === UserRole.HOST) {
            return (
                <>
                    <p className="font-bold">Guest:</p>
                    <div className={`flex flex-row gap-6 bg-[${event?.backgroundColor}]`}>
                        <Image src={event?.extendedProps.image_url || ''} className="rounded-full border-2 border-gray-300" width={80} height={80} alt={`${event?.title}'s profile picture`} />
                        <div className="flex flex-col">
                            <p>{event?.title}</p>
                            <p>{event?.extendedProps.email}</p>
                            <p>{event?.extendedProps.phone}</p>
                        </div>
                    </div >
                    <p className="font-bold">Date:</p>
                    <p>{formatDate(event?.startStr)}</p>
                </>
            )
        }
        return (
            <p>For privacy and security reasons, access to booking details is restricted to your own reservations only.</p>
        )
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Booking Details</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                {bookingDetails()}

            </DialogContent>
        </Dialog>

    )
}

export default EventDetails;