import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-medium rounded-full select-none",
  {
    variants: {
      variant: {
        default:  "bg-stone-100 text-stone-700",
        brand:    "bg-brand-100 text-brand-700",
        success:  "bg-emerald-50 text-emerald-700",
        warning:  "bg-amber-50 text-amber-700",
        danger:   "bg-red-50 text-red-700",
        dark:     "bg-stone-800 text-stone-100",
        outline:  "border border-stone-200 text-stone-600 bg-transparent",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-xs px-2.5 py-1",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}
