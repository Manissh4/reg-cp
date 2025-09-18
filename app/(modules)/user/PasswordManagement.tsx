'use client'

import { CustomInput } from "@/components/ui/custom-input";
import { CustomButton } from "@/components/ui/CustomButton";
import { LuLockKeyhole } from "react-icons/lu";
import { useFormik } from "formik"
import * as Yup from "yup"
import { useState } from "react";
import PasswordRecoveryModal from "./PasswordRecoveryModal";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/SucessModal";
import { FaCheckCircle } from "react-icons/fa";

export default function PasswordManagement() {

    const [showPasswordRecoveryModal, setShowPasswordRecoveryModal] = useState<Boolean>(false);
    const [isForgotPassword, setIsForgotPassword] = useState<Boolean>(false);
    const [showSuccessModal, setShowSuccessModal] = useState<Boolean>(false);
    const router = useRouter();

    const defaultValidationSchema = Yup.object({
        oldPassword: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(/[A-Z]/, "Password must contain an uppercase letter")
            .matches(/[0-9]/, "Password must contain a number")
            .matches(/[!@#$%^&*]/, "Password must contain a special character")
            .required("Password is required"),
        newPassword: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(/[A-Z]/, "Password must contain an uppercase letter")
            .matches(/[0-9]/, "Password must contain a number")
            .matches(/[!@#$%^&*]/, "Password must contain a special character")
            .notOneOf([Yup.ref("oldPassword")], "Old and New Password are same")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Passwords must match")
            .required("Confirm password is required"),
    })

    const forgotPasswordValidationSchema = Yup.object({
        newPassword: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(/[A-Z]/, "Password must contain an uppercase letter")
            .matches(/[0-9]/, "Password must contain a number")
            .matches(/[!@#$%^&*]/, "Password must contain a special character")
            .notOneOf([Yup.ref("oldPassword")], "Old and New Password are same")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Passwords must match")
            .required("Confirm password is required"),
    })

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: isForgotPassword ? forgotPasswordValidationSchema : defaultValidationSchema,
        onSubmit: (values) => {
            console.log('values', values)
            setShowSuccessModal(true)
        },
    })

    const handleRoute = () => {
        setShowSuccessModal(false);
        router.push('/auth/login')
    }

    return (
        <div className="w-full h-full bg-white rounded-2xl py-6 px-8">
            <div className="max-w-1/2 flex flex-col gap-8">
                <div className="flex items-center gap-2">
                    <LuLockKeyhole className="w-6 h-6" style={{ color: "linear-gradient(90deg, #1E3C72 0%, #1E3C72 1%, #2A5298 100%)" }} />
                    <p className="text-label-dark font-semibold text-xl">Change Password</p>
                </div>
                {!isForgotPassword && <div className="flex flex-col gap-2">
                    <CustomInput
                        type="password"
                        name="oldPassword"
                        label="Enter Old Password"
                        placeholder="Enter Old Password"
                        containerClassName="w-full flex flex-col gap-1"
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    <p 
                        className="text-[#FF7501] font-medium text-base cursor-pointer" 
                        onClick={() => {
                            setShowPasswordRecoveryModal(true)
                            setIsForgotPassword(true)
                        }}
                    >
                        Forgot Password
                    </p>
                </div>}
                <div className="flex flex-col gap-3">
                    <CustomInput
                        type={"password"}
                        name="newPassword"
                        label="Create New Password"
                        placeholder="Create New Password"
                        containerClassName="w-full flex flex-col gap-1"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    <CustomInput
                        type={"password"}
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        containerClassName="w-full"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                </div>
                <div className="flex items-center gap-6">
                    <CustomButton
                        value="Update Password"
                        variant="primary"
                        style="py-2.5 px-6 text-sm"
                        disabled={!(formik.isValid && formik.dirty)}
                        handleClick={formik.handleSubmit}
                    />
                    <CustomButton
                        value="Cancel"
                        variant="dangerSecondary"
                        style="py-2.5 px-8 text-sm"
                    />
                </div>
            </div>
            {showPasswordRecoveryModal && 
                <PasswordRecoveryModal
                    handleModalClose={() => setShowPasswordRecoveryModal(false)}
                />
            }
            {showSuccessModal &&
                <SuccessModal
                    title="Password Updated Successfully"
                    titleIcon={<FaCheckCircle className="w-6 h-6 text-success" />}
                    message="Your password has been updated successfully. You can now use your new password to log in."
                    ActionButtonText="Done"
                    handleAction={() => handleRoute()}
                    handleModalClose={() => setShowSuccessModal(false)}
                />
            }
        </div>
    )
}