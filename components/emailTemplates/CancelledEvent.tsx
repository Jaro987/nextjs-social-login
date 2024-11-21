import { formatDateToLocal } from '@/app/lib/utils';
import * as React from 'react';

interface EmailTemplateProps {
    recipientName: string;
    cancellerName?: string;
    eventDate: string
}

export const CancelledEventTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    recipientName,
    cancellerName,
    eventDate
}) => (
    <div>
        <h1>Hello, {recipientName}!</h1>
        <p>{recipientName === cancellerName ? 'You ' : `Host ${cancellerName || ''} `} just cancelled your reservation for {formatDateToLocal({ dateStr: eventDate, withWeekday: true })}.</p>
        {recipientName === cancellerName ? <p>If you’re having second thoughts, don’t hesitate to reach out and get your reservation back. Act fast, though—someone else might grab the date!</p> :
            <p>If this wasn’t expected, feel free to reach out to the host to clarify. Act fast, though—someone else might grab the date! If everything’s as planned, then all is good!</p>}
        <p>For additional information, please contact us.</p>
    </div>
);

