import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Calendar',
};
export default function Page() {
    return (
        <div className="flex h-screen w-full items-center justify-center text-2xl font-bold text-white">
            <p>Calendar Page</p>
        </div>
    );

}
//https://blog.nonstopio.com/elevate-your-react-full-calendar-unleashing-full-potential-53b783b4b021