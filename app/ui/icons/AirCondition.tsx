type Props = {
    size?: number;
    color?: string;
}

export default function AirCondition({ size = 24, color = 'white' }: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`${color}`} height={`${size}px`} width={`${size}px`}>
            <path xmlns="http://www.w3.org/2000/svg" d="M21.5,0H2.5C1.121,0,0,1.122,0,2.5V11H24V2.5c0-1.378-1.121-2.5-2.5-2.5Zm1.5,10H1V2.5c0-.827,.673-1.5,1.5-1.5H21.5c.827,0,1.5,.673,1.5,1.5v7.5ZM3,6H21v1H3v-1Zm4,7h1v7.5c0,1.93-1.57,3.5-3.5,3.5s-3.5-1.57-3.5-3.5,1.57-3.5,3.5-3.5v1c-1.379,0-2.5,1.122-2.5,2.5s1.121,2.5,2.5,2.5,2.5-1.122,2.5-2.5v-7.5Zm16,7.5c0,1.93-1.57,3.5-3.5,3.5s-3.5-1.57-3.5-3.5v-7.5h1v7.5c0,1.378,1.121,2.5,2.5,2.5s2.5-1.122,2.5-2.5-1.121-2.5-2.5-2.5v-1c1.93,0,3.5,1.57,3.5,3.5Zm-11.5-7.5h1v11h-1V13Z" />
        </svg>
    );
}
