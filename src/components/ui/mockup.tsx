import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface MockupProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: "browser" | "phone" | "desktop"
}

export function Mockup({ 
  children, 
  className, 
  variant = "browser",
  ...props 
}: MockupProps) {
  const variants = {
    browser: "mockup-browser border-base-300 border bg-base-300",
    phone: "mockup-phone border-primary",
    desktop: "mockup-window border-base-300 border bg-base-300"
  }

  return (
    <div 
      className={cn(
        "mockup",
        variants[variant],
        "shadow-2xl",
        className
      )} 
      {...props}
    >
      {variant === "browser" && (
        <div className="mockup-browser-toolbar">
          <div className="input border-base-300 border">https://eegnite.com</div>
        </div>
      )}
      <div className={cn(
        "flex justify-center px-4 py-16",
        variant === "phone" && "px-2 py-8"
      )}>
        {children}
      </div>
    </div>
  )
}