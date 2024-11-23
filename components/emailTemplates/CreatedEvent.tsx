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
    </BaseTemplate>
);

