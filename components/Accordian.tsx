import { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
    headerClassName?: string;
    containerClassName?: string;
    maxHeight?: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false, headerClassName, containerClassName, maxHeight }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={cn("border rounded-2xl shadow-sm p-5", containerClassName)}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={cn("flex items-center gap-2 w-full pb-5", headerClassName)}
            >
                <span className="text-label-dark font-semibold text-xl cursor-pointer">{title}</span>
                <div className="flex items-center justify-center cursor-pointer">
                    {isOpen ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM15.92 12.75H7.92C7.51 12.75 7.17 12.41 7.17 12C7.17 11.59 7.51 11.25 7.92 11.25H15.92C16.33 11.25 16.67 11.59 16.67 12C16.67 12.41 16.34 12.75 15.92 12.75Z" fill="url(#paint0_linear_56041_26845)" />
                            <defs>
                                <linearGradient id="paint0_linear_56041_26845" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#1E3C72" />
                                    <stop offset="0.01" stopColor="#1E3C72" />
                                    <stop offset="1" stopColor="#2A5298" />
                                </linearGradient>
                            </defs>
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z" fill="url(#paint0_linear_56136_21815)" />
                            <defs>
                                <linearGradient id="paint0_linear_56136_21815" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#1E3C72" />
                                    <stop offset="0.01" stopColor="#1E3C72" />
                                    <stop offset="1" stopColor="#2A5298" />
                                </linearGradient>
                            </defs>
                        </svg>
                    }
                </div>
            </div>
            <div
                className={cn(
                    "transition-all overflow-hidden",
                    isOpen ? `${maxHeight} pt-5` : "max-h-0",
                )}
            >
                {children}
            </div>
        </div>
    );
};

export default Accordion;