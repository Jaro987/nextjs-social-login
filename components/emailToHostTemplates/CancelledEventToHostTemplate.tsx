import { formatDateToLocal } from '@/app/lib/utils';
import * as React from 'react';
import BaseTemplate from './BaseTemplate';

interface EmailTemplateProps {
    eventOwnerName: string;
    eventOwnerEmail: string;
    cancellerName?: string;
    eventDate: string
}

export const CancelledEventToHostTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    eventOwnerName,
    eventOwnerEmail,
    cancellerName,
    eventDate
}) => (
    <BaseTemplate name={eventOwnerName} email={eventOwnerEmail}>
        <p>had a reservation for {formatDateToLocal({ dateStr: eventDate, withWeekday: true })} that has just been cancelled by {cancellerName}.</p>
    </BaseTemplate>
);

