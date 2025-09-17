'use client'

import { FaUserLarge, FaRegBell } from "react-icons/fa6";
import { PiSignOut } from "react-icons/pi";

export function ModuleHeader() {
    return (
        <div className="w-full bg-white flex items-center justify-between p-6 max-h-16">
            <div className="flex items-center gap-4">
                <FaUserLarge className="w-6 h-6 text-[#FF7501]" />
                <p className="text-label-dark font-semibold text-xl">User Profile</p>
            </div>
            <div className="flex items-center gap-6">
                <FaRegBell className="w-6 h-6 cursor-pointer" style={{ color: "linear-gradient(90deg, #1E3C72 0%, #1E3C72 1%, #2A5298 100%)" }} />
                <PiSignOut className="w-6 h-6 text-error cursor-pointer" />
                <div className="w-12 h-12 rounded-full bg-[#F4F3F9] flex items-center justify-center cursor-pointer">
                    <p
                        className="font-semibold text-[26.67px]"
                        style={{ color: "linear-gradient(90deg, rgba(30, 60, 114, 0.8) 0%, rgba(30, 60, 114, 0.8) 1%, rgba(42, 82, 152, 0.8) 100%)" }}
                    >P</p>
                </div>
            </div>
        </div>
    )
}