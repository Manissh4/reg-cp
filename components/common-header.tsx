import Image from "next/image";
import { MdOutlineTextIncrease, MdOutlineTextDecrease, MdTextFormat } from "react-icons/md";
import "@/styles/globals.css"

export function CommonHeader() {
  return (
    <header className="bg-[#F4F3F9] px-2 py-2.5">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Image src="/flag.jpg" alt="flag" width={33} height={22} />
          <span className="text-label-dark font-medium text-sm">Government of India</span>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button className="text-label-dark font-medium text-sm cursor-pointer">Skip to Main Content</button>
          <div className="flex items-center justify-center gap-4 border border-l-1 border-r-1 border-t-0 border-b-0 border-[#21212140] px-4">
            <button className="text-base text-label-dark opacity-60 cursor-pointer"><MdOutlineTextDecrease /></button>
            <button className="text-base text-label-dark cursor-pointer"><MdTextFormat /></button>
            <button className="text-base text-label-dark opacity-60 cursor-pointer"><MdOutlineTextIncrease /></button>
          </div>
          <div className="text-sm text-label-dark font-medium cursor-pointer border-none font-roboto">English</div>
        </div>
      </div>
    </header>
  )
}
