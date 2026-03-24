import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "accent";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-white",
      accent: "bg-accent",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "border-4 border-black box-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
          "p-6 transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]",
          variants[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

export { Card };
