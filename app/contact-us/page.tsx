import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import MapDynamic from './map-dynamic';
import { fetchUserEmailsWithHostRole } from "../lib/data";

export const metadata: Metadata = {
    title: 'Contact us',
};

export default async function Page() {

    const hosts = await fetchUserEmailsWithHostRole();
    return (
        <div className='w-full'>
            <Card className='flex flex-col rounded-lg bg-black/50 pb-4 pt-8 gap-4 border-0 text-white h-min'>
                <CardHeader>
                    <CardTitle>Contact</CardTitle>
                </CardHeader>
                <CardContent className="flex self-center">
                    <div className='flex flex-col lg:flex-row gap-12'>
                        <div className=''>
                            <MapDynamic />
                        </div>
                        <div className='flex flex-col gap-6'>
                            <div>
                                <p className='font-bold'>Address</p>
                                <div className='flex flex-row gap-2'>
                                    <MapPinIcon className='w-6 h-6' />
                                    <p>Dr.Radivoja Simonovića 10, Ledinci 21207</p>
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
                                {hosts.map((host) => (
                                    <div key={host} className='flex flex-row gap-2'>
                                        <EnvelopeIcon className='w-6 h-6' />
                                        <p>{host}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}