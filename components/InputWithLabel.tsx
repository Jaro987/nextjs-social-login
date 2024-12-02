import { ChangeEventHandler } from "react";
import NumericControl from "./NumericControl";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputWithLabelProps {
    type: string;
    id: string;
    placeholder?: string;
    value: string;
    disabled?: boolean;
    iconPosition?: 'left' | 'right';
    icon?: React.ReactNode;
    onChange: (value: string) => void;
    disabledMore?: boolean;
    disabledLess?: boolean;
}

export default function InputWithLabel({ type, id, placeholder, value, disabled, iconPosition = 'left', icon, onChange, disabledMore, disabledLess }: InputWithLabelProps) {
    const capitalized = id.charAt(0).toUpperCase() + id.slice(1);
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        let inputValue = e.target.value;
        if (type === 'tel') {
            inputValue = inputValue.replace(/[^0-9]/g, '');
        }
        onChange(inputValue);
    };

    return (
        <div className="grid max-w-sm items-center gap-1.5">
            <Label htmlFor={id}>
                {capitalized} {type === 'number' && ` ${placeholder}`} {disabled && <span className="text-gray-400 text-xs">{`(you can't change this)`}</span>}
            </Label>
            {type === 'number' ? (
                <NumericControl value={Number(value)} onChange={(newValue) => onChange(newValue.toString())} disabledMore={disabled || disabledMore} disabledLess={disabled || disabledLess} />
            ) : disabled ? (
                <div
                    className={`peer block w-full rounded-md border border-gray-500 py-[9px] ${icon ? (iconPosition === 'right' ? 'pr-10' : 'pl-10') : ''
                        } text-sm outline-2 placeholder:text-white/50 bg-transparent focus:border-gray-900 focus:border-gray-300 focus:outline-0 focus:ring-0`}
                >
                    <p className="pl-3">{value}</p>
                </div>
            ) : (
                <div className="relative">
                    <Input
                        type={type}
                        id={id}
                        placeholder={placeholder}
                        value={value}
                        disabled={disabled}
                        onChange={handleInputChange}
                        className={`peer block w-full rounded-md border border-gray-500 py-[9px] ${icon ? (iconPosition === 'right' ? 'pr-10' : 'pl-10') : ''
                            } text-sm outline-2 placeholder:text-white/50 bg-transparent focus:border-gray-900 focus:border-gray-300 focus:outline-0 focus:ring-0`}
                    />
                    {icon && icon}
                </div>
            )}
        </div>
    );
}
