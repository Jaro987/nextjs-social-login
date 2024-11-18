'use client';
import CheckboxWithText from "@/components/CheckboxWithText";
import CustomFileInput from "@/components/CustomFileInput";
import InputWithLabel from "@/components/InputWithLabel";
import { Button } from "@/components/ui/button";
import { User } from "next-auth";
import { useState } from "react";
import { toast } from "sonner";
import { updateUser } from "../lib/actions";

type Props = {
    user: User
    settings: { editProfile: boolean, createEvent: boolean, cancelEvent: boolean, revokeEvent: boolean, sevenDayReminder: boolean, oneDayReminder: boolean };
};

export default function Profile({ user, settings }: Props) {
    const [name, setName] = useState<string>(user.name as string);
    const [email, setEmail] = useState<string>(user.email as string);
    const [phone, setPhone] = useState<string>(user.phone as string);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [image, setImage] = useState<string>(user.image as string);
    const [selectedFile, setSelectedFile] = useState<File | null>(null)


    const [editProfile, setEditProfile] = useState<boolean>(settings.editProfile);
    const [createEvent, setCreateEvent] = useState<boolean>(settings.createEvent);
    const [cancelEvent, setCancelEvent] = useState<boolean>(settings.cancelEvent);
    const [revokeEvent, setRevokeEvent] = useState<boolean>(settings.revokeEvent);
    const [sevenDayReminder, setSevenDayReminder] = useState<boolean>(settings.sevenDayReminder);
    const [oneDayReminder, setOneDayReminder] = useState<boolean>(settings.oneDayReminder);

    async function handleSaveProfileChanges() {
        const changes: Record<string, unknown> = {};

        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            console.log({ data });

            if (data.success) {
                changes.image = `/${data.name}`;
            } else {
                toast.error("Coldn't upload image", {
                    description: "Please try again later",
                });
            }
        }
        if (name !== user.name) changes.name = name;
        if (phone !== user.phone) changes.phone = phone;

        await updateUser(user.email!, changes);


    }

    return (
        <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex flex-col gap-4 w-full ">
                <p className="text-2xl font-bold">General info</p>
                <div className="flex flex-col gap-4">
                    <CustomFileInput initialImage={selectedFile || image} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
                    <InputWithLabel type="text" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <InputWithLabel type="email" id="email" placeholder="Email" value={email} disabled onChange={(e) => setEmail(e.target.value)} />
                    <InputWithLabel type="tel" id="phone" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <Button onClick={handleSaveProfileChanges}>Save profile changes</Button>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <p className="text-2xl font-bold">Settings</p>
                <p>Send me a mail when:</p>
                <div className="flex flex-col gap-4">
                    <CheckboxWithText
                        id="editProfile"
                        onChange={() => setEditProfile(!editProfile)}
                        checked={editProfile}
                        label="My profile has been updated."
                        description="Receive a mail when your profile has been updated."
                    />
                    <CheckboxWithText
                        id="createEvent"
                        onChange={() => setCreateEvent(!createEvent)}
                        checked={createEvent}
                        label="I create an event."
                        description="Receive a mail when an event has been created."
                    />
                    <CheckboxWithText
                        id="cancelEvent"
                        onChange={() => setCancelEvent(!cancelEvent)}
                        checked={cancelEvent}
                        label="My event has been canceled."
                        description="Receive a mail when my event has been canceled."
                    />
                    <CheckboxWithText
                        id="revokeEvent"
                        onChange={() => setRevokeEvent(!revokeEvent)}
                        checked={revokeEvent}
                        label="My event has been revoked."
                        description="Receive a mail when my event has been revoked."
                    />
                    <CheckboxWithText
                        id="sevenDayReminder"
                        onChange={() => setSevenDayReminder(!sevenDayReminder)}
                        checked={sevenDayReminder}
                        label="I have an event in 7 days."
                        description="Receive a mail 7 days before my event"
                    />
                    <CheckboxWithText
                        id="oneDayReminder"
                        onChange={() => setOneDayReminder(!oneDayReminder)}
                        checked={oneDayReminder}
                        label="I have an event tomorrow."
                        description="Receive a mail one day before an event."
                    />
                </div>
                <Button>Save mail settings</Button>
            </div>
        </div>
    );
}