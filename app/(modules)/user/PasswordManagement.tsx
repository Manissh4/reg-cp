'use client'

import { CustomInput } from "@/components/ui/custom-input";
import { CustomButton } from "@/components/ui/CustomButton";
import { LuLockKeyhole } from "react-icons/lu";

export default function PasswordManagement() {
    return (
        <div className="w-full h-full bg-white rounded-2xl py-6 px-8">
            <div className="max-w-1/2 flex flex-col gap-8">
                <div className="flex items-center gap-2">
                    <LuLockKeyhole className="w-6 h-6" style={{ color: "linear-gradient(90deg, #1E3C72 0%, #1E3C72 1%, #2A5298 100%)" }} />
                    <p className="text-label-dark font-semibold text-xl">Change Password</p>
                </div>
                <div className="flex flex-col gap-2">
                    <CustomInput
                        type="password"
                        name="old password"
                        label="Enter Old Password"
                        placeholder="Enter Old Password"
                        containerClassName="w-full flex flex-col gap-1"
                    />
                    <p className="text-[#FF7501] font-medium text-base cursor-pointer">Forgot Password</p>
                </div>
                <div className="flex flex-col gap-3">
                    <CustomInput
                        type={"password"}
                        name="password"
                        label="Create New Password"
                        placeholder="Create New Password"
                        containerClassName="w-full flex flex-col gap-1"
                    />
                    <CustomInput
                        type={"password"}
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        containerClassName="w-full"
                    />
                </div>
                <div className="flex items-center gap-6">
                    <CustomButton
                        value="Update Password"
                        variant="primary"
                        style="py-2.5 px-6 text-sm"
                    />
                    <CustomButton
                        value="Cancel"
                        variant="dangerSecondary"
                        style="py-2.5 px-8 text-sm"
                    />
                </div>
            </div>
        </div>
    )
}