"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, XCircle, CheckCircle2 } from "lucide-react";
import { CalendarUser } from "@/app/lib/definitions";

export default function UsersOverview({ users }: { users?: CalendarUser[] }) {
    console.log({ users });

    return (
        <div className="flex grow flex-col justify-between rounded-xl bg-black/[0.6] p-4">
            <div className="bg-white/[0.3] px-6">
                <Accordion type="single" collapsible className="w-full">
                    {users && users.length > 0 ? users.map((user) => (
                        <AccordionItem value={user.id} key={user.id} className="last:border-b-0">
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center gap-4 text-left">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={user.image_url} alt={user.name} />
                                        <AvatarFallback style={{ backgroundColor: user.color }}>
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="w-full">
                                        <div className="font-semibold flex items-center gap-2 justify-between">
                                            {user.name}
                                            <Badge variant="secondary" className="ml-2">
                                                {user.role}
                                            </Badge>
                                        </div>
                                        <div className="text-sm text-muted-foreground">{user.email}</div>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4 pl-14">
                                    {user.events.length > 0 ? (
                                        user.events.map((event) => (
                                            <div
                                                key={event.event_id}
                                                className="rounded-lg border p-4 text-sm"
                                            >
                                                <div className="flex items-center gap-2 font-medium">
                                                    <CalendarDays className="h-4 w-4" />
                                                    {new Date(event.date).toLocaleDateString()}
                                                    <Badge
                                                        variant={event.status === "cancelled" ? "destructive" : "default"}
                                                        className="ml-2"
                                                    >
                                                        {event.status}
                                                    </Badge>
                                                </div>
                                                {event.cancellations && event.cancellations.length > 0 && (
                                                    <div className="mt-2 space-y-2">
                                                        {event.cancellations.map((cancellation, index) => (
                                                            <div key={index} className="flex flex-col gap-2 text-muted-foreground">
                                                                {cancellation.cancelled_at && (
                                                                    <div className="flex items-center gap-2 ml-2">
                                                                        <XCircle className="h-4 w-4 text-red-500" /> <span>{`Cancelled by ${cancellation.cancelled_by} on ${new Date(
                                                                            cancellation.cancelled_at!
                                                                        ).toLocaleDateString()}`}</span>
                                                                    </div>
                                                                )}
                                                                {cancellation.revoked_at && (
                                                                    <div className="flex items-center gap-2 ml-4">
                                                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                                        <span>
                                                                            {`Revoked by ${cancellation.revoked_by} on ${new Date(
                                                                                cancellation.revoked_at!
                                                                            ).toLocaleDateString()}`}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-sm text-muted-foreground">No events found</div>
                                    )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )) : (
                        <div className="text-center py-4 text-muted-foreground">No users found</div>
                    )}
                </Accordion>
            </div>
        </div>
    )
}
