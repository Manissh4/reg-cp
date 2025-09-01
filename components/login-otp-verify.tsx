import { MdOutlineChevronRight, MdOutlineMail } from "react-icons/md"
import { CustomInput } from "./ui/custom-input"
import { AlertCircle, CheckCircle } from "lucide-react"
import { IoMdCheckmark } from "react-icons/io"
import Image from "next/image"
import { CustomButton } from "./ui/CustomButton"
import Link from "next/link"
import { FaMobileScreenButton } from "react-icons/fa6"

type LoginOtpVerifyProps = {
    formik: any,
    otpStatus: "idle" | "success" | "error",
    setOtpStatus: (status: "idle" | "success" | "error") => void,
    resendTimer: number,
    handleResend: (type: "email" | "phone") => void,
    otpType: "email" | "phone",
    value: string
}

export function LoginOtpVerify({
    formik,
    otpStatus,
    setOtpStatus: setEmailOtpStatus,
    resendTimer,
    handleResend,
    otpType,
    value
}: LoginOtpVerifyProps) {
    return (
        <div className="flex flex-col gap-12 max-w-[400px]">
            <p className="text-[22px] font-medium text-label-dark">Please Verify OTP to Login</p>
            <div className="flex flex-col gap-3">
                {otpType === 'email' ? 
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MdOutlineMail className="min-w-6 min-h-6" />
                        <p className="text-[#6B7383] font-normal">Please enter OTP sent to <span className="text-label-dark font-medium">{value}</span></p>
                    </div> : 
                    <div className="flex items-center gap-2 text-sm">
                        <FaMobileScreenButton className="min-w-6 min-h-6" />
                        <p className="text-[#6B7383] font-normal">Please enter OTP sent to <span className="text-label-dark font-medium">+91 {value}</span></p>
                    </div>
                }

                <div className="flex">
                    <CustomInput
                        type="otp"
                        otpLength={6}
                        value={formik.values.Otp}
                        onChange={(e) => {
                            formik.setFieldValue("emailOtp", e.target.value)
                            if (otpStatus !== "idle") {
                                setEmailOtpStatus("idle")
                            }
                        }}
                        error={otpStatus === "error"}
                        success={otpStatus === "success"}
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
                            onClick={() => handleResend("email")}
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
                        onClick={() => handleResend("email")}
                        disabled={resendTimer > 0}
                        className=" disabled:text-gray-400 cursor-pointer"
                    >
                        <div className="flex items-center text-sm text-[#613AF5] font-medium">
                            {resendTimer > 0 ? <p className="opacity-50">{`Resend (${resendTimer}s)`}</p> : <span className="flex items-center">Resend <MdOutlineChevronRight className="w-6 h-6 p-0" /></span>}
                        </div>
                    </button>
                </div>}
            </div>
            <div className="flex items-center justify-between gap-3 py-2 px-4 border border-[#C6C6C6] rounded-lg bg-gray-50 max-w-3/4">
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
                <Image src={'/reCAPTCHA.png'} alt="recaptcha" width={60} height={60} />
            </div>
            <div className='flex flex-col gap-4'>
                <CustomButton
                    value='Verify & Login'
                    variant='primary'
                    style='py-3 px-8'
                    handleClick={() => {
                        formik.handleSubmit()
                    }}
                    disabled={!(formik.isValid && formik.dirty)}
                />
                <div className="flex items-center gap-2">
                    <p className="text-text-hint text-sm">Don't have an account?</p>
                    <Link href="/auth" className=" text-[#613AF5] hover:underline font-medium">
                        Register Now
                    </Link>
                </div>
            </div>
        </div>
    )
}