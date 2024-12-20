type Props = {
    size?: number;
    color?: string;
}

export default function Utensils({ size = 24, color = 'white' }: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`${color}`} height={`${size}px`} width={`${size}px`}>
            <path xmlns="http://www.w3.org/2000/svg" d="m16.96,22.391c.108.254-.01.548-.264.656-1.488.633-3.067.954-4.696.954C5.383,24,0,18.617,0,12S5.383,0,12,0c.175,0,.349.003.522.011.276.012.49.246.478.521-.012.276-.245.508-.521.478-.159-.007-.318-.01-.478-.01C5.935,1,1,5.935,1,12s4.935,11,11,11c1.493,0,2.941-.294,4.304-.874.255-.109.548.01.656.264ZM12,5c.157,0,.312.005.466.016.012,0,.023,0,.035,0,.261,0,.48-.202.499-.466.019-.276-.189-.514-.465-.533-.176-.012-.355-.018-.534-.018-4.411,0-8,3.589-8,8s3.589,8,8,8c1.748,0,3.408-.553,4.801-1.6.221-.166.265-.479.1-.7-.166-.22-.479-.264-.7-.1-1.219.916-2.671,1.4-4.2,1.4-3.86,0-7-3.14-7-7s3.14-7,7-7ZM23.5,0c-.276,0-.5.224-.5.5v7c0,1.758-1.308,3.204-3,3.449V.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v10.449c-1.692-.245-3-1.691-3-3.449V.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v7c0,2.31,1.756,4.197,4,4.449v11.551c0,.276.224.5.5.5s.5-.224.5-.5v-11.551c2.244-.252,4-2.139,4-4.449V.5c0-.276-.224-.5-.5-.5Z" />
        </svg>
    );
}
