'use client'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MobileMenu({ color, isAdminOrHost }: { color: string, isAdminOrHost: boolean }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const handleOpenChange = (open: boolean) => {
        const timer = open ? undefined : setTimeout(() => setOpen(open), 500);
        return () => clearTimeout(timer);
    };

    const navigationMenuTriggerStyle = (link: string) => `text-[${color}] hover:text-[${color}] focus:text-[${color}] focus:bg-transparent text-sm font-medium leading-tight tracking-tight ${pathname === link ? 'underline' : ''} bg-transparent hover:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent`;

    return (
        <Sheet open={open} onOpenChange={setOpen}>
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
                                        <NavigationMenuLink className={navigationMenuTriggerStyle("/help")} onClick={() => handleOpenChange(false)}>
                                            Help
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link href="/contact-us" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle("/contact-us")} onClick={() => handleOpenChange(false)}>
                                            Contact us
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link href="/book" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle("/book")} onClick={() => handleOpenChange(false)}>
                                            Book a stay
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                {isAdminOrHost && <NavigationMenuItem>
                                    <Link href="/dashboard" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle("/dashboard")} onClick={() => handleOpenChange(false)}>
                                            Dashboard
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}