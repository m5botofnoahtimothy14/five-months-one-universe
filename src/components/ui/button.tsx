import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border-2 border-border bg-paper text-foreground shadow-sm hover:bg-blush",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-blush hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        sticker:
          "font-display tracking-wide bg-primary text-primary-foreground border-2 border-ink/80 shadow-[var(--shadow-pop)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none",
        lavender:
          "font-display tracking-wide bg-lavender text-secondary-foreground border-2 border-ink/70 shadow-[var(--shadow-sticker)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none",
        peach:
          "font-display tracking-wide bg-peach text-accent-foreground border-2 border-ink/70 shadow-[var(--shadow-sticker)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none",
        butter:
          "font-display tracking-wide bg-butter text-foreground border-2 border-ink/70 shadow-[var(--shadow-sticker)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none",
        mint:
          "font-display tracking-wide bg-mint text-foreground border-2 border-ink/70 shadow-[var(--shadow-sticker)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none",
        paper:
          "font-display tracking-wide bg-paper text-foreground border-2 border-ink/70 shadow-[var(--shadow-sticker)] hover:-translate-y-0.5 hover:bg-blush active:translate-y-0.5 active:shadow-none",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-14 px-8 text-lg",
        xl: "h-16 px-8 text-xl",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
