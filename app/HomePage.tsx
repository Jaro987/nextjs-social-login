'use client'

import { inter, oranienbaum } from '@/app/ui/fonts';
import More from './ui/icons/More';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerDescription, DrawerTitle } from '@/components/ui/drawer';
import { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import SetGuests from '@/components/SetGuests';
import { allAmenities, featuredAmenities } from './Amenities';
import { ScrollArea } from '@/components/ui/scroll-area';

function makeAmenityIcon(amenity: { icon: React.ReactNode, name: string }) {
    return (
        <div key={amenity.name} className="flex flex-col items-center">
            <div className="bg-transparent p-2 rounded-xl border-2">
                {amenity.icon}
            </div>
            <div style={{ height: "calc(2 * 1.25rem)" }}>
                <p className="text-gray-400 text-sm md:text-base text-center">{amenity.name}</p>
            </div>
        </div>
    )
}

export default function HomePage() {

    const [visibleAmenities, setVisibleAmenities] = useState(featuredAmenities);

    useEffect(() => {
        const updateVisibleAmenities = () => {
            const isWide = window.matchMedia("(min-width: 768px)").matches;
            setVisibleAmenities(isWide ? featuredAmenities : featuredAmenities.slice(0, 5));
        };

        updateVisibleAmenities();
        window.addEventListener("resize", updateVisibleAmenities);
        return () => window.removeEventListener("resize", updateVisibleAmenities);
    }, []);


    const amenitiesMemoized = useMemo(() => {
        return (
            <>
                {visibleAmenities.map((amenity) => {
                    return makeAmenityIcon(amenity)
                })}
                <div className="flex flex-col items-center">
                    <div className="bg-transparent p-2 rounded-xl border-2 h-[44px]">
                        <Drawer>
                            <DrawerTrigger>
                                <More />
                            </DrawerTrigger>
                            <DrawerContent className="bg-black max-h-screen">
                                <div className="mx-auto w-full">
                                    <DrawerHeader className='text-white'>
                                        <DrawerTitle>Amenities</DrawerTitle>
                                        <DrawerDescription>available at your stay</DrawerDescription>
                                    </DrawerHeader>
                                    <ScrollArea className="h-[60vh] px-4">
                                        <div className="grid grid-cols-3 md:grid-cols-8 xl:grid-cols-12 md:gap-4 mt-8 items-end">
                                            {allAmenities.map((amenity) => {
                                                return makeAmenityIcon(amenity)
                                            })}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </div>
                    <div style={{ height: "calc(2 * 1.25rem)" }}>
                        <p className="text-gray-400 text-center">more</p>
                    </div>
                </div></>)
    }, [visibleAmenities])

    useEffect(() => {
        const jsMain = document.getElementById("js-main");
        const descriptionHeight = document.getElementById("description")?.offsetHeight || 0;

        const updateHeight = () => {
            if (jsMain) {
                const headerHeight = document.querySelector("header")?.offsetHeight || 0;
                const availableHeight = window.innerHeight - headerHeight;

                if (availableHeight - descriptionHeight < 0) {
                    jsMain.style.height = `${descriptionHeight}px`;
                } else {
                    jsMain.style.height = `${availableHeight}px`;
                }
            }
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);
        window.addEventListener("orientationchange", updateHeight);

        return () => {
            window.removeEventListener("resize", updateHeight);
            window.removeEventListener("orientationchange", updateHeight);
        };
    }, []);


    return (
        <main className={`flex flex-col justify-end p-6 text-white bg-gradient-to-t from-black via-transparent to-transparent`} id='js-main'>
            <div className='flex flex-col md:flex-row gap-[40px] justify-center' id='description'>
                <div>
                    <div className='flex flex-row items-end self-start'>
                        <p className='text-gray-400 mr-2'>from</p>
                        <p className={`${inter.className} text-xl font-bold`}>€180</p>
                        <p className='text-gray-400'>/night</p>
                        <Dialog>
                            <DialogTrigger>
                                <p className='text-gray-400 ml-2'>(set guests)</p>
                            </DialogTrigger>
                            <DialogContent className='bg-black'>
                                <DialogHeader>
                                    <DialogTitle className='text-white'>Set guests</DialogTitle>
                                </DialogHeader>
                                <DialogDescription>Who will be staying?</DialogDescription>
                                <div className='flex flex-col items-center text-white gap-4'>
                                    <SetGuests />
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <h1 className={`text-[31px] md:text-[48px] ${oranienbaum.className} self-start max-w-[768px]`}>Your go-to spot to relax, hang out, and unwind</h1>
                    <p className="text-gray-400 text-[12px] md:text-sm max-w-[768px] text-justify">The A-frame Pool House is a modern, beautiful getaway just 13 minutes from Novi Sad. It’s located 9 km from the city center, in Ledinci. The house features a large grassy yard, a playground for kids, over 15 outdoor seating spots, cozy garden furniture, sound system, internet, WiFi, Netflix, and HBO, plus a fully equipped kitchen.</p>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 md:gap-4 mt-8 items-end">
                    {amenitiesMemoized}
                </div>
            </div>
        </main>
    );
}