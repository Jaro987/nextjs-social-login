import * as React from 'react';
import BaseTemplate from './BaseTemplate';

interface EmailTemplateProps {
    newUserName: string,
    newUserMail: string,
    origin?: string,
}

export const CreatedUserToHostTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    newUserName,
    newUserMail,
    origin
}) => (
    <BaseTemplate name={newUserName} email={newUserMail}>
        <p>has just created an account on our website using data from {origin}.</p>
    </BaseTemplate>
);

