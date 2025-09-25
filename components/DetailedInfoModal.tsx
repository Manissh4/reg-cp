import { IoCloseOutline } from "react-icons/io5";
import { CustomButton } from "./ui/CustomButton";
import { cn } from "@/lib/utils";

interface DetailedInfoModalProps {
    title: string;
    cancelButton?: boolean;
    actionButtonText?: string;
    cancelButtonText?: string;
    handleCancel?: () => void;
    handleAction?: () => void;
    handleModalClose: () => void;
    leftButtonIcon?: React.ReactNode;
    rightButtonIcon?: React.ReactNode;
    children: React.ReactNode;
    maxHeight?: string;
    maxWidth?: string;
    footer?: boolean;
    footerButtonAlignment?: "start" | "end"
}

const DetailedInfoModal = ({
    title,
    cancelButton,
    actionButtonText,
    cancelButtonText,
    handleCancel,
    handleAction,
    handleModalClose,
    leftButtonIcon,
    rightButtonIcon,
    children,
    maxWidth,
    maxHeight,
    footer = true,
    footerButtonAlignment = "end"
}: DetailedInfoModalProps) => {
    return (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
            <div className={cn("bg-white rounded-[12px] w-full flex flex-col", maxWidth, maxHeight)}>
                <header className="flex items-center justify-between py-4 px-6 rounded-tl-[12px] rounded-tr-[12px]" style={{ background: "linear-gradient(90deg, #020926 0%, #091C71 100%)" }}>
                    <p className="font-semibold text-xl text-white">{title}</p>
                    <div className="rounded-[8px] bg-white min-w-6 min-h-6 cursor-pointer flex items-center justify-center">
                        <IoCloseOutline className="min-w-4 min-h-4" onClick={handleModalClose} />
                    </div>
                </header>
                <main className="my-4 mx-2 max-h-[520px] custom-scrollbar">
                    <div className="px-2">
                        {children}
                    </div>
                </main>
                {footer && <footer className={cn("border-t border-[#DDDDDD] py-3 px-6 flex items-center", footerButtonAlignment === "end" ? "justify-end" : "justify-start")}>
                    <div className="flex items-center justify-center gap-4">
                        {cancelButton && (
                            <CustomButton
                                value={cancelButtonText || "Cancel"}
                                handleClick={handleCancel}
                                style={'text-sm py-2.5 px-8'}
                                variant={"dangerSecondary"}
                            />
                        )}
                        <CustomButton
                            value={actionButtonText}
                            handleClick={handleAction}
                            style={'text-sm py-2.5 px-8'}
                            variant={"primary"}
                            rightIcon={rightButtonIcon}
                            leftIcon={leftButtonIcon}
                        />
                    </div>
                </footer>}
            </div>
        </div>
    )
}

export default DetailedInfoModal