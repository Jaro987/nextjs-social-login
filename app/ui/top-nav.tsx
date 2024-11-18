'use client'
import Navigation from "./Navigation"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { UserRole } from "../lib/definitions";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { User } from "next-auth";
import { ChevronDown } from 'lucide-react'
import { useState } from "react";
import { useRouter } from "next/navigation";


const color = "#fff"

export function TopNav({ user, onSignOut }: { user: User | null, onSignOut: () => void }) {
    // const session = await auth();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();



    return (
        <div className="flex flex-row items-center justify-between w-full text-[#fff]">
            <Navigation color={color} isAdminOrHost={user?.role === UserRole.ADMIN || user?.role === UserRole.HOST} />
            <MobileMenu color={color} isAdminOrHost={user?.role === UserRole.ADMIN || user?.role === UserRole.HOST} />
            <div className="align-left">
                {user ?
                    <div className="flex items-center">
                        <Image
                            src={user.image || ''}
                            alt={`${user.name}'s profile picture`}
                            className="mr-4 rounded-full border-2 border-gray-300"
                            width={40}
                            height={40}
                        />
                        <div className="min-w-0">

                            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex items-center transition duration-200 ease-in-out">
                                        <p className="truncate text-sm font-semibold md:text-base cursor-pointer">
                                            {user.name}
                                        </p>
                                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-black/[0.6] rounded-xl p-4 space-y-2">
                                    <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer flex items-center text-sm font-medium leading-tight tracking-tight">Profile</DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <button onClick={() => onSignOut()} className="flex items-center text-sm font-medium leading-tight tracking-tight">
                                            <div>Sign Out</div>
                                        </button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>


                        </div>
                    </div> :
                    <Link
                        href="/login"
                        className="flex items-center text-sm font-medium leading-tight tracking-tight h-[61px]"
                    >
                        <UserCircleIcon stroke={color} className="w-10 mr-4" />
                        <p>Login</p>
                    </Link>
                }
            </div>
        </div>
    )
}
