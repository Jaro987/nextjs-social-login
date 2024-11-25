export default function BaseTemplate({
    name,
    email,
    children
}: {
    name: string;
    email: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <h1>{name} ({email})</h1>
            {children}
        </div>
    );
}