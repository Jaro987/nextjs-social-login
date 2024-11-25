import { FC } from 'react';
import { formatDateToLocal } from '@/app/lib/utils';
import BaseTemplate from './BaseTemplate';

interface EmailTemplateProps {
    eventOwnerName: string;
    eventOwnerEmail: string;
    revokerName?: string;
    eventDate: string
}

export const RevokedEventToHostTemplate: FC<Readonly<EmailTemplateProps>> = ({
    eventOwnerName,
    eventOwnerEmail,
    revokerName,
    eventDate
}) => (
    <BaseTemplate name={eventOwnerName} email={eventOwnerEmail}>
        <p>had a cancelled reservation for {formatDateToLocal({ dateStr: eventDate, withWeekday: true })} that has just been revoked by {revokerName}.</p>
    </BaseTemplate>
);

