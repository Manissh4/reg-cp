'use client'

import Accordion from "@/components/Accordian";
import { useHeaderContext } from "@/components/Context/useHeaderContext";
import { CustomButton } from "@/components/ui/CustomButton";
import { useEffect } from "react";
import ATRSectionA from "./ATRSectionA";
import useMaxHeight from "@/hooks/use-maxHeight";
import { cn } from "@/lib/utils";
import ATRSectionB from "./ATRSectionB";


export default function ATRPage() {

    const { setHeader } = useHeaderContext();
    const maxHeight = useMaxHeight(228);

    console.log("max height" ,maxHeight, `max-h-[${maxHeight}]`)

    useEffect(() => {
        setHeader({
            title: '1267870 - Issue regarding Aadhar Card Delay',
            leftIcon:
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15.0013 20.6695C14.8113 20.6695 14.6213 20.5995 14.4713 20.4495L7.95125 13.9295C6.89125 12.8695 6.89125 11.1295 7.95125 10.0695L14.4713 3.54953C14.7613 3.25953 15.2413 3.25953 15.5312 3.54953C15.8212 3.83953 15.8212 4.31953 15.5312 4.60953L9.01125 11.1295C8.53125 11.6095 8.53125 12.3895 9.01125 12.8695L15.5312 19.3895C15.8212 19.6795 15.8212 20.1595 15.5312 20.4495C15.3813 20.5895 15.1912 20.6695 15.0013 20.6695Z" fill="#FF7501" />
                </svg>,
            className: "bg-neutral-50 shadow-sm",
        });

        return () => setHeader({});
    }, [setHeader]);

    return (
        <div className={cn("bg-[#F5F7FA] h-full p-6")}>
            <div className={cn("bg-white rounded-2xl min-h-full flex flex-col justify-between")}>
                <div className={cn("p-6 flex flex-col gap-8 overflow-auto scrollbar-hide")} style={{ maxHeight }}>
                    <Accordion 
                        title="ATR - Section A" 
                        defaultOpen={false}
                        containerClassName={"p-0 border-none shadow-none"}
                        headerClassName="bg-[#F5F7FA] py-5 px-6 rounded-2xl"
                        maxHeight="max-h-none"
                    >
                        <ATRSectionA />
                    </Accordion>
                    <Accordion 
                        title="ATR - Section B"
                        defaultOpen
                        containerClassName={"p-0 border-none shadow-none"}
                        headerClassName="bg-[#F5F7FA] py-5 px-6 rounded-2xl"
                        maxHeight="max-h-none"
                    >
                        <ATRSectionB />
                    </Accordion>
                </div>
                <div className="px-6 py-3 flex items-center gap-6 border-t border-[#DDDDDD]">
                    <CustomButton
                        value="Validate"
                        style="py-2.5 px-6"
                        handleClick={() => {}}
                    />
                    <CustomButton
                        value="Cancel"
                        style="py-2.5 px-6"
                        handleClick={() => {}}
                        variant="dangerSecondary"
                    />
                </div>
            </div>
        </div>
    )
}