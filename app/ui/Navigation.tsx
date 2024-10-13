'use client'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { usePathname } from "next/navigation";


export default function Navigation({ color }: { color: string }) {
    const pathname = usePathname();
    // const searchParams = useSearchParams();
    // const tab = searchParams.get('tab');


    // const getHrefIfConnected = (link: string) => {

    //     if (isWalletConnected) {
    //         return link
    //     }
    //     return "javascript:;";
    // }

    const navigationMenuTriggerStyle = (link: string) => `text-[${color}] hover:text-[${color}] focus:text-[${color}] focus:bg-transparent text-sm font-medium leading-tight tracking-tight ${pathname === link ? 'underline' : ''} bg-transparent hover:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent`;
    return (
        <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="flex flex-row items-center justify-between gap-[120px]">
                <NavigationMenuItem>
                    <Link href="/help" legacyBehavior passHref aria-disabled={true}>
                        <NavigationMenuLink className={navigationMenuTriggerStyle("/help")}>
                            Help
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/location" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle("/location")}>
                            Location
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
            </NavigationMenuList>
        </NavigationMenu>
    )
}
