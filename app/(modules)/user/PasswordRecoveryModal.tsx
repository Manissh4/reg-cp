'use client'

import { CustomInput } from "@/components/ui/custom-input";
import { CustomButton } from "@/components/ui/CustomButton"
import { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia"
import { useFormik } from "formik"
import * as Yup from "yup"
import { FaMobileScreenButton } from "react-icons/fa6";
import { AlertCircle, CheckCircle } from "lucide-react";
import { MdOutlineChevronRight, MdOutlineMail } from "react-icons/md";
import { cn } from "@/lib/utils";

interface PasswordRecoveryModalProps {
    handleModalClose: () => void;
}

export default function PasswordRecoveryModal({
    handleModalClose
}: PasswordRecoveryModalProps) {

    const [showOTPMode, setShowOTPMode] = useState(false);
    const [otpStatus, setOtpStatus] = useState<"idle" | "success" | "error">("idle");
    const [resendTimer, setResendTimer] = useState(0)
    const [inputType, setInputType] = useState<"email" | "mobile" | "invalid" | null>(null)

    const detectInputType = (value: string): "email" | "mobile" | "invalid" => {
        if (!value) return "invalid";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[6-9]\d{9}$/; // ✅ Indian mobile number

        if (emailRegex.test(value)) return "email";
        if (mobileRegex.test(value)) return "mobile";

        return "invalid";
    };

    const formik = useFormik({
        initialValues: {
            mobileOrEmail: "",
            otp: ""
        },
        validationSchema: Yup.object({
            mobileOrEmail: Yup.string()
                .required("Mobile number or email is required")
                .test("is-valid", "Invalid input", function (value) {
                    const type = detectInputType(value || "");
                    if (type === "invalid") {
                        return this.createError({ message: "Enter a valid email or Indian mobile number" });
                    }
                    return true;
                }),
            otp: showOTPMode
                ? Yup.string()
                    .required("OTP is required")
                    .length(6, "OTP must be 6 digits")
                : Yup.string()
        }),
        onSubmit: (values) => {
            if (!showOTPMode) {
                console.log("Sending OTP to:", values.mobileOrEmail);
                setInputType(detectInputType(formik.values.mobileOrEmail))
                setShowOTPMode(true);
            } else {
                console.log("Verifying OTP:", values.otp);
                if (values.otp === '123456') {
                    setOtpStatus('success');
                    setTimeout(() => {
                        handleModalClose();
                    }, 3000)
                } else {
                    setOtpStatus('error');
                }
            }
        }
    });

    const handleResend = () => {
        setOtpStatus("idle")
        formik.setFieldValue("otp", "");
        setResendTimer(30)
        const timer = setInterval(() => {
            setResendTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
    }

    return (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-[500px] w-full flex flex-col border border-[#CED4DA]">
                <div className="flex items-center justify-between p-4">
                    <p className="font-medium text-base">
                        {showOTPMode ? "Verify OTP" : "Password Recovery"}
                    </p>
                    <LiaTimesSolid
                        className="text-[#212121] min-w-6 min-h-6 font-extrabold cursor-pointer"
                        onClick={handleModalClose}
                    />
                </div>
                <form className="p-4 flex flex-col gap-6">
                    {!showOTPMode ? (
                        <CustomInput
                            type="text"
                            name="mobileOrEmail"
                            label="Enter mobile number or registered email address to receive OTP"
                            value={formik.values.mobileOrEmail}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.mobileOrEmail && !!formik.errors.mobileOrEmail}
                            helperText={formik.errors.mobileOrEmail}
                        />
                    ) : (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-sm">
                                {inputType === 'mobile' ? <FaMobileScreenButton className="min-w-6 min-h-6" /> : <MdOutlineMail className="min-w-6 min-h-6" />}
                                <p className="text-[#6B7383] font-normal">Please enter OTP sent to <span className="text-label-dark font-medium">{inputType === 'mobile' ? `+91 ${formik.values.mobileOrEmail}` : formik.values.mobileOrEmail}</span></p>
                            </div>

                            <div className="flex">
                                <CustomInput
                                    type="otp"
                                    otpLength={6}
                                    value={formik.values.otp || ""}
                                    onChange={(e) => {
                                        formik.setFieldValue("otp", e.target.value)
                                        if (otpStatus !== "idle") {
                                            setOtpStatus("idle")
                                        }
                                    }}
                                    error={otpStatus === "error"}
                                    success={otpStatus === "success"}
                                    containerClassName="w-full"
                                    otpSlotWidth="w-[70px]"
                                />
                            </div>

                            {otpStatus === "success" && (
                                <div className="flex items-center gap-2 text-sm text-[#3C9718] font-normal">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>OTP Verified successfully</span>
                                </div>
                            )}

                            {otpStatus === "error" && (
                                <div className="flex items-center justify-between gap-2 text-sm text-[#B7131A] font-normal">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>Incorrect OTP</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleResend()}
                                        disabled={resendTimer > 0}
                                        className=" disabled:text-gray-400 cursor-pointer"
                                    >
                                        <div className="flex items-center text-sm text-[#613AF5] font-medium">
                                            {resendTimer > 0 ? `Resend (${resendTimer}s)` : "Resend"}
                                            <MdOutlineChevronRight className="w-6 h-6" />
                                        </div>
                                    </button>
                                </div>
                            )}

                            {otpStatus === "idle" && <div className="flex justify-between items-center">
                                <span className="text-sm text-text-hint font-normal">Didn't receive OTP?</span>
                                <button
                                    type="button"
                                    onClick={() => handleResend()}
                                    disabled={resendTimer > 0}
                                    className=" disabled:text-gray-400 cursor-pointer"
                                >
                                    <div className={cn("flex items-center text-sm text-[#613AF5] font-medium", resendTimer > 0 && 'opacity-50 cursor-not-allowed')}>
                                        {resendTimer > 0 ? `Resend (${resendTimer}s)` : "Resend"}
                                        <MdOutlineChevronRight className="w-6 h-6" />
                                    </div>
                                </button>
                            </div>}
                        </div>
                    )}
                    <div className="flex justify-end">
                        <CustomButton
                            value={showOTPMode ? "Verify" : "Continue"}
                            style="text-sm py-2.5 px-8 w-full"
                            handleClick={formik.handleSubmit}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
