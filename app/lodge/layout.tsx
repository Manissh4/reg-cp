import { Sidebar } from "@/components/Sidebar";

export default function LodgeGreivanceLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex-1 flex w-full">
            <Sidebar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}