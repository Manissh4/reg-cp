'use client'

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import EditUser from "./EditUser";
import PasswordManagement from "./PasswordManagement";
import { useHeaderContext } from "@/components/Context/useHeaderContext";
import { User } from "lucide-react";

const page = () => {

    const [activeTab, setActiveTab] = useState<"user" | "password">('user');
    const { setHeader } = useHeaderContext();

  useEffect(() => {
    setHeader({
      title: "User Profile",
      leftIcon: <User className="w-6 h-6 text-orange-600" />,
      className: "bg-neutral-50 shadow-sm",
    });

    return () => setHeader({});
  }, [setHeader]);

    return (
        <div className="w-full h-full bg-[#F4F3F9] p-6 flex flex-col gap-2">
            <div className="w-full bg-white rounded-2xl px-10 pt-4 flex items-center gap-10">
                <div className="flex flex-col items-center gap-3 cursor-pointer" onClick={() => setActiveTab('user')}>
                    <p>Edit Profile</p>
                    <div
                        className={cn(
                            "bg-[#FF7501] rounded-tl-[12px] rounded-tr-[12px] min-w-28 min-h-1 transition-all",
                            activeTab !== 'user' && "invisible"
                        )}
                    ></div>
                </div>
                <div className="flex flex-col items-center gap-3 cursor-pointer" onClick={() => setActiveTab('password')}>
                    <p>Password Management</p>
                    <div
                        className={cn(
                            "bg-[#FF7501] rounded-tl-[12px] rounded-tr-[12px] min-w-56 min-h-1 transition-all",
                            activeTab !== 'password' && "invisible"
                        )}
                    ></div>
                </div>
            </div>
            {activeTab === 'user' ? <EditUser /> : <PasswordManagement />}
        </div>
    )
}

export default page