'use client'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { usePathname } from "next/navigation";


export default function Navigation({ color, isAdminOrHost }: { color: string, isAdminOrHost: boolean }) {
    const pathname = usePathname();

    const navigationMenuTriggerStyle = (link: string) => `text-[${color}] hover:text-[${color}] focus:text-[${color}] focus:bg-transparent text-sm font-medium leading-tight tracking-tight ${pathname === link ? 'underline' : ''} bg-transparent hover:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent whitespace-nowrap`;
    return (
        <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="flex flex-row items-center justify-between gap-[60px] xl:gap-[120px]">
                <NavigationMenuItem>
                    <Link href="/help" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle("/help")}>
                            Help
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/contact-us" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle("/contact-us")}>
                            Contact us
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/book" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle("/book")}>
                            Book a stay
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                {isAdminOrHost && <NavigationMenuItem>
                    <Link href="/dashboard" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle("/dashboard")}>
                            Dashboard
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>}
            </NavigationMenuList>
        </NavigationMenu>
    )
}
