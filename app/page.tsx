import { inter, oranienbaum } from '@/app/ui/fonts';
import Bed from './ui/icons/Bed';
import More from './ui/icons/More';
import Parking from './ui/icons/Parking';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

const amenities = [
  {
    icon: <Bed />,
    name: "Bed"
  },
  {
    icon: <Parking />,
    name: "Parking"
  }

]

export default async function Page() {
  const headerHeight = {
    web: 214,
    mobile: 177,
    underMobile: 261
  };

  const renderAmenities = () => {
    return (
      <>
        {amenities.map((amenity) => {
          return (
            <div key={amenity.name} className="flex flex-col items-center">
              <div className="bg-transparent p-2 rounded-xl border-2">
                {amenity.icon}
              </div>
              <p className="text-gray-400 text-center">{amenity.name}</p>
            </div>

          )

        })
        }
        <div className="flex flex-col items-center">
          <div className="bg-transparent p-2 rounded-xl border-2">
            <Drawer>
              <DrawerTrigger asChild>
                <More />
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                  </DrawerHeader>
                  <div className="p-4 pb-0">
                    <p>a lots of icons showing amenities</p>
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <p className="text-gray-400 text-center">more</p>
        </div></>)
  }

  //h-[calc(100vh-${headerHeight.mobile}px)] md:h-[calc(100vh-${headerHeight.web}px)]
  return (
    <main className={`flex flex-col p-6 text-white bg-gradient-to-t from-black via-transparent to-transparent h-[calc(500px-${headerHeight.underMobile}px)]`}>
      <div className={`flex flex-col-reverse items-center justify-between gap-2 h-full`}>
        <div className='flex flex-col md:flex-row gap-[40px] mt-auto mb-0'>
          <div>
            <div className='flex flex-row items-end self-start'>
              <p className='text-gray-400 mr-2'>from</p>
              <p className={`${inter.className} text-xl font-bold`}>€180</p>
              <p className='text-gray-400'>/night</p>
            </div>
            <h1 className={`text-[31px] md:text-[48px] ${oranienbaum.className} self-start max-w-[768px]`}>Your go-to spot to relax, hang out, and unwind</h1>
            <p className="text-gray-400 text-[12px] md:text-sm max-w-[768px] text-justify">The A-frame Pool House is a modern, beautiful getaway just 13 minutes from Novi Sad. It’s located 9 km from the city center, in Ledinci. The house features a large grassy yard, a playground for kids, over 15 outdoor seating spots, cozy garden furniture, sound system, internet, WiFi, Netflix, and HBO, plus a fully equipped kitchen.</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 md:gap-4 mt-8 items-end">
            {renderAmenities()}
          </div>
        </div>
        <div ></div>
      </div>
    </main>
  );
}
// 