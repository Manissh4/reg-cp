import Image from "next/image";
import Link from "next/link";
import '@/styles/globals.css'

const navItems = [
    {
        label: "Grievance Dashboard",
        icon: <Image src={'/home.png'} alt="home" width={24} height={24} />,
        href: "/grievance-dashboard"
    },
    {
        label: "Lodge Grievance",
        icon: <Image src={'/card-add.png'} alt="home" width={24} height={24} />,
        href: "/lodge"
    },
];

export function Sidebar() {

    return(
        <div className="min-h-full max-w-60 min-w-60 flex flex-col night-sky">
            <div className="relative flex items-center justify-center p-8">
                <div className="bg-white rounded-[12px] py-2 px-3 flex items-center justify-center">
                    <Image src={'/logo2.png'} alt="CPGRAMS" width={136.8} height={47.86} />
                </div>
            </div>

            {/* Nav items */}
            <div className="flex flex-col gap-6">
                {navItems.map(item => {
                    const isActive = item.href === '/lodge'
                    return (
                        <Link href={item.href} key={item.label} passHref>
                            <div
                                className={`flex items-center gap-2 cursor-pointer transition-all pl-2
                                    ${isActive ? "bg-white rounded-tr-[12px] rounded-br-[12px] py-2.5" : ""}
                                `}
                                style={isActive ? { width: "95%" } : {}}
                            >
                                <span className={isActive ? "text-[#091C71]" : "text-white"}>
                                    {item.icon}
                                </span>
                                <p className={`text-sm ${isActive ? "text-label-dark font-medium" : "text-white font-light"}`}>
                                    {item.label}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}