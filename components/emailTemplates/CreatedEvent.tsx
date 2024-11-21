import { formatDateToLocal } from '@/app/lib/utils';
import * as React from 'react';

interface EmailTemplateProps {
    recipientName: string;
    eventDate: string
}

export const CreatedEventTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    recipientName,
    eventDate
}) => (
    <div>
        <h1>Hello, {recipientName}!</h1>
        <p>You just created a reservation for {formatDateToLocal({ dateStr: eventDate, withWeekday: true })}.</p>
        <p>If this wasn’t expected, feel free to reach out to the host to clarify. If everything’s as planned, then all is good!</p>
        <p>For additional information, please contact us.</p>
    </div>
);

