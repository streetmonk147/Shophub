import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "link" | "destructive";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary": variant === "primary",
            "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary": variant === "secondary",
            "bg-transparent hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
            "text-primary underline-offset-4 hover:underline": variant === "link",
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600": variant === "destructive",
          },
          {
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4 text-base": size === "md",
            "h-12 px-6 text-lg": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
