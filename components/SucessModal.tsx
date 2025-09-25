import { LiaTimesSolid } from "react-icons/lia";
import { CustomButton } from "./ui/CustomButton";
import { cn } from "@/lib/utils";

interface SuccessModalProps {
    handleCancel?: () => void;
    handleAction: () => void;
    handleModalClose: () => void;
    title: string;
    titleIcon: React.ReactNode;
    message: string;
    leftButtonIcon?: React.ReactNode;
    rightButtonIcon?: React.ReactNode;
    cancelButton?: boolean;
    cancelButtonText?: string;
    ActionButtonText: string;
    cancelButtonVariant?: 'danger' | 'secondary' | 'primary' | 'dangerSecondary';
    actionButtonVariant?: 'danger' | 'secondary' | 'primary' | 'dangerSecondary';
    messageClassName?: string
};

export default function SuccessModal({
    handleCancel,
    handleAction,
    handleModalClose,
    title,
    message,
    ActionButtonText,
    cancelButton,
    cancelButtonText,
    titleIcon,
    rightButtonIcon,
    leftButtonIcon,
    cancelButtonVariant,
    actionButtonVariant,
    messageClassName
}: SuccessModalProps) {

    return (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-[500px] w-full flex flex-col border border-[#CED4DA]">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center justify-center gap-2">
                        {titleIcon}
                        <p className="font-medium text-base">{title}</p>
                    </div>
                    <LiaTimesSolid className="text-[#212121] min-w-6 min-h-6 font-extrabold cursor-pointer" onClick={handleModalClose} />
                </div>
                <p className={cn("text-sm text-[#727272] py-3 px-4 font-normal", messageClassName)}>{message}</p>
                <div className="flex justify-end p-4">
                    <div className="flex items-center justify-center gap-4">
                        {cancelButton && (
                            <CustomButton
                                value={cancelButtonText || "Cancel"}
                                handleClick={handleCancel}
                                style={'text-sm py-2.5 px-8'}
                                variant={cancelButtonVariant || "danger"}
                            />
                        )}
                        <CustomButton
                            value={ActionButtonText}
                            handleClick={handleAction}
                            style={'text-sm py-2.5 px-8'}
                            variant={actionButtonVariant || "primary"}
                            rightIcon={rightButtonIcon}
                            leftIcon={leftButtonIcon}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}