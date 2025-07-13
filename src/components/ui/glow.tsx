import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface GlowProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  color?: "primary" | "secondary" | "accent" | "blue" | "purple"
  intensity?: "sm" | "md" | "lg" | "xl"
}

export function Glow({ 
  children, 
  className, 
  color = "primary",
  intensity = "md",
  ...props 
}: GlowProps) {
  const glowStyles = {
    primary: {
      sm: "shadow-[0_0_15px_hsl(var(--primary)/0.3)]",
      md: "shadow-[0_0_30px_hsl(var(--primary)/0.4)]",
      lg: "shadow-[0_0_50px_hsl(var(--primary)/0.5)]",
      xl: "shadow-[0_0_80px_hsl(var(--primary)/0.6)]"
    },
    secondary: {
      sm: "shadow-[0_0_15px_hsl(var(--secondary)/0.3)]",
      md: "shadow-[0_0_30px_hsl(var(--secondary)/0.4)]",
      lg: "shadow-[0_0_50px_hsl(var(--secondary)/0.5)]",
      xl: "shadow-[0_0_80px_hsl(var(--secondary)/0.6)]"
    },
    accent: {
      sm: "shadow-[0_0_15px_hsl(var(--accent)/0.3)]",
      md: "shadow-[0_0_30px_hsl(var(--accent)/0.4)]",
      lg: "shadow-[0_0_50px_hsl(var(--accent)/0.5)]",
      xl: "shadow-[0_0_80px_hsl(var(--accent)/0.6)]"
    },
    blue: {
      sm: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
      md: "shadow-[0_0_30px_rgba(59,130,246,0.4)]",
      lg: "shadow-[0_0_50px_rgba(59,130,246,0.5)]",
      xl: "shadow-[0_0_80px_rgba(59,130,246,0.6)]"
    },
    purple: {
      sm: "shadow-[0_0_15px_rgba(147,51,234,0.3)]",
      md: "shadow-[0_0_30px_rgba(147,51,234,0.4)]",
      lg: "shadow-[0_0_50px_rgba(147,51,234,0.5)]",
      xl: "shadow-[0_0_80px_rgba(147,51,234,0.6)]"
    }
  }

  return (
    <div 
      className={cn(
        "transition-all duration-500",
        glowStyles[color][intensity],
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
}