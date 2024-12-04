type Props = {
    size?: number;
    color?: string;
}

export default function FireExtinguisher({ size = 24, color = 'white' }: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`${color}`} height={`${size}px`} width={`${size}px`}>
            <path xmlns="http://www.w3.org/2000/svg" d="m12.5,3h-6.5v-1.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v1.573c-1.704.162-3.341.71-4.776,1.657-.23.152-.294.462-.142.693.096.146.255.225.418.225.095,0,.19-.027.275-.083,1.271-.839,2.718-1.334,4.225-1.492v1.953c-2.799.254-5,2.611-5,5.475v8.5c0,2.206,1.794,4,4,4h3c2.206,0,4-1.794,4-4v-8.5c0-2.864-2.201-5.221-5-5.475v-2.025h6.5c.276,0,.5-.224.5-.5s-.224-.5-.5-.5Zm-2.5,8.5v8.5c0,1.654-1.346,3-3,3h-3c-1.654,0-3-1.346-3-3h7c.276,0,.5-.224.5-.5s-.224-.5-.5-.5H1v-7.5c0-2.481,2.019-4.5,4.5-4.5s4.5,2.019,4.5,4.5ZM23.381.357c-.393-.307-.896-.415-1.375-.294l-5.426,1.298c-.945.29-1.581,1.149-1.581,2.138s.637,1.851,1.613,2.147l5.389,1.304c.13.033.263.049.394.049.354,0,.699-.117.986-.341.393-.307.619-.769.619-1.268V1.625c0-.499-.226-.96-.619-1.268Zm-.381,5.034c0,.188-.085.363-.234.479-.148.116-.338.156-.525.11l-5.364-1.298c-.524-.159-.876-.634-.876-1.183s.351-1.022.843-1.174l5.401-1.292c.049-.012.099-.018.149-.018.134,0,.264.044.373.129.148.116.234.291.234.479v3.766Z" />
        </svg>
    );
}
