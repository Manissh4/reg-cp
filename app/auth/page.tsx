import { CommonRightSection } from "@/components/common-right-section";
import { CustomButton } from "@/components/ui/CustomButton";
import Link from "next/link";
import { MdOutlinePhone } from "react-icons/md";

export default function CPGRAMSAuth() {
    return (
        <CommonRightSection maxWidth="sm" className="space-y-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <img src="/indian-government-emblem.png" alt="Government Emblem" className="w-12 h-12" />
              </div>
            </div>
            <div className="text-xs text-gray-600 leading-tight space-y-1">
              <div className="text-gray-500">प्रशासनिक सुधार और लोक शिकायत विभाग</div>
              <div className="font-semibold text-[#4f46e5] text-sm">DEPARTMENT OF</div>
              <div className="font-semibold text-[#4f46e5] text-sm">ADMINISTRATIVE REFORMS</div>
              <div className="font-semibold text-[#4f46e5] text-sm">& PUBLIC GRIEVANCES</div>
            </div>
          </div>

          <Link href={"/auth/register"}>
            <CustomButton
              value="Register with Phone No."
              style="text-sm py-2.5 px-8"
              leftIcon={<MdOutlinePhone size={20} />}
            />
          </Link>

          {/* SSO Text */}
          <div className="text-center text-gray-500 text-sm">or continue with Single sign-on (SSO)</div>

          <div className="flex justify-center">
            <button className="bg-white rounded-lg px-8 py-3 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <img src="/generic-national-emblem.png" alt="Jan Parichay" className="w-4 h-4" />
                </div>
                <span className="text-[#1877f2] font-semibold text-sm">जन</span>
                <span className="text-[#7c3aed] font-semibold text-sm">Parichay</span>
              </div>
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600">
            Already have an account? <button className="text-[#1877f2] hover:underline font-medium">Log In</button>
          </div>
        </CommonRightSection>
    )
}