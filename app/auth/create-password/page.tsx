'use client'

import { CommonRightSection } from "@/components/common-right-section";
import SuccessModal from "@/components/SucessModal";
import { CustomInput } from "@/components/ui/custom-input";
import { CustomButton } from "@/components/ui/CustomButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";

export default function CreatePasswordPage() {

    const validatePassword = (password: string) => {
        return {
            minLength: password.length >= 8,
            hasUppercase: /[A-Z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasSpecialChar: /[!@#$%^&*]/.test(password),
        }
    }

    const validationSchema = Yup.object({
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(/[A-Z]/, "Password must contain an uppercase letter")
            .matches(/[0-9]/, "Password must contain a number")
            .matches(/[!@#$%^&*]/, "Password must contain a special character")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm password is required"),
    })

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: (values) => {
            setShowSuccessModal(true);
        },
    })

    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)
    const passwordRequirements = validatePassword(formik.values.password)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const router = useRouter();

    const handleModalClose = () => {
        setShowSuccessModal(false);
        router.push('/auth/login');
    }

    return (
        <>
            <CommonRightSection>
                <div className="flex flex-col gap-12 max-w-[358px]">
                    <p className="text-label-dark font-medium text-[22px]">Create a new password</p>
                    <form className="flex flex-col gap-1">
                        <div className="relative flex flex-col gap-1">
                            <Tooltip open={showPasswordRequirements}>
                                <TooltipTrigger
                                    asChild
                                    onFocus={() => setShowPasswordRequirements(true)}
                                    onBlur={() => setShowPasswordRequirements(false)}
                                >
                                    <label className="text-label-dark font-medium text-sm">
                                        Create Password
                                    </label>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="top"
                                    sideOffset={8}
                                    className="bg-label-dark text-white rounded-xl p-3 font-medium text-sm opacity-85"
                                    align="start"
                                >
                                    <div className="text-sm font-medium mb-3">Requirements:</div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            {passwordRequirements.minLength ? (
                                                <FaCheckCircle className="w-5 h-5 text-success" />
                                            ) : (
                                                <FaTimesCircle className="w-5 h-5 text-error" />
                                            )}
                                            <span className="text-sm">Minimum of 8 characters</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {passwordRequirements.hasUppercase ? (
                                                <FaCheckCircle className="w-5 h-5 text-success" />
                                            ) : (
                                                <FaTimesCircle className="w-5 h-5 text-error" />
                                            )}
                                            <span className="text-sm">Contain an uppercase letters</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {passwordRequirements.hasNumber ? (
                                                <FaCheckCircle className="w-5 h-5 text-success" />
                                            ) : (
                                                <FaTimesCircle className="w-5 h-5 text-error" />
                                            )}
                                            <span className="text-sm">Contain a number (0-9)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {passwordRequirements.hasSpecialChar ? (
                                                <FaCheckCircle className="w-5 h-5 text-success" />
                                            ) : (
                                                <FaTimesCircle className="w-5 h-5 text-error" />
                                            )}
                                            <span className="text-sm">Contain special character (!@#$%^&*)</span>
                                        </div>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                            <div className="flex flex-col gap-3">
                                <CustomInput
                                    type={"password"}
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onFocus={() => setShowPasswordRequirements(true)}
                                    onBlur={() => setShowPasswordRequirements(false)}
                                    placeholder="Create password"
                                    className="w-full px-4 py-3 border rounded-lg text-label-dark outline-none"
                                    required
                                />
                                <CustomInput
                                    type={"password"}
                                    name="confirmPassword"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Confirm password"
                                    className="w-full px-4 py-3 border rounded-lg text-label-dark outline-none"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                    <CustomButton
                        value="Create Password"
                        handleClick={formik.handleSubmit}
                        style="py-3 px-8"
                        disabled={!(formik.isValid && formik.dirty)}
                    />
                </div>
            </CommonRightSection>
            {showSuccessModal && 
                <SuccessModal 
                    title="Password Updated Successfully"
                    message="Your password has been updated successfully. You can now use your new password to log in."
                    buttonText="Done"
                    handleModalClose={handleModalClose}
                />
            }
        </>
    )
}