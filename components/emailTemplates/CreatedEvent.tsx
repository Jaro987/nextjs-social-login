import { formatDateToLocal } from '@/app/lib/utils';
import * as React from 'react';
import BaseTemplate from './BaseTemplate';

interface EmailTemplateProps {
    recipientName: string;
    eventDate: string
}

export const CreatedEventTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    recipientName,
    eventDate
}) => (
    <BaseTemplate recipientName={recipientName}>
        <p>You just created a reservation for {formatDateToLocal({ dateStr: eventDate, withWeekday: true })}.</p>
        <p>Check-in is between 2 PM and 6 PM, and checkout is by 10 AM tomorrow.</p>
    </BaseTemplate>
);

