import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const variants = {
      default: "bg-black text-white hover:bg-zinc-800",
      outline: "bg-white border-3 border-black hover:bg-zinc-100",
      accent:
        "bg-accent border-3 border-black hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100",
      ghost: "bg-transparent hover:bg-zinc-100",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm font-bold",
      md: "px-6 py-3 text-base font-extrabold uppercase",
      lg: "px-8 py-4 text-lg font-black uppercase tracking-tight",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap box-border disabled:pointer-events-none disabled:opacity-50",
          "border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
