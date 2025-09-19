import { CommonRightSection } from "@/components/common-right-section";
import { CustomButton } from "@/components/ui/CustomButton";
import Image from "next/image";
import Link from "next/link";
import { MdOutlinePhone, MdOutlineEmail } from "react-icons/md";

export default function CPGRAMSLOGIN() {
  return (
    <CommonRightSection maxWidth="sm">
      <div className="flex flex-col items-center justify-center gap-12">
        <div className="flex justify-center">
          <Image src="/DARPG-logo.png" alt="DARPG" width={193} height={64} />
        </div>
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col gap-8 items-center justify-center">
            <Link href='/auth/login/phone'>
              <CustomButton
                value="Log In with Phone No."
                leftIcon={<MdOutlinePhone size={18} />}
                style="py-2.5 px-8"
              />
            </Link>
            <Link href='/auth/login/email'>
              <CustomButton
                value="Log In with Email ID"
                leftIcon={<MdOutlineEmail size={18} />}
                variant="secondary"
                style="py-2.5 px-9.5"
              />
            </Link>
          </div>
          <div className="flex items-center justify-center gap-3 text-text-hint text-base font-normal">
            <div className="min-w-10 w-10 border border-[#DDDDDD]"></div>
            <p>or continue with social media</p>
            <div className="min-w-10 w-10 border border-[#DDDDDD]"></div>
          </div>
          <div className="flex items-center justify-center border border-[#DDDDDD] rounded-2xl py-4 px-[18px]">
            <Image src="/JanParichay-logo.png" alt="JanParichay" width={166} height={32} />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-text-hint text-sm">Don&apos;t have an account? </p>
            <Link href="/auth" className=" text-[#613AF5] hover:underline font-medium">
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </CommonRightSection>
  )
}