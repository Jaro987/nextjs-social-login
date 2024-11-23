import { UserSettings } from '@/app/lib/definitions';
import * as React from 'react';
import BaseTemplate from './BaseTemplate';

interface EmailTemplateProps {
    recipientName: string,
    changes: Record<string, string | boolean>,
}

type UserSettingsKeys = keyof Omit<UserSettings, "id" | "userId" | "createProfile">

const messages: Record<UserSettingsKeys, { true: string; false: string }> = {
    editMyProfile: {
        true: "Receive email when you edit your profile",
        false: "Do not receive email when you edit your profile",
    },
    createMyEvent: {
        true: "Receive email when you create an event",
        false: "Do not receive email when you create an event",
    },
    cancelMyEvent: {
        true: "Receive email when you cancel an event",
        false: "Do not receive email when you cancel an event",
    },
    revokeMyEvent: {
        true: "Receive email when you revoke an event",
        false: "Do not receive email when you revoke an event",
    },
    sevenDayReminder: {
        true: "Receive a 7-day reminder for events",
        false: "Do not receive a 7-day reminder for events",
    },
    oneDayReminder: {
        true: "Receive a 1-day reminder for events",
        false: "Do not receive a 1-day reminder for events",
    },
};

export const EditedUserTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    recipientName,
    changes
}) => {
    return (
        <BaseTemplate recipientName={recipientName}>
            <p>Your account has just been edited with following: </p>
            {typeof Object.values(changes)[0] === 'boolean' ? (
                Object.entries(changes).map(
                    ([key, value]) => (
                        <ul key={key}>
                            <li>{messages[key as UserSettingsKeys][value ? 'true' : 'false']}</li>
                        </ul>
                    )
                )
            ) : (
                Object.entries(changes).map(([key, value]) => <ul key={key}><li>{`${key[0].toUpperCase()}${key.slice(1)}`} is changed to {value}</li></ul>)
            )}
        </BaseTemplate>
    )
};

