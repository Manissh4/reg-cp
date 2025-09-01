import { cn } from "@/lib/utils"
import React from "react"

interface CustomButtonProps {
  style?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  value: string
  disabled?: boolean
  variant?: 'primary' | 'secondary'
  handleClick?: () => void
  type?: "button" | "submit"
}

const CustomButton: React.FC<CustomButtonProps> = ({
  style,
  leftIcon,
  rightIcon,
  value,
  disabled,
  variant = 'primary',
  handleClick,
  type = "button"
}) => {
  const styles = {
    base: 'flex items-center justify-center gap-2 rounded-[8px] font-medium cursor-pointer',
    primary: 'bg-button-primary text-white',
    secondary: 'bg-transparent text-button-primary border border-button-primary',
    disabledStyle: 'opacity-50 cursor-not-allowed',
  }

  return (
    <button
      className={cn(styles.base, style, disabled && styles.disabledStyle, styles[variant])}
      onClick={handleClick}
      type={type}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {value}
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  )
}

export { CustomButton }