type Props = {
    size?: number;
    color?: string;
}

export default function Freezer({ size = 24, color = 'white' }: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`${color}`} height={`${size}px`} width={`${size}px`}>
            <path xmlns="http://www.w3.org/2000/svg" d="m17.5,0H6.5C4.019,0,2,2.019,2,4.5v15c0,2.481,2.019,4.5,4.5,4.5h11c2.481,0,4.5-2.019,4.5-4.5V4.5c0-2.481-2.019-4.5-4.5-4.5ZM6.5,1h11c1.93,0,3.5,1.57,3.5,3.5v4.5h-4v-3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v3.5H3v-4.5c0-1.93,1.57-3.5,3.5-3.5Zm11,22H6.5c-1.93,0-3.5-1.57-3.5-3.5v-9.5h13v7.5c0,.276.224.5.5.5s.5-.224.5-.5v-7.5h4v9.5c0,1.93-1.57,3.5-3.5,3.5Z" />
        </svg>
    );
}
