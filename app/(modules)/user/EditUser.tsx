'use client'

import { CustomInput } from "@/components/ui/custom-input";
import { CustomButton } from "@/components/ui/CustomButton";
import useMaxHeight from "@/hooks/use-maxHeight";
import { languages } from "@/utils/CountryCodes";
import Image from "next/image";
import { CiGlobe } from "react-icons/ci";
import { FaUserLarge } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";

export default function EditUser() {

    const maxHeight = useMaxHeight(220)

    return (
        <div className="w-full h-full bg-white rounded-2xl flex flex-col gap-2 overflow-y-auto scrollbar-hide" style={{maxHeight}}>
            <div className="w-full py-6 px-8 flex items-center justify-between border-b border-[#DDDDDD]">
                <div className="flex items-center gap-6">
                    <div
                        className="min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px] rounded-full flex items-center justify-center bg-[#F4F3F9] font-semibold text-6xl"
                        style={{ color: "linear-gradient(90deg, #1E3C72 0%, #1E3C72 1%, #2A5298 100%)" }}
                    >P</div>
                    <p className="text-label-dark font-semibold text-3xl">Pranav Krishnaa S</p>
                </div>
                <div className="flex gap-3 items-start">
                    <CiGlobe className="w-6 h-6" style={{ color: "linear-gradient(90deg, #1E3C72 0%, #1E3C72 1%, #2A5298 100%)" }} />
                    <CustomInput
                        type="select"
                        name="languages"
                        label="Preferred Language"
                        options={languages}
                        value={"English"}
                        className="w-full min-w-72 cursor-pointer"
                        containerClassName="flex flex-col gap-1"
                    />
                </div>
            </div>
            <div className="w-full py-6 px-8 border-b border-[#DDDDDD] flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <FaUserLarge className="w-6 h-6" />
                        <p className="text-label-dark font-semibold text-xl">Personal Information</p>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-8">
                            <CustomInput
                                type="text"
                                name="fullName"
                                label="Full Name"
                                placeholder="Pranav Krishnaa S"
                                className=""
                                containerClassName="flex flex-col gap-1 w-1/2"
                            />
                            {/* Dummy input for styling */}
                            <CustomInput
                                type="email"
                                name="email"
                                label="Email"
                                placeholder="Enter Email address"
                                className=""
                                containerClassName="flex flex-col gap-1 w-1/2 invisible"
                            />
                        </div>
                        <div className="w-full flex items-center gap-8">
                            <CustomInput
                                type="text"
                                name="mobile"
                                label="Mobile Number"
                                placeholder="+91-8248469714"
                                className=""
                                containerClassName="flex flex-col gap-1 w-1/2"
                            />
                            <CustomInput
                                type="email"
                                name="email"
                                label="Email"
                                placeholder="Enter Email address"
                                className=""
                                containerClassName="flex flex-col gap-1 w-1/2"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <IoLocationOutline className="w-6 h-6" />
                        <p className="text-label-dark font-semibold text-xl">Address</p>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-8">
                            <CustomInput
                                type="text"
                                name="Village / City / Town"
                                label="Village / City / Town"
                                placeholder="Enter Village / City / Town"
                                className=""
                                containerClassName="flex flex-col gap-1 w-1/2"
                            />
                            <CustomInput
                                type="select"
                                name="district"
                                label="District"
                                options={languages}
                                value={"English"}
                                className="w-full cursor-pointer"
                                containerClassName="flex flex-col gap-1 w-1/2"
                            />
                        </div>
                        <div className="w-full flex items-center gap-8">
                            <CustomInput
                                type="select"
                                name="state"
                                label="State"
                                options={languages}
                                value={"English"}
                                className="w-full cursor-pointer"
                                containerClassName="flex flex-col gap-1 w-1/2"
                            />
                            <CustomInput
                                type="email"
                                name="pin code"
                                label="Pin Code"
                                placeholder="Enter Pin Code"
                                className=""
                                containerClassName="flex flex-col gap-1 w-1/2"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <CustomButton
                        value="Save Profile"
                        variant="primary"
                        style="py-2.5 px-6 text-sm"
                    />
                </div>
            </div>
            <div className="w-full py-6 px-8 flex flex-col gap-6">
                <div className="flex items-center gap-2">
                    <Image src={'/trash.png'} alt="delete" width={24} height={24} />
                    <p className="text-label-dark font-semibold text-xl">Delete Account</p>
                </div>
                <p className="text-text-hint font-normal text-sm">You can delete your profile to permanently remove all your data.<br />
                    Please note: this action is irreversible and your profile cannot be restored once deleted.</p>
                <CustomInput
                    type="textarea"
                    name="reason"
                    label="Reason for Deletion"
                    placeholder="Write your reason here..."
                    containerClassName="flex flex-col gap-1 max-w-11/12"
                    rows={5}
                />
                <div>
                    <CustomButton
                        value="Delete Profile"
                        variant="dangerSecondary"
                        style="py-2.5 px-6 text-sm"
                    />
                </div>
            </div>
        </div>
    )
}