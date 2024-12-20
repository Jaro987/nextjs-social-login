type Props = {
    size?: number;
    color?: string;
}

export default function CityView({ size = 24, color = 'white' }: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`${color}`} height={`${size}px`} width={`${size}px`}>
            <path xmlns="http://www.w3.org/2000/svg" d="M14,13h2v1h-2v-1Zm4,1h2v-1h-2v1Zm-4,4h2v-1h-2v1Zm4,0h2v-1h-2v1ZM14,6h2v-1h-2v1Zm4,0h2v-1h-2v1Zm-4,4h2v-1h-2v1Zm4,0h2v-1h-2v1Zm6-7.5V24H0V8.329c0-.668,.26-1.296,.732-1.768L3.439,3.854c1.085-1.085,3.036-1.085,4.121,0l2.439,2.439V2.5c0-1.378,1.122-2.5,2.5-2.5h9c1.378,0,2.5,1.122,2.5,2.5Zm-14,5.829c0-.401-.156-.777-.439-1.061l-2.707-2.707c-.713-.713-1.994-.713-2.707,0L1.439,7.268c-.283,.284-.439,.66-.439,1.061v14.671H10V8.329ZM23,2.5c0-.827-.673-1.5-1.5-1.5H12.5c-.827,0-1.5,.673-1.5,1.5V23h12V2.5ZM4,14h3v-1h-3v1Zm0-4h3v-1h-3v1Zm0,8h3v-1h-3v1Z" />
        </svg>
    );
}
