"use client"

import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSearchParams, useRouter } from "next/navigation"
import { CommonRightSection } from "@/components/common-right-section"
import { CustomInput } from "@/components/ui/custom-input"
import { CheckCircle, AlertCircle, X } from "lucide-react"
import { FaMobileScreenButton } from "react-icons/fa6";
import { MdOutlineMail, MdOutlineChevronRight } from "react-icons/md";
import "@/styles/globals.css"
import Link from "next/link"
import { CustomButton } from "@/components/ui/CustomButton"
import SuccessModal from "@/components/SucessModal"

const getValidationSchema = (userType: string, email: string | null, phone: string | null) => {
  if (userType === "nri" && email) {
    // NRI user, only email OTP required
    return Yup.object({
      emailOtp: Yup.string().length(6, "OTP must be 6 digits").required("Email OTP is required"),
    })
  }
  if (phone && !email) {
    // Only phone present, only phone OTP required
    return Yup.object({
      phoneOtp: Yup.string().length(6, "OTP must be 6 digits").required("Phone OTP is required"),
    })
  }
  if (phone && email) {
    // Both present, require both OTPs
    return Yup.object({
      phoneOtp: Yup.string().length(6, "OTP must be 6 digits").required("Phone OTP is required"),
      emailOtp: Yup.string().length(6, "OTP must be 6 digits").required("Email OTP is required"),
    })
  }
  // Default: require at least one
  return Yup.object({
    emailOtp: Yup.string().length(6, "OTP must be 6 digits"),
    phoneOtp: Yup.string().length(6, "OTP must be 6 digits"),
  })
}

export default function VerifyOTPPage() {
  const searchParams = useSearchParams()
  const router = useRouter();
  const userType = searchParams.get("userType") || "indian"
  const phone = searchParams.get("phone")
  const email = searchParams.get("email")
  const mode = searchParams.get("mode")
  const isNRI = userType === "nri"

  const [phoneResendTimer, setPhoneResendTimer] = useState(0)
  const [emailResendTimer, setEmailResendTimer] = useState(0)
  const [phoneOtpStatus, setPhoneOtpStatus] = useState<"idle" | "success" | "error">("idle")
  const [emailOtpStatus, setEmailOtpStatus] = useState<"idle" | "success" | "error">("idle")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const getInitialValues = () => {
    if (isNRI) {
      return { emailOtp: "" }
    }
    return {
      phoneOtp: "",
      emailOtp: "",
    }
  }

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: getValidationSchema(userType, email, phone),
    onSubmit: (values) => {
      // NRI: only email OTP
      if (isNRI && values.emailOtp) {
        if (values.emailOtp === "123456") {
          setEmailOtpStatus("success");
          if (mode === "register") {
            setShowSuccessModal(true);
          } else if (mode === "forgot-password") {
            router.push("/auth/create-password");
          }
        } else {
          setEmailOtpStatus("error");
        }
        return;
      }

      // Phone only: only phone OTP
      if (!isNRI && phone && !email && values.phoneOtp) {
        if (values.phoneOtp === "123456") {
          setPhoneOtpStatus("success");
          if (mode === "register") {
            setShowSuccessModal(true);
          } else if (mode === "forgot-password") {
            router.push("/auth/create-password");
          }
        } else {
          setPhoneOtpStatus("error");
        }
        return;
      }

      // Both present: require both OTPs
      if (!isNRI && phone && email) {
        let valid = true;
        if (values.phoneOtp !== "123456") {
          setPhoneOtpStatus("error");
          valid = false;
        } else {
          setPhoneOtpStatus("success");
        }
        if (values.emailOtp !== "123456") {
          setEmailOtpStatus("error");
          valid = false;
        } else {
          setEmailOtpStatus("success");
        }
        if (valid) {
          if (mode === "register") {
            setShowSuccessModal(true);
          } else if (mode === "forgot-password") {
            router.push("/auth/create-password");
          }
        }
        return;
      }
    }
  })

  const handleResend = (type: "phone" | "email") => {
    if (type === "phone") {
      setPhoneOtpStatus("idle")
      setPhoneResendTimer(30)
      const timer = setInterval(() => {
        setPhoneResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      setEmailOtpStatus("idle")
      setEmailResendTimer(30)
      const timer = setInterval(() => {
        setEmailResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  const handleModalClose = () => {
    setShowSuccessModal(false);
    router.push('/auth/login');
  }

  return (
    <>
      <CommonRightSection maxWidth="md">
        <div className="flex flex-col gap-12 max-w-[400px]">
          <p className="text-[22px] font-medium text-label-dark">Verify OTP</p>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-12">
            {!isNRI && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <FaMobileScreenButton className="min-w-6 min-h-6" />
                  <p className="text-[#6B7383] font-normal">Please enter OTP sent to <span className="text-label-dark font-medium">+91 {phone}</span></p>
                </div>

                <div className="flex">
                  <CustomInput
                    type="otp"
                    otpLength={6}
                    value={formik.values.phoneOtp || ""}
                    onChange={(e) => {
                      formik.setFieldValue("phoneOtp", e.target.value)
                      if (phoneOtpStatus !== "idle") {
                        setPhoneOtpStatus("idle")
                      }
                    }}
                    error={phoneOtpStatus === "error"}
                    success={phoneOtpStatus === "success"}
                  />
                </div>

                {phoneOtpStatus === "success" && (
                  <div className="flex items-center gap-2 text-sm text-[#3C9718] font-normal">
                    <CheckCircle className="w-4 h-4" />
                    <span>OTP Verified successfully</span>
                  </div>
                )}

                {phoneOtpStatus === "error" && (
                  <div className="flex items-center justify-between gap-2 text-sm text-[#B7131A] font-normal">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>Incorrect OTP</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleResend("email")}
                      disabled={emailResendTimer > 0}
                      className=" disabled:text-gray-400 cursor-pointer"
                    >
                      <div className="flex items-center text-sm text-[#613AF5] font-medium">
                        {emailResendTimer > 0 ? `Resend (${emailResendTimer}s)` : "Resend"}
                        <MdOutlineChevronRight className="w-6 h-6" />
                      </div>
                    </button>
                  </div>
                )}

                {phoneOtpStatus === "idle" && <div className="flex justify-between items-center">
                  <span className="text-sm text-text-hint font-normal">Didn't receive OTP?</span>
                  <button
                    type="button"
                    onClick={() => handleResend("email")}
                    disabled={emailResendTimer > 0}
                    className=" disabled:text-gray-400 cursor-pointer"
                  >
                    <div className="flex items-center text-sm text-[#613AF5] font-medium">
                      {emailResendTimer > 0 ? `Resend (${emailResendTimer}s)` : "Resend"}
                      <MdOutlineChevronRight className="w-6 h-6" />
                    </div>
                  </button>
                </div>}
              </div>
            )}
            {email && <><div className="w-full border border-[#DDDDDD]" />
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MdOutlineMail className="min-w-6 min-h-6" />
                  <p className="text-[#6B7383] font-normal">Please enter OTP sent to <span className="text-label-dark font-medium">{email}</span></p>
                </div>

                <div className="flex">
                  <CustomInput
                    type="otp"
                    otpLength={6}
                    value={formik.values.emailOtp}
                    onChange={(e) => {
                      formik.setFieldValue("emailOtp", e.target.value)
                      if (emailOtpStatus !== "idle") {
                        setEmailOtpStatus("idle")
                      }
                    }}
                    error={emailOtpStatus === "error"}
                    success={emailOtpStatus === "success"}
                  />
                </div>

                {emailOtpStatus === "success" && (
                  <div className="flex items-center gap-2 text-sm text-[#3C9718] font-normal">
                    <CheckCircle className="w-4 h-4" />
                    <span>OTP Verified successfully</span>
                  </div>
                )}

                {emailOtpStatus === "error" && (
                  <div className="flex items-center justify-between gap-2 text-sm text-[#B7131A] font-normal">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>Incorrect OTP</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleResend("email")}
                      disabled={emailResendTimer > 0}
                      className=" disabled:text-gray-400 cursor-pointer"
                    >
                      <div className="flex items-center text-sm text-[#613AF5] font-medium">
                        {emailResendTimer > 0 ? `Resend (${emailResendTimer}s)` : "Resend"}
                        <MdOutlineChevronRight className="w-6 h-6" />
                      </div>
                    </button>
                  </div>
                )}

                {emailOtpStatus === "idle" && <div className="flex justify-between items-center">
                  <span className="text-sm text-text-hint font-normal">Didn't receive OTP?</span>
                  <button
                    type="button"
                    onClick={() => handleResend("email")}
                    disabled={emailResendTimer > 0}
                    className=" disabled:text-gray-400 cursor-pointer"
                  >
                    <div className="flex items-center text-sm text-[#613AF5] font-medium">
                      {emailResendTimer > 0 ? `Resend (${emailResendTimer}s)` : "Resend"}
                      <MdOutlineChevronRight className="w-6 h-6" />
                    </div>
                  </button>
                </div>}
              </div></>}
            <div className="flex flex-col gap-4">
              <CustomButton
                value={mode === 'register' ? "Verify" : "Verify & Continue"}
                style="text-base py-3 px-8"
                disabled={
                  (isNRI && (!formik.values.emailOtp || formik.values.emailOtp.length !== 6)) ||
                  (!isNRI && email && phone && (
                    !formik.values.emailOtp || formik.values.emailOtp.length !== 6 ||
                    !formik.values.phoneOtp || formik.values.phoneOtp.length !== 6
                  )) ||
                  (!isNRI && phone && !email && (
                    !formik.values.phoneOtp || formik.values.phoneOtp.length !== 6
                  )) ||
                  phoneOtpStatus === "error" ||
                  emailOtpStatus === "error"
                }
                handleClick={() => formik.handleSubmit()}
              />
              <div className="flex items-center gap-2">
                <p className="text-text-hint text-sm">{mode === 'register' ? `Already have an account?` : 'Remember Password?'} </p>
                <Link href="/" className=" text-[#613AF5] hover:underline font-medium">
                  Log In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </CommonRightSection>

      {showSuccessModal &&
        <SuccessModal
          title='Register Successfully'
          message="Registration successful! You can now log in to submit grievances, track their status, and receive updates from the concerned authorities"
          handleModalClose={handleModalClose}
          buttonText="Done"
        />}
    </>
  )
}
