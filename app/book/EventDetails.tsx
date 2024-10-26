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

    const bookingDetails = () => {
        if (session?.user?.name === event?.title || session?.user.role === UserRole.ADMIN || session?.user.role === UserRole.HOST) {
            return (
                <>
                    <p className="font-bold">Guest:</p>
                    <div className={`flex flex-row gap-6 bg-[${event?.backgroundColor}]`}>
                        <Image src={event?.extendedProps.image_url || ''} className="rounded-full border-2 border-gray-300" width={28} height={28} alt={`${event?.title}'s profile picture`} />
                        {event?.title}
                    </div>
                    <p className="font-bold">When:</p>
                    <p>{event?.startStr}</p>
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