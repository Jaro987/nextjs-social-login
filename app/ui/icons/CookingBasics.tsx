type Props = {
    size?: number;
    color?: string;
}

export default function CookingBasics({ size = 24, color = 'white' }: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`${color}`} height={`${size}px`} width={`${size}px`}>
            <path xmlns="http://www.w3.org/2000/svg" d="M23.5,13h-2.551c-.232-1.14-1.242-2-2.449-2h-1c-1.208,0-2.217,.86-2.449,2h-2.551c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h.5v6.5c0,1.93,1.57,3.5,3.5,3.5h3c1.93,0,3.5-1.57,3.5-3.5v-6.5h.5c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5Zm-6-1h1c.651,0,1.201,.419,1.408,1h-3.816c.207-.581,.757-1,1.408-1Zm4.5,8.5c0,1.379-1.121,2.5-2.5,2.5h-3c-1.379,0-2.5-1.121-2.5-2.5v-6.5h8v6.5Zm-11.033-2.069c.093-.329,.023-.678-.188-.957-.225-.297-.582-.474-.956-.474H1.183c-.379,0-.724,.174-.946,.477-.221,.301-.286,.696-.174,1.056,.183,.584,.512,1.088,.935,1.489-.303,.048-.583,.205-.77,.452-.211,.278-.28,.628-.188,.957,.422,1.513,1.83,2.569,3.425,2.569H7.535c1.595,0,3.003-1.057,3.425-2.569,.093-.329,.023-.679-.188-.957-.189-.25-.474-.408-.782-.453,.454-.427,.802-.966,.976-1.59Zm-1.149,2.569c.073,0,.13,.04,.18,.161-.302,1.083-1.314,1.839-2.462,1.839H3.465c-1.147,0-2.16-.756-2.44-1.923,.028-.037,.085-.077,.158-.077H9.817Zm-2.279-1H3.462c-1.132,0-2.114-.71-2.444-1.767-.025-.079,.005-.138,.025-.165,.022-.031,.065-.068,.14-.068H9.823c.074,0,.131,.04,.181,.161-.302,1.083-1.316,1.839-2.466,1.839ZM20.5,7c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5h-7.525c-.257-3.351-3.059-6-6.475-6C2.916,0,0,2.916,0,6.5s2.916,6.5,6.5,6.5c3.415,0,6.218-2.649,6.475-6h7.525ZM6.5,12c-3.032,0-5.5-2.467-5.5-5.5S3.468,1,6.5,1s5.5,2.467,5.5,5.5-2.468,5.5-5.5,5.5Zm4.5-5.5c0,.276-.224,.5-.5,.5s-.5-.224-.5-.5c0-1.93-1.57-3.5-3.5-3.5s-3.5,1.57-3.5,3.5,1.57,3.5,3.5,3.5c.276,0,.5,.224,.5,.5s-.224,.5-.5,.5c-2.481,0-4.5-2.019-4.5-4.5S4.019,2,6.5,2s4.5,2.019,4.5,4.5Z" />
        </svg>
    );
}
