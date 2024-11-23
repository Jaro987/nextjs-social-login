import { formatDateToLocal } from '@/app/lib/utils';
import * as React from 'react';
import BaseTemplate from './BaseTemplate';

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
    <BaseTemplate recipientName={recipientName}>
        <p>{recipientName === cancellerName ? 'You ' : `Host ${cancellerName || ''} `} just cancelled your reservation for {formatDateToLocal({ dateStr: eventDate, withWeekday: true })}.</p>
        {recipientName === cancellerName && <p>If you’re having second thoughts, don’t hesitate to reach out and get your reservation back. Act fast, though—someone else might grab the date!</p>}
    </BaseTemplate>
);

