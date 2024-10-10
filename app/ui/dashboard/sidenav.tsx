import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { auth, signOut } from '@/auth';
import Image from 'next/image';

export default async function SideNav() {
  const session = await auth()
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      {/* <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link> */}
      {session?.user && <div className="flex items-center">
        <Image
          src={session.user.image as string}
          alt={`${session.user.name}'s profile picture`}
          className="mr-4 rounded-full"
          width={40}
          height={40}
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold md:text-base">
            {session.user.name}
          </p>
          <p className="hidden text-sm text-gray-500 sm:block">
            {session.user.email}
          </p>
        </div>
      </div>}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
