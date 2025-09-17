import { ModuleHeader } from "@/components/ModuleHeader"
import { Sidebar } from "@/components/Sidebar"

export default function ModulesLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex-1 flex w-full">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <ModuleHeader />
                {children}
            </div>
        </div>
    )
}