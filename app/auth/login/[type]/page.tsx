'use client'

import { CommonRightSection } from '@/components/common-right-section'
import { CustomInput } from '@/components/ui/custom-input'
import { countryCodes } from '@/utils/CountryCodes'
import { CustomButton } from '@/components/ui/CustomButton'
import Link from 'next/link'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { MdErrorOutline } from 'react-icons/md'
import SuccessModal from '@/components/SucessModal'

const LoginPage = () => {

    const [loginType, setLoginType] = useState<'otp' | 'password' | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const router = useRouter();
    const type = useParams().type;

    const getValidationSchema = (type: string, loginType: 'otp' | 'password' | null, showPassword: boolean) => {
        if (showPassword) {
            return Yup.object({
                password: Yup.string().required("Password is required"),
            });
        }
        if (type === 'email') {
            return Yup.object({
                email: Yup.string().email("Invalid email address").required("Email is required"),
            });
        } else {
            return Yup.object({
                countryCode: Yup.string().required("Country code is required"),
                mobileNumber: Yup.string()
                    .required("Mobile number is required")
                    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits long"),
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            countryCode: '+91',
            mobileNumber: '',
            email: "",
            password: ''
        },
        validationSchema: getValidationSchema(type as string, loginType, showPassword),
        enableReinitialize: true,
        onSubmit: (values) => {
            if (showPassword) {
                setSuccessModalOpen(true);
                return;
            }
            const params = new URLSearchParams({
                type: type === 'email' ? 'email' : 'phone',
                value: type === 'email' ? values.email : `${values.mobileNumber}`
            })
            router.push(`/auth/login/verify-otp?${params.toString()}`);
        }
    })

    return (
        <>
            <CommonRightSection maxWidth="sm">
                <div className="flex flex-col items-center justify-center gap-12">
                    <p className='text-[22px] font-medium text-label-dark w-full'>{`Please enter your ${type === 'email' ? 'Email Address' : 'Phone Number'}`}</p>
                    <form className='flex flex-col gap-6 w-full'>
                        {type === 'email' ?
                            <div className="flex flex-col gap-1">
                                <label className="text-label-dark font-medium text-sm">
                                    Email Address
                                </label>
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
                            </div> :
                            <div className="flex flex-col gap-1">
                                <label className="text-label-dark font-medium text-sm">
                                    Mobile Number
                                </label>
                                <div className='min-w-full flex items-center gap-2'>
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
                            </div>
                        }
                        {showPassword && (
                            <div className="flex flex-col gap-1">
                                <label className="text-label-dark font-medium text-sm">Password</label>
                                <CustomInput
                                    type={"password"}
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    placeholder="Create password"
                                    className="w-full px-4 py-3 border rounded-lg text-label-dark outline-none"
                                    required
                                />
                            </div>
                        )}
                    </form>
                    <div className='flex flex-col gap-4 w-full'>
                        {!showPassword ? (
                            <>
                                <CustomButton
                                    value='Login using OTP'
                                    variant='primary'
                                    style='py-3 px-8'
                                    handleClick={() => {
                                        setLoginType('otp')
                                        formik.handleSubmit()
                                    }}
                                    disabled={!(formik.isValid && formik.dirty)}
                                />
                                <CustomButton
                                    value='Login using Password'
                                    variant='secondary'
                                    style='py-3 px-8'
                                    handleClick={() => {
                                        setLoginType('password')
                                        setShowPassword(true)
                                    }}
                                />
                            </>
                        ) : (
                            <CustomButton
                                value='Login'
                                variant='primary'
                                style='py-3 px-8'
                                handleClick={() => {
                                    formik.handleSubmit()
                                }}
                                disabled={!(formik.values.password.length > 0 && formik.isValid)}
                            />
                        )}
                        <div className="flex items-center gap-2">
                            <p className="text-text-hint text-sm">Don't have an account?</p>
                            <Link href="/auth" className=" text-[#613AF5] hover:underline font-medium">
                                Register Now
                            </Link>
                        </div>
                    </div>
                </div>
            </CommonRightSection>
            {successModalOpen && (
                <SuccessModal
                    handleModalClose={() => {
                        router.push('/auth');
                        setSuccessModalOpen(false);
                    }}
                    title="Login Successfully"
                    message="Login successful! You can now access your dashboard to submit grievances, track progress, and stay updated on resolutions from the concerned authorities"
                    buttonText="Done"
                />
            )}
        </>
    )
}

export default LoginPage