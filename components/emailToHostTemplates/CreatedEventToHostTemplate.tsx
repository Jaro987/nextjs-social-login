import { formatDateToLocal } from '@/app/lib/utils';
import * as React from 'react';
import BaseTemplate from './BaseTemplate';

interface EmailTemplateProps {
    eventOwnerName: string;
    eventOwnerEmail: string;
    eventDate: string;
}

export const CreatedEventToHostTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    eventOwnerName,
    eventOwnerEmail,
    eventDate
}) => (
    <BaseTemplate name={eventOwnerName} email={eventOwnerEmail}>
        <p>has just created a reservation for {formatDateToLocal({ dateStr: eventDate, withWeekday: true })}.</p>
    </BaseTemplate>
);

