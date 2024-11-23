import { FC } from 'react';
import { formatDateToLocal } from '@/app/lib/utils';
import BaseTemplate from './BaseTemplate';

interface EmailTemplateProps {
    recipientName: string;
    revokerName?: string;
    eventDate: string
}

export const RevokedEventTemplate: FC<Readonly<EmailTemplateProps>> = ({
    recipientName,
    revokerName,
    eventDate
}) => (
    <BaseTemplate recipientName={recipientName}>
        <p>{`Host ${revokerName || ''} `} just revoked your reservation for {formatDateToLocal({ dateStr: eventDate, withWeekday: true })}.</p>
    </BaseTemplate>
);

