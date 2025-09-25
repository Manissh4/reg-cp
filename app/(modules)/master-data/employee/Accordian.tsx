import { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border rounded-2xl shadow-sm bg-[#F5F7FA] p-5">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 w-full pb-5 rounded-t-2xl border-b border-[#DDDDDD]"
            >
                <span className="text-label-dark font-semibold text-xl cursor-pointer">{title}</span>
                <div className="flex items-center justify-center cursor-pointer">
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
                </div>
            </div>
            <div
                className={`transition-all overflow-hidden ${isOpen ? "max-h-screen pt-5" : "max-h-0"
                    }`}
            >
                {children}
            </div>
        </div>
    );
};

export default Accordion;