import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { CreateEventError } from "../lib/definitions";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    date: string;
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

export default function ConfirmCreateEvent({ open, setOpen, date, addEvent }: Props) {
    const router = useRouter()

    const selectedDate = new Date(date);

    selectedDate.setHours(0, 0, 0, 0)
    const niceDate = selectedDate.toLocaleDateString("en-US", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    });

    const handleContinue = async () => {
        const r = await addEvent(date);
        setOpen(false);

        if (r.success) {
            toast.success(r.message);
        } else if (r.message === CreateEventError.NO_USER) {
            toast.warning('Did not book this date!', {
                description: 'You need to be logged in.',
                action: {
                    label: 'Take me to login',
                    onClick: () => router.push('/login')
                },
                duration: Infinity
            });
        } else if (r.message === CreateEventError.DATE_BOOKED) {
            toast.error('This date is already taken!');
        }
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Book this day?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will create book a stay in <strong>A frame pool house</strong> on {niceDate}.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
