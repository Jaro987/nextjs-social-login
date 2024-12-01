import { readLogByDate } from "@/app/lib/logger";

export default async function Page() {
    const logsForDay = readLogByDate(new Date().toISOString().split('T')[0]);

    return (
        <main className="flex flex-col bg-black/[0.6] p-4 rounded-xl">
            {logsForDay.map((log) => {
                return (
                    <div key={log} className="flex flex-col">
                        <p className="text-gray-400">{log}</p>
                    </div>
                )
            })}
        </main>
    );
}