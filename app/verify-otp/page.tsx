"use client"

import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSearchParams } from "next/navigation"
import { CommonHeader } from "@/components/common-header"
import { DecorativeLeftSection } from "@/components/decorative-left-section"
import { CommonRightSection } from "@/components/common-right-section"
import { CustomInput } from "@/components/ui/custom-input"
import { Button } from "@/components/ui/button"
import { Phone, Mail, CheckCircle, AlertCircle, X } from "lucide-react"

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
  const phone = searchParams.get("phone") || "+91 8071234567"
  const email = searchParams.get("email") || "kevin.work@gmail.com"
  const isNRI = userType === "nri"

  const [phoneResendTimer, setPhoneResendTimer] = useState(0)
  const [emailResendTimer, setEmailResendTimer] = useState(0)
  const [phoneOtpStatus, setPhoneOtpStatus] = useState<"idle" | "success" | "error">("success")
  const [emailOtpStatus, setEmailOtpStatus] = useState<"idle" | "success" | "error">("success")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const getInitialValues = () => {
    if (isNRI) {
      return { emailOtp: "486231" }
    }
    return {
      phoneOtp: "648132",
      emailOtp: "486231",
    }
  }

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: getValidationSchema(userType),
    onSubmit: (values) => {
      console.log("OTP Verification:", values)

      if (!isNRI && values.phoneOtp) {
        if (values.phoneOtp === "648132") {
          setPhoneOtpStatus("success")
        } else {
          setPhoneOtpStatus("error")
        }
      }

      if (values.emailOtp === "486231") {
        setEmailOtpStatus("success")
      } else {
        setEmailOtpStatus("error")
      }

      const phoneValid = isNRI || values.phoneOtp === "648132"
      const emailValid = values.emailOtp === "486231"

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

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <CommonHeader />

      <div className="flex min-h-[calc(100vh-64px)]">
        <DecorativeLeftSection />

        <CommonRightSection maxWidth="md">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Verify OTP</h2>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-8">
            {!isNRI && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>Please enter OTP sent to {phone}</span>
                </div>

                <div className="flex justify-center">
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
                  <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>OTP Verified successfully</span>
                  </div>
                )}

                {phoneOtpStatus === "error" && (
                  <div className="flex items-center justify-center gap-2 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>Incorrect OTP</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Didn't receive OTP?</span>
                  <button
                    type="button"
                    onClick={() => handleResend("phone")}
                    disabled={phoneResendTimer > 0}
                    className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                  >
                    {phoneResendTimer > 0 ? `Resend (${phoneResendTimer}s)` : "Resend"}
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>Please enter OTP sent to {email}</span>
              </div>

              <div className="flex justify-center">
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
                <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>OTP Verified successfully</span>
                </div>
              )}

              {emailOtpStatus === "error" && (
                <div className="flex items-center justify-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>Incorrect OTP</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Didn't receive OTP?</span>
                <button
                  type="button"
                  onClick={() => handleResend("email")}
                  disabled={emailResendTimer > 0}
                  className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                >
                  {emailResendTimer > 0 ? `Resend (${emailResendTimer}s)` : "Resend"}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#7c3aed] hover:bg-[#8b5cf6] text-white py-3 rounded-lg font-medium"
              disabled={
                !formik.values.emailOtp ||
                formik.values.emailOtp.length !== 6 ||
                (!isNRI && (!formik.values.phoneOtp || formik.values.phoneOtp.length !== 6))
              }
            >
              Verify
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-500">Already have an account? </span>
              <a href="/" className="text-sm text-[#1877f2] hover:underline font-medium">
                Log In
              </a>
            </div>
          </form>
        </CommonRightSection>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">Register Successfully</h3>

              <p className="text-sm text-gray-600 mb-6">
                Registration successful! You can now log in to submit grievances, track their status, and receive
                updates from the concerned authorities
              </p>

              <Button
                onClick={() => {
                  setShowSuccessModal(false)
                  // Navigate to login or dashboard
                  window.location.href = "/"
                }}
                className="w-full bg-[#7c3aed] hover:bg-[#8b5cf6] text-white py-2 rounded-lg font-medium"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
