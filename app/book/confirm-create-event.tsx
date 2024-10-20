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
import { toast } from "sonner";

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
        } else {
            toast.error(r.message);
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
