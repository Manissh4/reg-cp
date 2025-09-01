"use client"

import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSearchParams } from "next/navigation"
import { DecorativeLeftSection } from "@/components/decorative-left-section"
import { CommonRightSection } from "@/components/common-right-section"
import { CustomInput } from "@/components/ui/custom-input"
import { CheckCircle, AlertCircle, X } from "lucide-react"
import { FaCircleCheck } from "react-icons/fa6";
import { FaMobileScreenButton } from "react-icons/fa6";
import { MdOutlineMail, MdOutlineChevronRight } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import "@/styles/globals.css"
import Link from "next/link"
import { CustomButton } from "@/components/ui/CustomButton"

const getValidationSchema = (userType: string) => {
  if (userType === "nri") {
    return Yup.object({
      emailOtp: Yup.string().length(6, "OTP must be 6 digits").required("Email OTP is required"),
    })
  }
  return Yup.object({
    phoneOtp: Yup.string().length(6, "OTP must be 6 digits").required("Phone OTP is required"),
    emailOtp: Yup.string().length(6, "OTP must be 6 digits").required("Email OTP is required"),
  })
}

export default function VerifyOTPPage() {
  const searchParams = useSearchParams()
  const userType = searchParams.get("userType") || "indian"
  const phone = searchParams.get("phone") || "+91 80712 34567"
  const email = searchParams.get("email") || "kevin.work@gmail.com"
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
    validationSchema: getValidationSchema(userType),
    onSubmit: (values) => {

      if (!isNRI && values.phoneOtp) {
        if (values.phoneOtp === "123456") {
          setPhoneOtpStatus("success")
        } else {
          setPhoneOtpStatus("error")
        }
      }

      if (values.emailOtp === "123456") {
        setEmailOtpStatus("success")
      } else {
        setEmailOtpStatus("error")
      }

      const phoneValid = isNRI || values.phoneOtp === "123456"
      const emailValid = values.emailOtp === "123456"

      if (phoneValid && emailValid) {
        setTimeout(() => {
          setShowSuccessModal(true)
        }, 500)
      }
    },
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
            <div className="w-full border border-[#DDDDDD]" />
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
            </div>
            <div className="flex flex-col gap-4">
              <CustomButton
                value="Verify"
                style="text-base py-3 px-8"
                disabled={
                  !formik.values.emailOtp ||
                  formik.values.emailOtp.length !== 6 ||
                  (!isNRI && (!formik.values.phoneOtp || formik.values.phoneOtp.length !== 6)) ||
                  phoneOtpStatus === "error" ||
                  emailOtpStatus === "error"
                }
                handleClick={() => formik.handleSubmit()}
              />
              <div className="flex items-center gap-2">
                <p className="text-text-hint text-sm">Already have an account? </p>
                <Link href="/" className=" text-[#613AF5] hover:underline font-medium">
                  Log In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </CommonRightSection>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full flex flex-col border border-[#CED4DA]">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center justify-center gap-2">
                <FaCircleCheck className="text-[#3C9718] min-w-6 min-h-6" />
                <p className="font-medium text-base">Register Successfully</p>
              </div>
              <LiaTimesSolid className="text-[#212121] min-w-6 min-h-6 font-extrabold cursor-pointer" onClick={handleModalClose} />
            </div>
            <p className="text-sm text-[#727272] py-3 px-4 font-normal">
              Registration successful! You can now log in to submit grievances, track their status, and receive
              updates from the concerned authorities
            </p>
            <div className="flex justify-end p-4">
              <CustomButton 
                value="Done"
                handleClick={handleModalClose}
                style={'text-sm py-2.5 px-6'}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
