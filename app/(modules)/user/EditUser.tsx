'use client'

import { CustomInput } from "@/components/ui/custom-input";
import { CustomButton } from "@/components/ui/CustomButton";
import useMaxHeight from "@/hooks/use-maxHeight";
import { languages } from "@/utils/CountryCodes";
import Image from "next/image";
import { CiGlobe } from "react-icons/ci";
import { FaUserLarge } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRef, useState } from "react";
import SuccessModal from "@/components/SucessModal";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import OTPModal from "./OTPModal";

export default function EditUser() {

    const maxHeight = useMaxHeight(220);
    const [showDeleteModal, setShowDeleteModal] = useState<Boolean>(false)
    const [isDeleted, setIsDeleted] = useState<Boolean>(false)
    const [otpModalOpen, setOtpModalOpen] = useState<"mobile" | "email" | null>(null)
    const [mobileStatus, setMobileStatus] = useState<"present" | "edited" | "verified">("present");
    const [emailStatus, setEmailStatus] = useState<"present" | "edited" | "verified">("present");
    const [editMobile, setEditMobile] = useState<Boolean>(false);
    const [editEmail, setEditEmail] = useState<Boolean>(false);
    const mobileInputRef = useRef<HTMLInputElement | null>(null);
    const emailInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    const userValidationSchema = Yup.object({
        language: Yup.string(),
        fullName: Yup.string().required("Full name is required"),
        mobileNumber: Yup.string().required("Mobile number is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        city: Yup.string().required("Village / City / Town is required"),
        district: Yup.string().required("District is required"),
        state: Yup.string().required("State is required"),
        pinCode: Yup.string().required("Pin Code is required"),
        isMobileVerified: Yup.boolean().oneOf([true], "Please verify your mobile number"),
        isEmailVerified: Yup.boolean().oneOf([true], "Please verify your email"),
    })

    const deleteValidationSchema = Yup.object({
        reason: Yup.string().required("Reason is required")
    })

    const userFormik = useFormik({
        initialValues: {
            language: "English",
            fullName: "Pranav Krishnaa S",
            mobileNumber: "+91-8248469714",
            email: "pranavkrishnaa.s@goml.io",
            city: "",
            district: "Select District",
            state: "Select State",
            pinCode: "",
            isMobileVerified: false,
            isEmailVerified: false,
        },
        validationSchema: userValidationSchema,
        onSubmit: (values) => {
            console.log("values", values);
            userFormik.resetForm();
            setEmailStatus('present')
            setMobileStatus('present')
        },
    })

    const deleteFormik = useFormik({
        initialValues: {
            reason: ""
        },
        validationSchema: deleteValidationSchema,
        onSubmit: (values) => {
            console.log("values", values);
            deleteFormik.resetForm();
        }
    })

    const handleDelete = () => {
        setIsDeleted(true)
    }

    const handleRoute = () => {
        router.push('/')
    }

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        userFormik.handleChange(e);
        setMobileStatus("edited");
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        userFormik.handleChange(e);
        setEmailStatus("edited");
    };

    return (
        <div className="w-full h-full bg-white rounded-2xl flex flex-col gap-2 overflow-y-auto scrollbar-hide" style={{ maxHeight }}>
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
                        name="language"
                        label="Preferred Language"
                        options={languages}
                        className="w-full min-w-72 cursor-pointer"
                        containerClassName="flex flex-col gap-1"
                        value={userFormik.values.language}
                        onChange={userFormik.handleChange}
                        onSelectChange={(value) => userFormik.setFieldValue("language", value)}
                        onBlur={userFormik.handleBlur}
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
                                containerClassName="flex flex-col gap-1 w-1/2"
                                value={userFormik.values.fullName}
                                onChange={userFormik.handleChange}
                                onBlur={userFormik.handleBlur}
                                error={userFormik.touched.fullName && !!userFormik.errors.fullName}
                                disabled
                            />
                            {/* Dummy input for styling */}
                            <CustomInput
                                type="text"
                                name="dummy"
                                label="Email"
                                placeholder="Enter Email address"
                                containerClassName="flex flex-col gap-1 w-1/2 invisible"
                            />
                        </div>
                        <div className="w-full flex items-center gap-8">
                            {/* Mobile Number */}
                            <CustomInput
                                ref={mobileInputRef}
                                type="text"
                                name="mobileNumber"
                                label="Mobile Number"
                                containerClassName="flex flex-col gap-1 w-1/2"
                                value={userFormik.values.mobileNumber}
                                onChange={handleMobileChange}
                                onBlur={userFormik.handleBlur}
                                error={userFormik.touched.mobileNumber && !!userFormik.errors.mobileNumber}
                                suffixIcon={
                                    mobileStatus === "present" ? (
                                        <MdEdit className="text-[#FF7501] w-5 h-5 cursor-pointer" />
                                    ) : mobileStatus === "edited" ? (
                                        <p className="text-[#FF7501] font-normal text-sm cursor-pointer">Verify</p>
                                    ) : (
                                        <FaCheckCircle className="text-success w-5 h-5" />
                                    )
                                }
                                onSuffixIconClick={() => {
                                    if (mobileStatus === "present") {
                                        setEditMobile(true);
                                        mobileInputRef.current?.focus();
                                    } else if (mobileStatus === "edited") {
                                        setOtpModalOpen("mobile")
                                    }
                                }}
                                disabled={!editMobile}
                            />

                            {/* Email */}
                            <CustomInput
                                ref={emailInputRef}
                                type="email"
                                name="email"
                                label="Email"
                                placeholder="Enter Email address"
                                containerClassName="flex flex-col gap-1 w-1/2"
                                value={userFormik.values.email}
                                onChange={handleEmailChange}
                                onBlur={userFormik.handleBlur}
                                error={userFormik.touched.email && !!userFormik.errors.email}
                                suffixIcon={
                                    emailStatus === "present" ? (
                                        <MdEdit className="text-[#FF7501] w-5 h-5 cursor-pointer" />
                                    ) : emailStatus === "edited" ? (
                                        <p className="text-[#FF7501] font-normal text-sm cursor-pointer">Verify</p>
                                    ) : (
                                        <FaCheckCircle className="text-success w-5 h-5" />
                                    )
                                }
                                onSuffixIconClick={() => {
                                    if (emailStatus === "present") {
                                        setEditEmail(true)
                                        emailInputRef.current?.focus();
                                    } else if (emailStatus === "edited") {
                                        setOtpModalOpen("email")
                                    }
                                }}
                                disabled={!editEmail}
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
                                name="city"
                                label="Village / City / Town"
                                placeholder="Enter Village / City / Town"
                                className=""
                                containerClassName="flex flex-col gap-1 w-1/2"
                                value={userFormik.values.city}
                                onChange={userFormik.handleChange}
                                onBlur={userFormik.handleBlur}
                                error={userFormik.touched.city && !!userFormik.errors.city}
                            />
                            <CustomInput
                                type="select"
                                name="district"
                                label="District"
                                options={languages}
                                className="w-full cursor-pointer"
                                containerClassName="flex flex-col gap-1 w-1/2"
                                value={userFormik.values.district}
                                onChange={userFormik.handleChange}
                                onSelectChange={(value) => userFormik.setFieldValue("district", value)}
                                onBlur={userFormik.handleBlur}
                            />
                        </div>
                        <div className="w-full flex items-center gap-8">
                            <CustomInput
                                type="select"
                                name="state"
                                label="State"
                                options={languages}
                                className="w-full cursor-pointer"
                                containerClassName="flex flex-col gap-1 w-1/2"
                                value={userFormik.values.state}
                                onChange={userFormik.handleChange}
                                onSelectChange={(value) => userFormik.setFieldValue("state", value)}
                                onBlur={userFormik.handleBlur}
                            />
                            <CustomInput
                                type="email"
                                name="pinCode"
                                label="Pin Code"
                                placeholder="Enter Pin Code"
                                className=""
                                containerClassName="flex flex-col gap-1 w-1/2"
                                value={userFormik.values.pinCode}
                                onChange={userFormik.handleChange}
                                onBlur={userFormik.handleBlur}
                                error={userFormik.touched.pinCode && !!userFormik.errors.pinCode}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <CustomButton
                        value="Save Profile"
                        variant="primary"
                        style="py-2.5 px-6 text-sm"
                        disabled={!(userFormik.isValid && userFormik.dirty)}
                        handleClick={() => userFormik.handleSubmit()}
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
                    value={deleteFormik.values.reason}
                    onChange={deleteFormik.handleChange}
                    onBlur={deleteFormik.handleBlur}
                    error={deleteFormik.touched.reason && !!deleteFormik.errors.reason}
                    required
                />
                <div>
                    <CustomButton
                        value="Delete Profile"
                        variant="dangerSecondary"
                        style="py-2.5 px-6 text-sm"
                        disabled={!(deleteFormik.isValid && deleteFormik.dirty)}
                        handleClick={() => setShowDeleteModal(true)}
                    />
                </div>
            </div>
            {showDeleteModal &&
                <SuccessModal
                    title={isDeleted ? 'Profile Deactivated Successfully' : 'Delete Profile'}
                    titleIcon={isDeleted ? <FaCheckCircle className="w-6 h-6 text-success" /> : <Image src={'/trash.png'} alt="delete" width={24} height={24} />}
                    handleModalClose={() => setShowDeleteModal(false)}
                    message={isDeleted ? 'Your profile has been deactivated successfully. Inactive profiles can be reactivated anytime.' : "Are you sure you want to Delete your profile. Deleted profiles can't be restored"}
                    cancelButton={!isDeleted ? true : false}
                    cancelButtonVariant="secondary"
                    actionButtonVariant={isDeleted ? "primary" : 'danger'}
                    ActionButtonText={isDeleted ? 'Done' : "Yes, Delete"}
                    handleAction={isDeleted ? handleRoute : handleDelete}
                    handleCancel={() => setShowDeleteModal(false)}
                />
            }
            {otpModalOpen &&
                <OTPModal
                    inputType={otpModalOpen}
                    value={otpModalOpen === 'email' ? userFormik.values.email : userFormik.values.mobileNumber}
                    handleModalClose={() => setOtpModalOpen(null)}
                    setStatus={() => otpModalOpen === 'email' ? setEmailStatus('verified') : setMobileStatus('verified')}
                    handleEdit={() => otpModalOpen === 'email' ? setEditEmail(false) : setEditMobile(false)}
                    handleVerify={() => otpModalOpen === 'email' ? userFormik.setFieldValue("isEmailVerified", true) : userFormik.setFieldValue("isMobileVerified", true)}
                />
            }
        </div>
    )
}