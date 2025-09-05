"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Eye, EyeOff, Search, Calendar, Clock, Upload, Mail, Phone, Lock } from "lucide-react"
import { MdOutlineUploadFile } from "react-icons/md";

export interface SelectOption {
  value: string
  label: string
}

export interface CustomInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  // Input variants
  variant?: "default" | "filled" | "underlined"
  size?: "sm" | "md" | "lg"

  // States
  error?: boolean
  success?: boolean
  loading?: boolean

  // Content
  label?: string
  description?: string
  helperText?: string

  // Icons and addons
  prefixIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
  prefix?: string
  suffix?: string

  // Special types
  otpLength?: number
  onOTPComplete?: (value: string) => void

  // Select specific
  options?: SelectOption[]
  onSelectChange?: (value: string) => void

  // Textarea specific
  rows?: number
  maxLength?: number
  showCounter?: boolean

  // File input specific
  accept?: string
  multiple?: boolean

  // Container props
  containerClassName?: string
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      className,
      containerClassName,
      type = "text",
      variant = "default",
      size = "md",
      error,
      success,
      loading,
      label,
      description,
      helperText,
      prefixIcon,
      suffixIcon,
      prefix,
      suffix,
      otpLength = 6,
      onOTPComplete,
      options,
      onSelectChange,
      rows = 3,
      maxLength,
      showCounter,
      accept,
      multiple,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [currentLength, setCurrentLength] = React.useState(0)

    const sizeClasses = {
      sm: "h-8 px-2 text-sm",
      md: "h-10 px-3 text-sm",
      lg: "h-12 px-4 text-base",
    }

    const variantClasses = {
      default: "border border-input bg-background border-[#C6C6C6]",
      filled: "border-0 bg-muted",
      underlined: "border-0 border-b-2 border-input bg-transparent rounded-none",
    }

    const getDefaultIcon = (inputType: string) => {
      switch (inputType) {
        case "email":
          return <Mail className="h-4 w-4 text-muted-foreground" />
        case "password":
          return <Lock className="h-4 w-4 text-muted-foreground" />
        case "tel":
          return <Phone className="h-4 w-4 text-muted-foreground" />
        case "search":
          return <Search className="h-4 w-4 text-muted-foreground" />
        case "date":
          return <Calendar className="h-4 w-4 text-muted-foreground" />
        case "time":
          return <Clock className="h-4 w-4 text-muted-foreground" />
        case "file":
          return <Upload className="h-4 w-4 text-muted-foreground" />
        default:
          return null
      }
    }

    const baseInputClasses = cn(
      sizeClasses[size],
      variantClasses[variant],
      error && "border-[#B7131A] focus:border-red-500 focus:ring-red-200",
      success && "border-green-500 focus:border-green-500 focus:ring-green-200",
      loading && "opacity-50 cursor-not-allowed",
      className,
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (maxLength) {
        setCurrentLength(e.target.value.length)
      }
      props.onChange?.(e as any)
    }

    if (type === "otp") {
      return (
        <div className={cn(containerClassName)}>
          {label && <label className="text-sm font-medium text-foreground">{label}</label>}
          {description && <p className="text-xs text-muted-foreground">{description}</p>}

          <InputOTP
            maxLength={otpLength}
            value={props.value as string}
            onChange={(value) => {
              props.onChange?.({ target: { value } } as any)
              if (value.length === otpLength) {
                onOTPComplete?.(value)
              }
            }}
            className={cn("gap-2", className)}
          >
            <InputOTPGroup className="gap-2">
              {Array.from({ length: otpLength }).map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className={cn(
                    "w-[60px] h-[48px] text-center border rounded-[8px] py-2.5 px-3",
                    "border-[#C6C6C6] focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
                    error && "border-red-500 focus:border-red-500 focus:ring-red-200",
                    success && "border-green-500 focus:border-green-500 focus:ring-green-200",
                  )}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {helperText && (
            <p className={cn("text-xs", error ? "text-red-500" : "text-muted-foreground")}>{helperText}</p>
          )}
        </div>
      )
    }

    if (type === "select" && options) {
      return (
        <div className={cn(containerClassName)}>
          {label && <label className="text-sm font-medium text-foreground">{label}</label>}
          {description && <p className="text-xs text-muted-foreground">{description}</p>}

          <Select value={props.value as string} onValueChange={onSelectChange}>
            <SelectTrigger className={baseInputClasses}>
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} className="cursor-pointer">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {helperText && (
            <p className={cn("text-xs", error ? "text-red-500" : "text-muted-foreground")}>{helperText}</p>
          )}
        </div>
      )
    }

    if (type === "textarea") {
      return (
        <div className={cn(containerClassName)}>
          {label && <label className="text-sm font-medium text-foreground">{label}</label>}
          {description && <p className="text-xs text-muted-foreground">{description}</p>}

          <div className="relative">
            <Textarea
              rows={rows}
              maxLength={maxLength}
              className={cn(baseInputClasses, "resize-none")}
              onChange={handleInputChange}
              disabled={loading}
              {...(props as any)}
              ref={ref as any}
            />
            {showCounter && maxLength && (
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                {currentLength}/{maxLength}
              </div>
            )}
          </div>

          {helperText && (
            <p className={cn("text-xs", error ? "text-red-500" : "text-muted-foreground")}>{helperText}</p>
          )}
        </div>
      )
    }

    if (type === "file") {
      return (
        <div className={cn(containerClassName)}>
          {label && <label className="text-sm font-medium text-foreground">{label}</label>}
          {description && <p className="text-xs text-muted-foreground">{description}</p>}

          <div className="flex flex-col justify-center items-center gap-2 border border-[#C6C6C6] rounded-[8px] min-w-[700px] min-h-[172px]">
            <MdOutlineUploadFile className="min-w-12 min-h-12 mb-2 text-button-primary" />
            <p className="text-[#727272] text-sm font-normal">Please Drop or upload your files here</p>
            <input
              type="file"
              className={cn(baseInputClasses, "cursor-pointer hidden")}
              accept={accept}
              multiple={multiple}
              onChange={handleInputChange}
              disabled={loading}
              ref={ref}
              {...props}
            />
          </div>
        </div>
      )
    }

    const actualPrefixIcon = prefixIcon || getDefaultIcon(type)
    const actualSuffixIcon =
      type === "password" ? (
        showPassword ? (
          <EyeOff className="h-4 w-4 cursor-pointer" onClick={() => setShowPassword(false)} />
        ) : (
          <Eye className="h-4 w-4 cursor-pointer" onClick={() => setShowPassword(true)} />
        )
      ) : (
        suffixIcon
      )

    return (
      <div className={cn(containerClassName)}>
        {label && <label className="text-sm font-medium text-foreground">{label}</label>}
        {description && <p className="text-xs text-muted-foreground">{description}</p>}

        <div className="relative">
          {/* {(actualPrefixIcon || prefix) && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
              {actualPrefixIcon}
              {prefix && <span className="text-sm text-muted-foreground ml-1">{prefix}</span>}
            </div>
          )} */}

          <Input
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            className={cn(
              baseInputClasses,
              (actualSuffixIcon || suffix) && "pr-10",
            )}
            maxLength={maxLength}
            accept={accept}
            multiple={multiple}
            onChange={handleInputChange}
            disabled={loading}
            ref={ref}
            {...props}
          />

          {(actualSuffixIcon || suffix) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
              {suffix && <span className="text-sm text-muted-foreground mr-1">{suffix}</span>}
              {actualSuffixIcon}
            </div>
          )}

          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          {helperText && (
            <p className={cn("text-xs", error ? "text-red-500" : "text-muted-foreground")}>{helperText}</p>
          )}
          {showCounter && maxLength && (
            <p className="text-xs text-muted-foreground ml-auto">
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  },
)
CustomInput.displayName = "CustomInput"

export { CustomInput }