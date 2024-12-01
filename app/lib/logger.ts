import fs from 'fs';

const isDev = process.env.NODE_ENV === 'development';
const folderName = isDev ? 'development' : 'production';
const logFolder = `logs/${folderName}`;

export default function logToFile(message: string) {
    const date = new Date();
    if (!fs.existsSync(logFolder)) {
        fs.mkdirSync(logFolder, { recursive: true });
    }
    fs.appendFileSync(`${logFolder}/log-${date.toISOString().split('T')[0]}.txt`, `${message}\n`);

}

export function readLogByDate(date: string): string[] {
    const fileName = `${logFolder}/log-${date}.txt`;
    if (!fs.existsSync(fileName)) {
        return [];
    }
    const data = fs.readFileSync(fileName, 'utf8');
    return data.split('\n').filter(line => line !== '');
}
