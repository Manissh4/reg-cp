import type { ReactNode } from "react"

interface CommonRightSectionProps {
  children: ReactNode
  maxWidth?: "sm" | "md" | "lg"
  className?: string
}

export function CommonRightSection({ children, maxWidth = "md", className = "" }: CommonRightSectionProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  }

  return (
    <div
      className="flex-1 bg-[#f8fafc] flex flex-col items-center justify-center px-16 py-12 relative rounded-r-3xl"
      style={{ clipPath: "ellipse(120% 100% at 100% 50%)" }}
    >
      <div className={`w-full ${maxWidthClasses[maxWidth]} space-y-6 ${className}`}>{children}</div>
    </div>
  )
}
