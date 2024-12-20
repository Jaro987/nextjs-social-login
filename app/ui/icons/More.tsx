type Props = {
    size?: number;
    color?: string;
}

export default function More({ size = 24, color = 'white' }: Props) {
    return (
        <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_15_64)">
                <rect width="24" height="24" fill="transparent" />
                <g filter="url(#filter0_d_15_64)">
                    <circle cx="6" cy="12" r="2" stroke={`${color}`} strokeLinejoin="round" />
                </g>
                <g filter="url(#filter1_d_15_64)">
                    <circle cx="12" cy="12" r="2" stroke={`${color}`} strokeLinejoin="round" />
                </g>
                <g filter="url(#filter2_d_15_64)">
                    <circle cx="18" cy="12" r="2" stroke={`${color}`} strokeLinejoin="round" />
                </g>
            </g>
            <defs>
                <filter id="filter0_d_15_64" x="2.5" y="9.5" width="7" height="7" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="0.5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_64" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_64" result="shape" />
                </filter>
                <filter id="filter1_d_15_64" x="8.5" y="9.5" width="7" height="7" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="0.5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_64" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_64" result="shape" />
                </filter>
                <filter id="filter2_d_15_64" x="14.5" y="9.5" width="7" height="7" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="0.5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_64" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_64" result="shape" />
                </filter>
                <clipPath id="clip0_15_64">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}