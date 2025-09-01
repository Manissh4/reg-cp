import { FaCircleCheck } from "react-icons/fa6";
import { LiaTimesSolid } from "react-icons/lia";
import { CustomButton } from "./ui/CustomButton";

interface SuccessModalProps {
    handleModalClose: () => void;
    title: string;
    message: string;
    buttonText: string;
};

export default function SuccessModal({ handleModalClose, title, message, buttonText }: SuccessModalProps) {
    return (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full flex flex-col border border-[#CED4DA]">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center justify-center gap-2">
                        <FaCircleCheck className="text-[#3C9718] min-w-6 min-h-6" />
                        <p className="font-medium text-base">{title}</p>
                    </div>
                    <LiaTimesSolid className="text-[#212121] min-w-6 min-h-6 font-extrabold cursor-pointer" onClick={handleModalClose} />
                </div>
                <p className="text-sm text-[#727272] py-3 px-4 font-normal">{message}</p>
                <div className="flex justify-end p-4">
                    <CustomButton
                        value={buttonText}
                        handleClick={handleModalClose}
                        style={'text-sm py-2.5 px-6'}
                    />
                </div>
            </div>
        </div>
    )
}