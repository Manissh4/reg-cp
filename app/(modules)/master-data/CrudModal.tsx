import { CustomButton } from '@/components/ui/CustomButton'
import { cn } from '@/lib/utils'
import React from 'react'
import { LiaTimesSolid } from 'react-icons/lia'

interface CrudModalProps {
    isTitleIcon?: Boolean
    titleIcon?: React.ReactNode
    title: string
    children: React.ReactNode
    actionButtonText: string
    className: string
    handleAction: () => void
    handleModalClose: () => void
}

const CrudModal = ({
    isTitleIcon,
    titleIcon,
    title,
    children,
    actionButtonText,
    className,
    handleAction,
    handleModalClose
 }: CrudModalProps) => {
    return (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
            <div className={cn("bg-white rounded-lg w-full flex flex-col border border-[#CED4DA]", className)}>
                <header className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                        {isTitleIcon && titleIcon}
                        <p className="font-semibold text-xl text-label-dark">{title}</p>
                    </div>
                    <LiaTimesSolid className="text-[#212121] min-w-6 min-h-6 font-extrabold cursor-pointer" onClick={handleModalClose} />
                </header>
                <main className="border-b border-[#DDDDDD]">{children}</main>
                <footer className="flex justify-end px-6 py-3">
                    <div className="flex items-center justify-center gap-4">
                        <CustomButton
                            value={"Cancel"}
                            handleClick={handleModalClose}
                            style={'text-sm py-2.5 px-8'}
                            variant={"dangerSecondary"}
                        />
                        <CustomButton
                            value={actionButtonText}
                            handleClick={handleAction}
                            style={'text-sm py-2.5 px-8'}
                            variant={"primary"}
                        />
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default CrudModal