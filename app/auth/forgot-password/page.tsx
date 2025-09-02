'use client'

import { CommonRightSection } from "@/components/common-right-section";
import { CustomInput } from "@/components/ui/custom-input";
import { CustomButton } from "@/components/ui/CustomButton";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from 'yup';
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {

    const router = useRouter();

    const validationSchema = Yup.object({
        loginID: Yup.string().required('Login ID is required'),
        emailOrPhone: Yup.string().required('Email or Phone is required')
    })

    const isEmail = (value: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const isMobile = (value: string) =>
        /^(\+?\d{1,4}[- ]?)?\d{10}$/.test(value);

    const formik = useFormik({
        initialValues: {
            loginID: '',
            emailOrPhone: ''
        },
        validationSchema,
        onSubmit: values => {
            if (isEmail(values.emailOrPhone)) {
                console.log("Email entered:", values.emailOrPhone);
                const params = new URLSearchParams({
                    userType: 'nri',
                    email: values.emailOrPhone,
                    mode: 'forgot-password'
                });
                router.push(`/auth/verify-otp?${params.toString()}`);
            } else if (isMobile(values.emailOrPhone)) {
                const match = values.emailOrPhone.match(/^(\+?\d{1,4})?[- ]?(\d{10})$/);
                const countryCode = match?.[1] || '+91';
                const mobileNumber = match?.[2] || values.emailOrPhone;
                const params = new URLSearchParams({
                    userType: 'indian',
                    phone: mobileNumber,
                    mode: 'forgot-password',
                });
                router.push(`/auth/verify-otp?${params.toString()}`);
            } else {
                console.log("Invalid input");
            }
        }
    })

    return (
        <CommonRightSection>
            <div className="flex flex-col gap-12 max-w-[358px]">
                <p className="text-[22px] font-medium text-label-dark">Password Recovery</p>
                <form className="flex flex-col gap-8">
                    <div className="flex flex-col gap-1">
                        <label className="text-label-dark font-medium text-sm">Login ID</label>
                        <CustomInput
                            type="email"
                            placeholder="Enter your login ID"
                            value={formik.values.loginID}
                            onChange={formik.handleChange}
                            name="loginID"
                            onBlur={formik.handleBlur}
                            error={formik.touched.loginID && !!formik.errors.loginID}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-label-dark font-medium text-sm">Enter mobile number or registered email address to recieve OTP</label>
                            <CustomInput
                                type="text"
                                placeholder="Enter your registered email or mobile number"
                                value={formik.values.emailOrPhone}
                                onChange={formik.handleChange}
                                name="emailOrPhone"
                                onBlur={formik.handleBlur}
                                error={formik.touched.emailOrPhone && !!formik.errors.emailOrPhone}
                                required
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-text-hint text-sm">Remember Password? </p>
                            <Link href="/auth/login" className=" text-[#613AF5] hover:underline font-medium">
                                Login Now
                            </Link>
                        </div>
                    </div>
                </form>
                <CustomButton
                    value="Verify & Continue"
                    variant="primary"
                    style="py-3 px-8"
                    handleClick={formik.handleSubmit}
                    disabled={!(formik.isValid && formik.dirty)}
                />
            </div>
        </CommonRightSection>
    )
}