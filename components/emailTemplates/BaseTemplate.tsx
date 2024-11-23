export default function BaseTemplate({
    recipientName,
    children
}: {
    recipientName: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <h1>Hello, {recipientName}!</h1>
            {children}
            <p>If this wasn’t expected, feel free to reach out to the host to clarify. If everything’s as planned, then all is good!</p>
            <p>For additional information, just reply to this email, and one of our hosts will get back to you.</p>
        </div>
    );
}