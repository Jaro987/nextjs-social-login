'use client';
import CheckboxWithText from "@/components/CheckboxWithText";
import CustomFileInput from "@/components/CustomFileInput";
import InputWithLabel from "@/components/InputWithLabel";
import { Button } from "@/components/ui/button";
import { User } from "next-auth";
import { useState } from "react";
import { toast } from "sonner";
import { updateUser, updateUserSettings } from "../lib/actions";
import { UserSettings } from "../lib/definitions";
import { SendUserUpdatedEmailProps } from "../lib/mails";

type Props = {
    user: User
    settings: UserSettings;
    sendMail: ({ recipientMailAddress, recipientName, changes }: SendUserUpdatedEmailProps) => Promise<void>;
};

export default function Profile({ user, settings, sendMail }: Props) {
    const [name, setName] = useState<string>(user.name as string);
    const [email, setEmail] = useState<string>(user.email as string);
    const [phone, setPhone] = useState<string>(user.phone as string);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [image, setImage] = useState<string>(user.image as string);
    const [selectedFile, setSelectedFile] = useState<File | null>(null)


    const [editMyProfile, setEditMyProfile] = useState<boolean>(settings.editMyProfile);
    const [createMyEvent, setCreateMyEvent] = useState<boolean>(settings.createMyEvent);
    const [cancelMyEvent, setCancelMyEvent] = useState<boolean>(settings.cancelMyEvent);
    const [revokeMyEvent, setRevokeMyEvent] = useState<boolean>(settings.revokeMyEvent);
    const [sevenDayReminder, setSevenDayReminder] = useState<boolean>(settings.sevenDayReminder);
    const [oneDayReminder, setOneDayReminder] = useState<boolean>(settings.oneDayReminder);

    async function handleSaveProfileChanges() {
        const changes: Record<string, string> = {};

        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
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

        const updatedUser = await updateUser(user.email!, changes);

        if (updatedUser.success) {
            await sendMail({ recipientMailAddress: user.email!, recipientName: user.name!, changes });
            toast.success(updatedUser.message, {
                description: updatedUser.description,
            });
        } else {
            toast.error(updatedUser.message, {
                description: updatedUser.description,
            });
        }

    }


    function hasChanges() {
        return (
            name !== user.name ||
            phone !== user.phone ||
            selectedFile
        );
    }

    async function handleSaveSettingsChanges() {
        const settingsChanges: Partial<UserSettings> = {};

        if (editMyProfile !== settings.editMyProfile) settingsChanges.editMyProfile = editMyProfile;
        if (createMyEvent !== settings.createMyEvent) settingsChanges.createMyEvent = createMyEvent;
        if (cancelMyEvent !== settings.cancelMyEvent) settingsChanges.cancelMyEvent = cancelMyEvent;
        if (revokeMyEvent !== settings.revokeMyEvent) settingsChanges.revokeMyEvent = revokeMyEvent;
        if (sevenDayReminder !== settings.sevenDayReminder) settingsChanges.sevenDayReminder = sevenDayReminder;
        if (oneDayReminder !== settings.oneDayReminder) settingsChanges.oneDayReminder = oneDayReminder;

        const updatedUserSettings = await updateUserSettings({ id: settings.id, newSettings: settingsChanges });
        if (updatedUserSettings.success) {
            await sendMail({ recipientMailAddress: user.email!, recipientName: user.name!, changes: settingsChanges });

            toast.success(updatedUserSettings.message);
        } else {
            toast.error(updatedUserSettings.message);
        }
    }

    function hasSettingsChanges() {
        return (
            editMyProfile !== settings.editMyProfile ||
            createMyEvent !== settings.createMyEvent ||
            cancelMyEvent !== settings.cancelMyEvent ||
            revokeMyEvent !== settings.revokeMyEvent ||
            sevenDayReminder !== settings.sevenDayReminder ||
            oneDayReminder !== settings.oneDayReminder
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-24">
            <div className="flex flex-col gap-4 w-full ">
                <p className="text-2xl font-bold">General info</p>
                <div className="flex flex-col gap-4">
                    <CustomFileInput initialImage={selectedFile || image} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
                    <InputWithLabel type="text" id="name" placeholder="Name" value={name} onChange={setName} />
                    <InputWithLabel type="email" id="email" placeholder="Email" value={email} disabled onChange={setEmail} />
                    <InputWithLabel type="tel" id="phone" placeholder="Phone number" value={phone} onChange={setPhone} />
                </div>
                <Button disabled={!hasChanges()} onClick={handleSaveProfileChanges}>Save profile changes</Button>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <p className="text-2xl font-bold">Settings</p>
                <p>Send me a mail when:</p>
                <div className="flex flex-col gap-4">
                    <CheckboxWithText
                        id="editProfile"
                        onChange={() => setEditMyProfile(!editMyProfile)}
                        checked={editMyProfile}
                        label="My profile has been updated."
                        description="Receive a mail when your profile has been updated."
                    />
                    <CheckboxWithText
                        id="createEvent"
                        onChange={() => setCreateMyEvent(!createMyEvent)}
                        checked={createMyEvent}
                        label="I create an event."
                        description="Receive a mail when an event has been created."
                    />
                    <CheckboxWithText
                        id="cancelEvent"
                        onChange={() => setCancelMyEvent(!cancelMyEvent)}
                        checked={cancelMyEvent}
                        label="My event has been canceled."
                        description="Receive a mail when my event has been canceled."
                    />
                    <CheckboxWithText
                        id="revokeEvent"
                        onChange={() => setRevokeMyEvent(!revokeMyEvent)}
                        checked={revokeMyEvent}
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
                <Button disabled={!hasSettingsChanges()} onClick={handleSaveSettingsChanges}>Save mail settings</Button>
            </div>
        </div>
    );
}