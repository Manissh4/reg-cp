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
      className="flex-1 bg-[#FFFFFF] flex flex-col items-center justify-center px-16 py-4 relative rounded-tl-[60px] rounded-bl-[60px]"
      style={{ clipPath: "ellipse(120% 100% at 100% 50%)" }}
    >
      <div className={`w-full ${maxWidthClasses[maxWidth]} space-y-6 ${className}`}>{children}</div>
    </div>
  )
}
