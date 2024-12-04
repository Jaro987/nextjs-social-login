type Props = {
    size?: number;
    color?: string;
}

export default function HotTub({ size = 24, color = 'white' }: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`${color}`} height={`${size}px`} width={`${size}px`}>
            <path xmlns="http://www.w3.org/2000/svg" d="M21.5,12H12.344l-2.765-3.358c-.856-1.041-2.121-1.638-3.469-1.64h-.61c-.934,0-1.812,.363-2.473,1.023-.662,.661-1.027,1.541-1.027,2.477v1.549c-1.14,.232-2,1.242-2,2.449v5c0,2.481,2.019,4.5,4.5,4.5h15c2.481,0,4.5-2.019,4.5-4.5v-5c0-1.378-1.122-2.5-2.5-2.5Zm-12.5,1v10h-3V13h3Zm1,0h4v10h-4V13Zm5,0h3v10h-3V13ZM3.733,8.732c.472-.472,1.099-.731,1.766-.731h.609c1.048,.002,2.032,.467,2.698,1.276l2.242,2.723H3v-1.499c0-.668,.26-1.296,.733-1.769ZM1,19.5v-5c0-.827,.673-1.5,1.5-1.5h2.5v10h-.5c-1.93,0-3.5-1.57-3.5-3.5Zm22,0c0,1.93-1.57,3.5-3.5,3.5h-.5V13h2.5c.827,0,1.5,.673,1.5,1.5v5ZM5.5,5c1.378,0,2.5-1.122,2.5-2.5S6.878,0,5.5,0,3,1.122,3,2.5s1.122,2.5,2.5,2.5Zm0-4c.827,0,1.5,.673,1.5,1.5s-.673,1.5-1.5,1.5-1.5-.673-1.5-1.5,.673-1.5,1.5-1.5Zm15.646,2.939c-.739-.739-1.146-1.722-1.146-2.768V.5c0-.276,.224-.5,.5-.5s.5,.224,.5,.5v.672c0,.779,.303,1.51,.854,2.061,.729,.729,1.146,1.737,1.146,2.768v.5c0,.276-.224,.5-.5,.5s-.5-.224-.5-.5v-.5c0-.767-.311-1.518-.854-2.061Zm-4,.692c-.739-.739-1.146-1.722-1.146-2.768V.5c0-.276,.224-.5,.5-.5s.5,.224,.5,.5V1.864c0,.779,.303,1.51,.854,2.061,.729,.729,1.146,1.737,1.146,2.768v.808c0,.276-.224,.5-.5,.5s-.5-.224-.5-.5v-.808c0-.767-.311-1.518-.854-2.061Z" />
        </svg>
    );
}
