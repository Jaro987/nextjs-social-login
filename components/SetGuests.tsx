import { useState, useEffect } from "react";
import InputWithLabel from "./InputWithLabel";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

//TODO: add to tenant
const minimumCost = 180;
const fixedFamilyRate = 220;
const fourToFiveAdultsRate = 250;

export default function SetGuests() {
    const [adults, setAdults] = useState<number>(() => parseInt(localStorage.getItem('adults') || "0"));
    const [children, setChildren] = useState<number>(() => parseInt(localStorage.getItem('children') || "0"));
    const [infants, setInfants] = useState<number>(() => parseInt(localStorage.getItem('infants') || "0"));
    const [total, setTotal] = useState<number>(0);

    const router = useRouter();
    const pathname = usePathname();


    useEffect(() => {
        localStorage.setItem('adults', adults.toString());
    }, [adults]);

    useEffect(() => {
        localStorage.setItem('children', children.toString());
    }, [children]);

    useEffect(() => {
        localStorage.setItem('infants', infants.toString());
    }, [infants]);

    useEffect(() => {
        let calculatedTotal = adults * 90 + children * 50;

        const isFamily = adults >= 2 && (children > 0 || infants > 0);
        if (isFamily) {
            calculatedTotal = fixedFamilyRate;
        }
        else if (adults >= 4 && adults <= 5 && children === 0 && infants === 0) {
            calculatedTotal = fourToFiveAdultsRate;
        }

        else if (calculatedTotal < 180) {
            calculatedTotal = minimumCost;
        }

        setTotal(calculatedTotal);
        localStorage.setItem('price', calculatedTotal.toString());
    }, [adults, children, infants]);

    return (
        <>
            <InputWithLabel
                type="number"
                id="adults"
                placeholder="(13y and more)"
                value={adults.toString()}
                onChange={(value) => setAdults(parseInt(value))}
                disabledMore={adults === 5}
                disabledLess={adults === 0}
            />
            <InputWithLabel
                type="number"
                id="children"
                placeholder="(2y-13y)"
                value={children.toString()}
                onChange={(value) => setChildren(parseInt(value))}
                disabledMore={adults === 5 || children === 10}
                disabledLess={children === 0}
            />
            <InputWithLabel
                type="number"
                id="infants"
                placeholder="(under 2y)"
                value={infants.toString()}
                onChange={(value) => setInfants(parseInt(value))}
                disabledMore={adults === 5}
                disabledLess={infants === 0}
            />
            <div className="mt-4">
                <p className="text-lg font-semibold">Total to Pay: ${total}</p>
            </div>
            {pathname !== '/book' && <Button className="mt-4" variant='ghost' onClick={() => router.push("/book")}>Let me see available dates</Button>}
        </>
    );
}
