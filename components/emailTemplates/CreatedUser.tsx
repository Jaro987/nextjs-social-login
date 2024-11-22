import * as React from 'react';

interface EmailTemplateProps {
    recipientName: string,
    origin?: string,
}

export const CreatedUserTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    recipientName,
    origin
}) => (
    <div>
        <h1>Hello, {recipientName}!</h1>
        <p>You just created an account on our website using data from {origin}.</p>
        <p>If this wasn’t expected, feel free to reach out to the host to clarify. If everything’s as planned, then all is good!</p>
        <p>For additional information, please contact us.</p>
    </div>
);

