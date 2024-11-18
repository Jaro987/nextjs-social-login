import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEventHandler } from "react";

type InputWithLabelProps = {
    type: string;
    id: string;
    placeholder: string;
    disabled?: boolean;
    icon?: JSX.Element;
    iconPosition?: 'left' | 'right';
    value?: string;
    onChange: ChangeEventHandler<HTMLInputElement>
}

export default function InputWithLabel({ type, id, placeholder, value, disabled, iconPosition = 'left', icon, onChange }: InputWithLabelProps) {
    const capitalized = id.charAt(0).toUpperCase() + id.slice(1);
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor={id}>{capitalized} {disabled && <span className="text-gray-400 text-xs">{`(you can't change this)`}</span>}</Label>
            {disabled ?
                <div className={`peer block w-full rounded-md border border-gray-500 py-[9px] ${icon ? iconPosition === 'right' ? 'pr-10' : 'pl-10' : ''} text-sm outline-2 placeholder:text-white/50 bg-transparent focus:border-gray-900 focus:border-gray-300 focus:outline-0 focus:ring-0`}>
                    <p className="pl-3" >
                        {value}
                    </p>
                </div> :
                <div className="relative">
                    <Input type={type} id={id} placeholder={placeholder} defaultValue={value} disabled={disabled} onChange={onChange}
                        className={`peer block w-full rounded-md border border-gray-500 py-[9px] ${icon ? iconPosition === 'right' ? 'pr-10' : 'pl-10' : ''} text-sm outline-2 placeholder:text-white/50 bg-transparent focus:border-gray-900 focus:border-gray-300 focus:outline-0 focus:ring-0`} />
                    {icon && icon}
                </div>}
        </div>
    )
}
