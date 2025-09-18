"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUserLarge, FaRegBell } from "react-icons/fa6";
import { PiSignOut } from "react-icons/pi";
import { useHeaderContext } from "../components/Context/useHeaderContext";

export function ModuleHeader() {
  const { header } = useHeaderContext();
  const router = useRouter()

  const title = header.title ?? "";
  const subtitle = header.subtitle ?? "";
  const extraClass = header.className ?? "";

  return (
    <div className={`w-full bg-white flex items-center justify-between p-6 max-h-16 ${extraClass}`}>
      <div className="flex items-center gap-4">
        {header.leftIcon ?? ''}
        <div>
          <p className="text-label-dark font-semibold text-xl">{title}</p>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#1E3C72_0%,#2A5298_100%)]">
          <FaRegBell className="w-6 h-6 cursor-pointer inline text-blue-900" />
        </span>

        <Link href={'/'}><PiSignOut className="w-6 h-6 text-error cursor-pointer" /></Link>

        <Link href={'/user'}>
          <div className="w-12 h-12 rounded-full bg-[#F4F3F9] flex items-center justify-center cursor-pointer">
            <p className="font-semibold text-[26.67px] bg-clip-text text-transparent bg-[linear-gradient(90deg,rgba(30,60,114,0.8)_0%,rgba(42,82,152,0.8)_100%)]">
              P
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
