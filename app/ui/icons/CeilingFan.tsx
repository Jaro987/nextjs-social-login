type Props = {
    size?: number;
    color?: string;
}

export default function CeilingFan({ size = 24, color = 'white' }: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`${color}`} height={`${size}px`} width={`${size}px`}>
            <path d="m22.98,10.346c-.721-.804-1.714-1.278-2.798-1.336-1.661-.081-4.16.444-5.969.983-.179-.197-.378-.371-.603-.515.164-.177.324-.352.494-.533,1.375-1.456,2.797-2.96,2.89-4.691C17.113,2.032,15.42.126,13.219.006c-1.067-.062-2.08.302-2.872,1.013-.804.721-1.278,1.715-1.336,2.798-.09,1.676.443,4.161.982,5.969-.197.179-.371.378-.515.603-.178-.164-.354-.325-.534-.495-1.455-1.374-2.96-2.795-4.69-2.888C2.054,6.892.127,8.581.006,10.781c-.059,1.06.302,2.08,1.014,2.873.721.804,1.714,1.278,2.798,1.336.125.006.255.01.389.01,1.655,0,3.907-.494,5.58-.993.178.197.378.371.603.515-.164.177-.324.352-.494.533-1.375,1.456-2.796,2.96-2.889,4.691-.119,2.222,1.574,4.127,3.775,4.247.074.004.147.006.221.006.979,0,1.914-.358,2.651-1.02.804-.721,1.278-1.714,1.336-2.798.09-1.676-.443-4.161-.982-5.969.197-.179.371-.378.515-.603.178.164.354.325.534.495,1.455,1.374,2.96,2.795,4.69,2.888.073.004.146.006.22.006,2.125,0,3.91-1.654,4.027-3.781.059-1.06-.302-2.08-1.014-2.873Zm-10.98,3.654c-1.103,0-2-.897-2-2s.897-2,2-2,2,.897,2,2-.897,2-2,2Zm-1.991-10.129c.044-.817.401-1.565,1.006-2.108.595-.533,1.36-.801,2.149-.759,1.651.09,2.921,1.524,2.832,3.195-.073,1.365-1.367,2.734-2.618,4.059-.258.274-.51.543-.751.81-.202-.043-.412-.068-.627-.068-.4,0-.78.082-1.129.224-.468-1.64-.941-3.886-.863-5.353ZM3.87,13.991c-.816-.043-1.564-.4-2.106-1.005-.533-.594-.803-1.358-.76-2.15.091-1.651,1.554-2.924,3.196-2.831,1.364.073,2.732,1.365,4.057,2.616.274.259.544.511.811.753-.043.203-.068.412-.068.627,0,.4.082.78.224,1.129-1.64.469-3.883.943-5.354.863Zm10.121,6.138c-.044.816-.401,1.565-1.006,2.107-.593.533-1.359.801-2.149.759-1.651-.09-2.921-1.524-2.832-3.195.073-1.365,1.367-2.734,2.618-4.058.258-.275.51-.544.751-.81.202.043.412.068.627.068.4,0,.78-.082,1.129-.224.468,1.64.941,3.886.863,5.353Zm5.809-4.134c-1.364-.073-2.732-1.365-4.057-2.616-.274-.259-.544-.511-.811-.753.043-.202.068-.412.068-.627,0-.4-.082-.78-.224-1.129,1.64-.469,3.886-.938,5.354-.862.816.043,1.564.4,2.106,1.005.533.594.803,1.358.76,2.15-.091,1.651-1.53,2.932-3.196,2.831Z" />
        </svg>
    );
}
