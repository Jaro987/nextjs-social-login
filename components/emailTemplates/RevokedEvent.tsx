import { formatDateToLocal } from '@/app/lib/utils';
import * as React from 'react';

interface EmailTemplateProps {
    recipientName: string;
    revokerName?: string;
    eventDate: string
}

export const RevokedEventTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    recipientName,
    revokerName,
    eventDate
}) => (
    <div>
        <h1>Hello, {recipientName}!</h1>
        <p>{`Host ${revokerName || ''} `} just revoked your reservation for {formatDateToLocal({ dateStr: eventDate, withWeekday: true })}.</p>
        <p>If this wasn’t expected, feel free to reach out to the host to clarify. If everything’s as planned, then all is good!</p>
        <p>For additional information, please contact us.</p>
    </div>
);

