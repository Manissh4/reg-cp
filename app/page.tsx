import { CommonHeader } from "@/components/common-header"
import { DecorativeLeftSection } from "@/components/decorative-left-section"
import { CommonRightSection } from "@/components/common-right-section"

export default function CPGRAMSLogin() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <CommonHeader />

      <div className="flex flex-1">
        <DecorativeLeftSection />

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

          <a
            href="/register"
            className="w-full bg-[#7c3aed] hover:bg-[#8b5cf6] text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-3 shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Register with Phone No.
          </a>

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
      </div>
    </div>
  )
}
