"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { CheckedState } from "@radix-ui/react-checkbox"

type CheckboxWithTextProps = {
    id: string
    checked?: boolean
    label: string
    description?: string
    onChange: (checked: CheckedState) => void


}

export default function CheckboxWithText({
    id,
    checked,
    label,
    description,
    onChange
}: CheckboxWithTextProps) {
    return (
        <div className="items-top flex space-x-2">
            <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
            <div className="grid gap-1.5 leading-none">
                <label
                    htmlFor={id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {label}
                </label>
                {description && <p className="text-sm text-gray-500">
                    {description}
                </p>}
            </div>
        </div>
    )
}
