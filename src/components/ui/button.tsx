import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex items-center justify-center",
  {
    variants: {
      variant: {
        empty: "bg-transparent",
        default: "bg-blue-600 text-white hover:bg-blue-700",
        noBackground: "transition-all duration-250",
        destructive: "transition-all duration-250 bg-red-500/15 text-white",
        secondary: "bg-quaternaryGrey text-primaryGrey",
        ghost: "hover:bg-blue-600 hover:text-white",
        link: "text-blue-600 underline-offset-4 hover:underline",
      },
      hoverEffect: {
        grey: "border border-transparent hover:bg-primaryGrey hover:border-secondaryGrey",
        red: "hover:bg-red-500/30",
        secondary: "hover:bg-primaryGrey hover:text-white",
        white: "hover:bg-white hover:text-primaryGrey",
      },
      size: {
        default: "rounded-small",
        tiny: "h-8 w-8 rounded-tiny",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, hoverEffect, children, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, hoverEffect, className }))} ref={ref} {...props} >
      {children}
    </button>;
  },
);
Button.displayName = "Button";

export { Button };
