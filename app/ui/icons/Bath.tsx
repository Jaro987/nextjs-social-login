type Props = {
    size?: number;
    color?: string;
}

export default function Bath({ size = 24, color = 'white' }: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`${color}`} height={`${size}px`} width={`${size}px`}>
            <path xmlns="http://www.w3.org/2000/svg" d="m23.302,12.863c-.495-.557-1.167-.863-1.893-.863H1v-7.961c0-.842.299-1.68.91-2.258,1.134-1.073,2.724-.969,3.742-.12l-.625,3.589c-.078.441.013.893.255,1.271h0c.268.417.7.706,1.187.794.104.02.21.028.315.028.384,0,.763-.124,1.074-.356l3.427-2.57c.744-.559.935-1.61.42-2.414-.313-.487-.847-.794-1.425-.819l-3.854-.173C5.012-.285,2.667-.454,1.083,1.208.356,1.972,0,3.02,0,4.074v8.11c0,.214.012.425.037.637.092.791.326,2.792.326,2.792.278,2.36,1.466,4.395,3.163,5.728-.004.013-.512,2.061-.512,2.061-.066.269.098.539.365.605.04.01.081.015.12.015.225,0,.429-.152.485-.38l.421-1.701c1.148.676,2.465,1.058,3.856,1.058h7.754c1.296,0,2.527-.332,3.617-.924l.382,1.544c.057.228.261.38.485.38.039,0,.08-.005.12-.015.268-.066.432-.337.365-.605l-.462-1.867c1.818-1.326,3.101-3.435,3.391-5.9l.064-.557c.095-.803-.152-1.603-.678-2.193ZM10.876,2.562c.221.346.137.809-.19,1.054l-3.427,2.57c-.178.132-.396.181-.612.146-.217-.04-.402-.164-.522-.35-.106-.166-.146-.365-.112-.56l.593-3.402,3.631.161c.255.012.49.147.641.381Zm12.11,12.378l-.064.557c-.437,3.708-3.405,6.504-6.906,6.504h-7.754c-3.501,0-6.47-2.796-6.906-6.504l-.293-2.496h20.347c.436,0,.843.188,1.146.527.336.378.493.893.432,1.412Z" />
        </svg>
    );
}