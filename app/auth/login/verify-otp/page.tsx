'use client'

import { CommonRightSection } from "@/components/common-right-section";
import { LoginOtpVerify } from "@/components/login-otp-verify";
import SuccessModal from "@/components/SucessModal";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

export default function VerifyOTPLogin() {

    const [otpStatus, setOtpStatus] = useState<"idle" | "success" | "error">("idle");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const type = useSearchParams().get("type") as "email" | "phone";
    const value = useSearchParams().get("value") as string;
    const router = useRouter();

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [resendTimer])

    const validationSchema = Yup.object({
        Otp: Yup.string()
            .required("OTP is required")
            .matches(/^\d{6}$/, "OTP must be a 6-digit number"),
        captchaVerified: Yup.boolean().oneOf([true], "Please verify you are not a robot"),
    })

    const handleResend = () => {
        setResendTimer(30)
    }

    const formik = useFormik({
        initialValues: {
            Otp: "",
            captchaVerified: false,
        },
        validationSchema,
        onSubmit: (values) => {
            if (values.Otp === "123456") {
                setOtpStatus("success")
                setShowSuccessModal(true)
            } else {
                setOtpStatus("error")
            }
        }
    })

    return (
        <>
            <CommonRightSection maxWidth="md">
                <LoginOtpVerify
                    formik={formik}
                    otpStatus={otpStatus}
                    setOtpStatus={setOtpStatus}
                    resendTimer={resendTimer}
                    handleResend={handleResend}
                    otpType={type}
                    value={value}
                />
            </CommonRightSection>
            {showSuccessModal && 
                <SuccessModal 
                    title="Login Successful"
                    message="Login successful! You can now access your dashboard to submit grievances, track progress, and stay updated on resolutions from the concerned authorities"
                    handleModalClose={() => {
                        setShowSuccessModal(false)
                        router.push("/lodge")
                    }}
                    buttonText="Done"
                />
            }
        </>
    )
}