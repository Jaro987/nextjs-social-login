import { DialogHeader, Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image";

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
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Booking Details</DialogTitle>
                </DialogHeader>
                <p className="font-bold">Guest:</p>
                <div className={`flex flex-row gap-6 bg-[${event?.backgroundColor}]`}>
                    <Image src={event?.extendedProps.image_url || ''} className="rounded-full border-2 border-gray-300" width={28} height={28} alt={`${event?.title}'s profile picture`} />
                    {event?.title}
                </div>
                <p className="font-bold">When:</p>
                <p>{event?.startStr}</p>

            </DialogContent>
        </Dialog>

    )
}

export default EventDetails;