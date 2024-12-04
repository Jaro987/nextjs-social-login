type Props = {
    size?: number;
    color?: string;
}

export default function Fireplace({ size = 24, color = 'white' }: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`${color}`} height={`${size}px`} width={`${size}px`}>
            <path xmlns="http://www.w3.org/2000/svg" d="m13.612,14.102c-.475-.378-.923-.736-1.258-1.071l-.38-.38-.352.406c-.723.834-.894,1.869-1.032,2.7-.182,1.096-.283,1.243-.59,1.243-.385,0-.497-.866-.503-1.08l-.038-1.181-.821.847c-.703.726-1.638,1.869-1.638,3.414,0,2.757,2.243,5,5,5s5-2.243,5-5c0-2.196-1.879-3.694-3.388-4.898Zm-.905,8.554c-.39.389-1.024.39-1.414,0-.39-.391-.39-1.025,0-1.416l.708-.708.707.707c.39.391.39,1.026,0,1.416Zm1.208-.167c.188-.674.027-1.426-.501-1.955l-1.414-1.415-1.415,1.415c-.529.529-.69,1.281-.501,1.955-1.236-.681-2.084-1.981-2.084-3.489,0-.774.318-1.43.716-1.973.215.524.609.973,1.284.973,1.231,0,1.423-1.153,1.576-2.079.097-.583.204-1.229.506-1.78.279.243.587.488.906.743,1.412,1.125,3.012,2.401,3.012,4.116,0,1.508-.849,2.808-2.085,3.49Zm9.085.51V4.618l.895-1.78.038-.104c.166-.662.02-1.351-.4-1.889-.42-.538-1.052-.847-1.735-.847H2.202C1.52,0,.887.309.467.847.047,1.385-.099,2.073.067,2.735l.933,1.878v18.386H0v1h5v-11.738c.769-.513,3.638-2.262,7-2.262s6.231,1.749,7,2.262v11.738h5v-1h-1ZM1.255,1.462c.229-.293.574-.462.947-.462h19.596c.373,0,.718.168.947.462.219.28.301.636.23.981l-.783,1.557H1.808l-.783-1.557c-.071-.346.011-.701.23-.981Zm18.745,21.538v-11.251l-.201-.15c-.143-.106-3.54-2.599-7.799-2.599s-7.656,2.493-7.799,2.599l-.201.15v11.251h-2V5h20v18h-2Z" />
        </svg>
    );
}