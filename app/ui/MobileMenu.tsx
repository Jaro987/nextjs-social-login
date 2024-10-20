'use client'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu({ color }: { color: string }) {
    const pathname = usePathname();

    const navigationMenuTriggerStyle = (link: string) => `text-[${color}] hover:text-[${color}] focus:text-[${color}] focus:bg-transparent text-sm font-medium leading-tight tracking-tight ${pathname === link ? 'underline' : ''} bg-transparent hover:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent`;

    return (
        <Sheet>
            <SheetTrigger>
                <Bars3Icon className="block md:hidden w-12" />
            </SheetTrigger>
            <SheetTitle></SheetTitle>
            <SheetContent side={'top'} className="bg-black/50 border-0">
                <SheetHeader>
                    <SheetDescription>
                        <NavigationMenu >
                            <NavigationMenuList className="flex flex-col items-center justify-between gap-4">
                                <NavigationMenuItem>
                                    <Link href="/help" legacyBehavior passHref aria-disabled={true}>
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
                            </NavigationMenuList>
                        </NavigationMenu>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}