import * as React from 'react';
import BaseTemplate from './BaseTemplate';

interface EmailTemplateProps {
    recipientName: string,
    origin?: string,
}

export const CreatedUserTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    recipientName,
    origin
}) => (
    <BaseTemplate recipientName={recipientName}>
        <p>You just created an account on our website using data from {origin}.</p>
    </BaseTemplate>
);

