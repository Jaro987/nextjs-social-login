"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, XCircle, CheckCircle2, Search } from "lucide-react";
import { CalendarEvent, CalendarUser, User, UserRole } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type UsersOverviewProps = {
    users?: Pick<CalendarUser, "id" | "name" | "email" | "image_url" | "color" | "role">[],
    getEvents: (userId: string) => Promise<CalendarEvent[][]>,
    changeRole: ({ user, changes }: { user: Partial<User>; changes: Record<string, string>; }) => Promise<{ success: boolean | undefined; message: string; description: string | undefined; }>
}

export default function UsersOverview({ users, getEvents, changeRole }: UsersOverviewProps) {
    const [userEvents, setUserEvents] = useState<Record<string, CalendarUser["events"]>>({});
    const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleAccordionOpen = async (userId: string) => {
        if (!userEvents[userId]) {
            setLoadingUserId(userId);
            try {
                const response = await getEvents(userId);
                setUserEvents((prev) => ({ ...prev, [userId]: response.flat() }));
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setLoadingUserId(null);
            }
        }
    };

    const filteredUsers = users?.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChangeRole = async (user: Partial<User>, role: UserRole) => {
        const response = await changeRole({ user, changes: { role } });
        if (response.success) {
            toast.success(response.message, {
                description: response.description,
            });
        } else {
            toast.error(response.message, {
                description: response.description,
            });
        }
    }
    return (
        <>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="peer block w-full rounded-md py-[9px] pl-10 text-sm border-neutral-400 outline-0 ring-0 ring-offset-none placeholder:text-white/50 bg-black/50 focus:border-gray-900 focus:outline-0 focus:ring-0 focus-visible:ring-offset-0 focus-visible:ring-0"
                />
            </div>
            <div className="flex grow flex-col justify-between rounded-xl bg-black/[0.6] p-4 mt-4">
                <div className="bg-white/[0.3] px-6">
                    <Accordion type="multiple" className="w-full">
                        {filteredUsers && filteredUsers.length > 0 ? filteredUsers.map((user) => (
                            <AccordionItem
                                value={user.id}
                                key={user.id}
                                className="border-black last:border-b-0"
                                onClick={() => handleAccordionOpen(user.id)}
                            >
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
                                    <div className="mt-2 flex gap-2 pl-14 pb-2">
                                        {/* <Button variant="outline" size="sm" className="bg-transparent">Edit</Button> */}
                                        <Button variant="outline" size="sm" className="bg-transparent">Send mail</Button>
                                        {user.role === UserRole.USER ?
                                            <Button onClick={() => handleChangeRole(user, UserRole.HOST)} variant="outline" size="sm" className="bg-transparent">Promote to host</Button>
                                            :
                                            <Button onClick={() => handleChangeRole(user, UserRole.USER)} variant="outline" size="sm" className="bg-transparent">Demote to user</Button>}
                                    </div>
                                    <div className="space-y-4 pl-14">
                                        {loadingUserId === user.id ? (
                                            <div>Loading...</div>
                                        ) : userEvents[user.id] ? (
                                            userEvents[user.id].length > 0 ? (
                                                userEvents[user.id].map((event) => {
                                                    const status = event.status === "cancelled" ? "cancelled" : new Date(event.date).getTime() < new Date().getTime() ? "fulfilled" : "active";
                                                    return (
                                                        <AccordionItem value={event.event_id}
                                                            key={event.event_id}
                                                            className="rounded-lg border px-3 text-sm"
                                                        >
                                                            <AccordionTrigger className="flex font-medium hover:no-underline">
                                                                <div className="flex items-center justify-start gap-2">
                                                                    <CalendarDays className="h-4 w-4" />
                                                                    {new Date(event.date).toLocaleDateString()}
                                                                    <Badge
                                                                        variant={status === "cancelled" ? "destructive" : status === "fulfilled" ? "success" : "default"}
                                                                        className="ml-2"
                                                                    >
                                                                        {status}
                                                                    </Badge>
                                                                </div>
                                                            </AccordionTrigger>
                                                            <AccordionContent>
                                                                {event.cancellations && event.cancellations.length > 0 && (
                                                                    <div className="mt-2 space-y-2">
                                                                        {event.cancellations.map((cancellation, index) => (
                                                                            <div key={index} className="flex flex-col gap-2 text-muted-foreground">
                                                                                {cancellation.cancelled_at && (
                                                                                    <div className="flex items-center gap-2 ml-2">
                                                                                        <XCircle className="h-4 w-4 text-red-500" /> <span>{`Cancelled by ${cancellation.cancelled_by} on ${new Date(
                                                                                            cancellation.cancelled_at!
                                                                                        ).toLocaleString()}`}</span>
                                                                                    </div>
                                                                                )}
                                                                                {cancellation.revoked_at && (
                                                                                    <div className="flex items-center gap-2 ml-4">
                                                                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                                                        <span>
                                                                                            {`Revoked by ${cancellation.revoked_by} on ${new Date(
                                                                                                cancellation.revoked_at!
                                                                                            ).toLocaleString()}`}
                                                                                        </span>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </AccordionContent>

                                                        </AccordionItem>
                                                    )
                                                })
                                            ) : (
                                                <div>No events found</div>
                                            )
                                        ) : (
                                            <div>No data loaded</div>
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
        </>
    )
}
