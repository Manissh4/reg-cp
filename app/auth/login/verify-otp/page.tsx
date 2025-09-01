'use client'

import { CommonRightSection } from "@/components/common-right-section";
import { LoginOtpVerify } from "@/components/login-otp-verify";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyOTPLogin() {

    const [otpStatus, setOtpStatus] = useState<"idle" | "success" | "error">("idle");
    const [resendTimer, setResendTimer] = useState(0);
    const type = useSearchParams().get("type") as "email" | "phone";
    const value = useSearchParams().get("value") as string;

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [resendTimer])

    const handleResend = () => {
        setResendTimer(30)
    }

    const formik = useFormik({
        initialValues: {
            Otp: "",
        },
        onSubmit: (values) => {
            console.log(values);
        }
    })

    return (
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
    )
}