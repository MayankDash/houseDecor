import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-stone-900 text-white hover:bg-stone-700 focus-visible:ring-stone-900",
        secondary:
          "bg-stone-100 text-stone-800 hover:bg-stone-200 focus-visible:ring-stone-400",
        outline:
          "border border-stone-300 bg-transparent text-stone-800 hover:bg-stone-50 hover:border-stone-400 focus-visible:ring-stone-400",
        ghost:
          "bg-transparent text-stone-700 hover:bg-stone-100 focus-visible:ring-stone-400",
        brand:
          "bg-brand-500 text-white hover:bg-brand-600 focus-visible:ring-brand-500",
        danger:
          "bg-error text-white hover:opacity-90 focus-visible:ring-red-500",
        link:
          "bg-transparent text-stone-700 underline-offset-4 hover:underline hover:text-stone-900 p-0 h-auto",
      },
      size: {
        xs:  "h-7  px-2.5 text-xs  rounded-md",
        sm:  "h-9  px-3.5 text-sm  rounded-lg",
        md:  "h-10 px-5   text-sm  rounded-lg",
        lg:  "h-12 px-7   text-base rounded-xl",
        xl:  "h-14 px-9   text-base rounded-xl",
        icon: "h-10 w-10 rounded-lg",
        "icon-sm": "h-8 w-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor" strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  )
);

Button.displayName = "Button";

export { Button, buttonVariants };
