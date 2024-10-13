import dynamic from 'next/dynamic';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';


const Map = dynamic(() => import('./map'), {
    ssr: false,
});

export default function Page() {
    return (
        <main className='h-screen w-full flex justify-center'>
            <Card className='flex flex-col rounded-lg bg-black/50 px-6 pb-4 pt-8 gap-4 border-0 text-white h-min w-3/4 xl:w-min'>
                <CardHeader>
                    <CardTitle>Contact</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col xl:flex-row gap-12'>
                        <div className='flex justify-center'>
                            <Map />
                        </div>
                        <div className='flex flex-col gap-6'>
                            <div>
                                <p className='font-bold'>Address</p>
                                <div className='flex flex-row gap-2'>
                                    <MapPinIcon className='w-6 h-6' />
                                    <p>Dragoslava Srejovića 93V</p>
                                </div>
                            </div>
                            <div>
                                <p className='font-bold'>Phone number</p>
                                <div className='flex flex-row gap-2'>
                                    <PhoneIcon className='w-6 h-6' />
                                    <p>060123654</p>
                                </div>
                            </div>
                            <div>
                                <p className='font-bold'>Email address</p>
                                <div className='flex flex-row gap-2'>
                                    <EnvelopeIcon className='w-6 h-6' />
                                    <p>JnF4H@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}