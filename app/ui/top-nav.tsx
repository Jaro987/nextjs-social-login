import * as React from "react"
import Navigation from "./Navigation"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";



const color = "#fff"

export async function TopNav() {
    const session = await auth();
    return (
        <div className="flex flex-row items-center justify-between w-full text-[#fff]">
            <Navigation color={color} />
            <MobileMenu color={color} />
            {session?.user ?
                <div className="flex items-center">
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
                        <p className="hidden text-sm sm:block">
                            {session.user.email}
                        </p>
                        <form
                            action={async () => {
                                'use server';
                                await signOut({ redirect: true, redirectTo: '/' });
                            }}
                        >
                            <button className="flex items-center text-sm font-medium leading-tight tracking-tight">
                                {/* <PowerIcon className="w-6" /> */}
                                <div>Sign Out</div>
                            </button>
                        </form>
                    </div>
                </div> :
                <Link
                    href="/login"
                    className="flex items-center text-sm font-medium leading-tight tracking-tight"
                >
                    <UserCircleIcon stroke={color} className="w-6" />
                    <p>Login</p>
                </Link>
                // <div className="">
                //     <UserCircleIcon stroke={color} className="w-6" />
                //     <span className="flex items-center text-sm font-medium leading-tight tracking-tight">Login</span>
                // </div>
            }
        </div>
    )
}
