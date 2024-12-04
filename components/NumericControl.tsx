import { Button } from "./ui/button";

type NumericControlProps = {
    value: number;
    onChange: (newValue: number) => void;
    disabledMore?: boolean;
    disabledLess?: boolean;
};

export default function NumericControl({ value, onChange, disabledMore, disabledLess }: NumericControlProps) {
    const increment = () => onChange(value + 1);
    const decrement = () => onChange(value > 0 ? value - 1 : 0);

    return (
        <div className="flex items-center space-x-4">
            <Button variant="outline" className="bg-transparent" disabled={disabledLess || value === 0} onClick={decrement}>-</Button>
            <span className={`text-2xl font-bold px-2 min-w-8 opacity-${disabledMore ? '50' : '0'}`}>{value}</span>
            <Button variant="outline" className="bg-transparent" disabled={disabledMore} onClick={increment}>+</Button>
        </div>
    );
}
