"use client"

import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import { DecorativeLeftSection } from "@/components/decorative-left-section"
import { CustomInput } from "@/components/ui/custom-input"
import { useState } from "react"
import { CommonRightSection } from "@/components/common-right-section"
import Link from "next/link"
import Image from "next/image"
import { MdErrorOutline } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { FaTimesCircle,  FaCheckCircle } from "react-icons/fa";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import "@/styles/globals.css"

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  countryCode: Yup.string().required("Country code is required"),
  mobileNumber: Yup.string().required("Mobile number is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[0-9]/, "Password must contain a number")
    .matches(/[!@#$%^&*]/, "Password must contain a special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  agreeToTerms: Yup.boolean().oneOf([true], "You must agree to the terms"),
  captchaVerified: Yup.boolean().oneOf([true], "Please verify you are not a robot"),
})

const countryCodes = [
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "USA", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
]

export default function CPGRAMSRegister() {
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      fullName: "",
      countryCode: "+91",
      mobileNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
      captchaVerified: false,
    },
    validationSchema,
    onSubmit: (values) => {
      const isIndian = values.countryCode === "+91"
      const params = new URLSearchParams({
        userType: isIndian ? "indian" : "nri",
        phone: `${values.mobileNumber}`,
        email: values.email,
      })
      router.push(`/verify-otp?${params.toString()}`)
    },
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)

  const validatePassword = (password: string) => {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*]/.test(password),
    }
  }

  const passwordRequirements = validatePassword(formik.values.password)

  return (
    <div className="flex-1 flex bg-[url('/registration-left-banner.png')] bg-cover">
      <DecorativeLeftSection />
      <CommonRightSection maxWidth="md">
        <div className="flex flex-col gap-4 max-w-[400px]">
          <p className="text-label-dark font-medium text-[22px]">Enter your details to Register</p>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-label-dark font-medium text-sm">
                Full Name<span className="text-error">*</span>
              </label>
              <CustomInput
                type="text"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your full name here"
                className="w-full px-4 py-3 border rounded-lg text-label-dark outline-none"
                error={formik.touched.fullName && !!formik.errors.fullName}
                required
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="flex items-center gap-1">
                  <MdErrorOutline className="text-error" />
                  <p className="text-sm text-error">{formik.errors.fullName}</p>
                </div>
              )}
            </div>

            <div className="w-full flex flex-col gap-1">
              <label className="text-label-dark font-medium text-sm">
                Mobile Number<span className="text-error">*</span>
              </label>
              <div className="min-w-full flex items-center gap-2">
                <CustomInput
                  type="select"
                  options={countryCodes.map((c) => ({ label: `${c.code}`, value: c.code }))}
                  name="countryCode"
                  value={formik.values.countryCode}
                  onChange={formik.handleChange}
                  onSelectChange={(value) => formik.setFieldValue("countryCode", value)}
                  onBlur={formik.handleBlur}
                  className="border-[#C6C6C6] px-2 py-4 cursor-pointer"
                />
                <div className="flex-1">
                  <CustomInput
                    type="tel"
                    name="mobileNumber"
                    value={formik.values.mobileNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your mobile number here"
                    className="flex-1 px-4 py-3 border rounded-lg text-label-dark outline-none"
                    error={formik.touched.mobileNumber && !!formik.errors.mobileNumber}
                    required
                  />
                </div>
              </div>
              {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                <div className="flex items-center gap-1">
                  <MdErrorOutline className="text-error" />
                  <p className="text-sm text-error">{formik.errors.mobileNumber}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-label-dark font-medium text-sm">Email Address</label>
              <CustomInput
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your email ID here"
                className="w-full px-4 py-3 border rounded-lg text-label-dark outline-none"
                error={formik.touched.email && !!formik.errors.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="flex items-center gap-1">
                  <MdErrorOutline className="text-error" />
                  <p className="text-sm text-error">{formik.errors.email}</p>
                </div>
              )}
            </div>

            <div className="relative flex flex-col gap-1">
              <Tooltip open={showPasswordRequirements}>
                <TooltipTrigger
                  asChild
                  onFocus={() => setShowPasswordRequirements(true)}
                  onBlur={() => setShowPasswordRequirements(false)}
                >
                  <label className="text-label-dark font-medium text-sm cursor-pointer">
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
                  type={showPassword ? "text" : "password"}
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
                  type={showConfirmPassword ? "text" : "password"}
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

            <div className="flex items-center justify-between gap-3 py-2 px-4 border border-[#C6C6C6] rounded-lg bg-gray-50">
              <div className="flex items-center gap-2">
                {formik.values.captchaVerified ? (
                  <IoMdCheckmark className="w-7 h-7 text-[#18A164]" />
                ) : (
                  <input
                    type="checkbox"
                    name="captchaVerified"
                    checked={formik.values.captchaVerified}
                    onChange={formik.handleChange}
                    className="w-7 h-7 border border-[#C1C1C1] cursor-pointer"
                  />
                )}
                <span className="text-sm text-gray-700">I'm not a robot</span>
              </div>
              <Image src={'./reCAPTCHA.png'} alt="recaptcha" width={60} height={60} />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formik.values.agreeToTerms}
                  onChange={formik.handleChange}
                  className="w-5 h-5 text-[#613AF5] border-gray-300 rounded focus:ring-[#613AF5] cursor-pointer"
                  required
                />
                <span className="text-xs text-text-hint-2 font-normal">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#613AF5]">
                    Terms of Use
                  </Link>{" "}
                  and have read the{" "}
                  <Link href="/privacy" className="text-[#613AF5]">
                    Privacy Policy
                  </Link>
                </span>
              </div>
              <button
                type="submit"
                className="w-full bg-[#613AF5] text-white rounded-[8px] font-medium py-3 px-8 text-base cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!formik.isValid || !formik.values.agreeToTerms || !formik.values.captchaVerified}
              >
                Continue
              </button>
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
    </div>
  )
}
