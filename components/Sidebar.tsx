"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import "@/styles/globals.css";

const navItems = [
  {
    label: "Grievance Dashboard",
    icon: <Image src={'/home.png'} alt="home" width={24} height={24} />,
    href: "/grievance-dashboard",
  },
  {
    label: "Lodge Grievance",
    icon: <Image src={'/card-add.png'} alt="grievance" width={24} height={24} />,
    href: "/lodge",
  },
  {
    label: "Track Grievance",
    icon: <Image src={'/card-add.png'} alt="track" width={24} height={24} />,
    href: "/track",
  },
  {
    label: "Master Data View",
    icon: <Image src={'/card-add.png'} alt="master" width={24} height={24} />,
    children: [
      { label: "Hierarchy Mapping", href: "/master-data/hierarchy" },
      { label: "Department View", href: "/master-data/department" },
      { label: "Employee View", href: "/master-data/employee" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const masterItem = navItems.find(i => i.label === "Master Data View");
    if (masterItem?.children?.some(child => child.href === pathname)) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [pathname]);

  return (
    <div className="min-h-full max-w-60 min-w-60 flex flex-col night-sky">
      {/* Logo */}
      <div className="relative flex items-center justify-center p-8">
        <div className="bg-white rounded-[12px] py-2 px-3 flex items-center justify-center">
          <Image src={'/logo2.png'} alt="CPGRAMS" width={136.8} height={47.86} />
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-4">
        {navItems.map(item => {
          const isActive = pathname === item.href;
          const hasChildren = item.children && item.children.length > 0;
          const isChildActive = hasChildren && item.children.some(c => c.href === pathname);

          return (
            <div key={item.label}>
              {item.href && !hasChildren ? (
                <Link href={item.href}>
                  <div
                    className={`flex items-center gap-2 cursor-pointer transition-all pl-2
                      ${isActive ? "bg-white rounded-tr-[12px] rounded-br-[12px] py-2.5" : ""}`}
                    style={isActive ? { width: "95%" } : {}}
                  >
                    <span className={isActive ? "text-[#091C71]" : "text-white"}>
                      {item.icon}
                    </span>
                    <p
                      className={`text-sm ${
                        isActive ? "text-label-dark font-medium" : "text-white font-light"
                      }`}
                    >
                      {item.label}
                    </p>
                  </div>
                </Link>
              ) : (
                <div
                  className={`flex items-center gap-2 cursor-pointer transition-all pl-2
                    ${isChildActive ? "bg-white rounded-tr-[12px] rounded-br-[12px] py-2.5" : ""}`}
                  style={isChildActive ? { width: "95%" } : {}}
                  onClick={() => hasChildren && setOpen(prev => !prev)}
                >
                  <span className={isChildActive ? "text-[#091C71]" : "text-white"}>{item.icon}</span>
                  <p className={`text-sm ${isChildActive ? "text-label-dark font-medium" : "text-white font-light"}`}>
                    {item.label}
                  </p>
                </div>
              )}

              {/* Render children */}
              {hasChildren && open && (
                <div className="flex flex-col gap-4 border-l border-white mt-4 ml-4 pl-4">
                  {item.children.map(child => {
                    const childActive = pathname === child.href;
                    return (
                      <Link key={child.label} href={child.href}>
                        <p
                          className={`text-sm font-normal cursor-pointer ${
                            childActive
                              ? "text-white"
                              : "text-[#938BB6] hover:text-white"
                          }`}
                        >
                          {child.label}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}