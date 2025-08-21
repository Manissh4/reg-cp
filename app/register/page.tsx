"use client"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import { CommonHeader } from "@/components/common-header"
import { DecorativeLeftSection } from "@/components/decorative-left-section"
import { CustomInput } from "@/components/ui/custom-input"
import { useState } from "react"
import { CommonRightSection } from "@/components/common-right-section"

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  countryCode: Yup.string().required("Country code is required"),
  mobileNumber: Yup.string().required("Mobile number is required"),
  email: Yup.string().email("Invalid email address"),
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
      fullName: "Arpit Tyagi",
      countryCode: "+91", // Added country code field
      mobileNumber: "8071234567",
      email: "arpittyagi845@gmail.com",
      password: "********",
      confirmPassword: "********",
      agreeToTerms: true,
      captchaVerified: true,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("[v0] Registration form submitted:", values)
      const isIndian = values.countryCode === "+91"
      const params = new URLSearchParams({
        userType: isIndian ? "indian" : "nri",
        phone: `${values.countryCode}${values.mobileNumber}`,
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
    <div className="min-h-screen bg-[#f8fafc]">
      <CommonHeader />

      <div className="flex min-h-[calc(100vh-64px)]">
        <DecorativeLeftSection />

        <CommonRightSection maxWidth="md">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-800 mb-8">Enter your details to Register</h1>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name<span className="text-red-500">*</span>
              </label>
              <CustomInput
                type="text"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your full name here"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent outline-none transition-all"
                error={formik.touched.fullName && !!formik.errors.fullName}
                required
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="text-sm text-red-500 mt-1">{formik.errors.fullName}</div>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number<span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <select
                  name="countryCode"
                  value={formik.values.countryCode}
                  onChange={formik.handleChange}
                  className="px-3 py-3 border border-gray-300 rounded-l-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent outline-none"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <CustomInput
                  type="tel"
                  name="mobileNumber"
                  value={formik.values.mobileNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your mobile number here"
                  className="flex-1 px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent outline-none transition-all"
                  error={formik.touched.mobileNumber && !!formik.errors.mobileNumber}
                  required
                />
              </div>
              {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                <div className="text-sm text-red-500 mt-1">{formik.errors.mobileNumber}</div>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <CustomInput
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your email ID here"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent outline-none transition-all"
                error={formik.touched.email && !!formik.errors.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="flex items-center gap-1 mt-1">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-red-500">{formik.errors.email}</span>
                </div>
              )}
            </div>

            {/* Create Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Create Password</label>
              <div className="relative">
                <CustomInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onFocus={() => setShowPasswordRequirements(true)}
                  onBlur={() => setShowPasswordRequirements(false)}
                  placeholder="Create password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {showPasswordRequirements && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-10">
                  <div className="text-sm font-medium mb-3">Requirements:</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {passwordRequirements.minLength ? (
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <span className="text-sm">Minimum of 8 characters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordRequirements.hasUppercase ? (
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <span className="text-sm">Contain an uppercase letters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordRequirements.hasNumber ? (
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <span className="text-sm">Contain a number (0-9)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordRequirements.hasSpecialChar ? (
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <span className="text-sm">Contain special character (!@#$%^&*)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div className="relative">
                <CustomInput
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent outline-none transition-all"
                  required
                />
                {formik.values.password &&
                  formik.values.confirmPassword &&
                  formik.values.password === formik.values.confirmPassword && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="text-sm text-red-500 mt-1">{formik.errors.confirmPassword}</div>
              )}
            </div>

            {/* reCAPTCHA */}
            <div className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg bg-gray-50">
              {formik.values.captchaVerified ? (
                <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              ) : (
                <input
                  type="checkbox"
                  name="captchaVerified"
                  checked={formik.values.captchaVerified}
                  onChange={formik.handleChange}
                  className="w-5 h-5 text-[#7c3aed] border-gray-300 rounded focus:ring-[#7c3aed]"
                />
              )}
              <span className="text-sm text-gray-700">I'm not a robot</span>
              <div className="ml-auto">
                <div className="text-xs text-gray-500">reCAPTCHA</div>
                <div className="flex gap-1">
                  <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                </div>
              </div>
            </div>

            {/* Terms and Privacy */}
            <div className="flex items-start gap-3">
              {formik.values.agreeToTerms ? (
                <div className="w-5 h-5 bg-[#1877f2] rounded flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              ) : (
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formik.values.agreeToTerms}
                  onChange={formik.handleChange}
                  className="w-5 h-5 text-[#7c3aed] border-gray-300 rounded focus:ring-[#7c3aed] mt-0.5"
                  required
                />
              )}
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <button type="button" className="text-[#1877f2] hover:underline">
                  Terms of Use
                </button>{" "}
                and have read the{" "}
                <button type="button" className="text-[#1877f2] hover:underline">
                  Privacy Policy
                </button>
              </span>
            </div>

            {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
              <div className="text-sm text-red-500 mt-1">{formik.errors.agreeToTerms}</div>
            )}

            {formik.touched.captchaVerified && formik.errors.captchaVerified && (
              <div className="text-sm text-red-500 mt-1">{formik.errors.captchaVerified}</div>
            )}

            <button
              type="submit"
              className="w-full bg-[#7c3aed] hover:bg-[#8b5cf6] text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-lg mt-6"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/" className="text-[#1877f2] hover:underline font-medium">
              Log In
            </a>
          </div>
        </CommonRightSection>
      </div>
    </div>
  )
}
