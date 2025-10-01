import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  // base
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        // Use CSS vars if available; provide Tailwind fallbacks for both modes
        default: "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:brightness-95 dark:hover:brightness-110 bg-stone-900 text-white dark:bg-sky-500 dark:text-white",
        destructive:
          "bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] hover:brightness-95 focus-visible:ring-[hsl(var(--destructive))]/20 dark:focus-visible:ring-[hsl(var(--destructive))]/40 bg-red-600 text-white",
        outline:
          "border shadow-xs bg-[hsl(var(--background))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] bg-white text-black dark:bg-neutral-900 dark:text-white border-stone-300 dark:border-stone-600 hover:bg-stone-100 dark:hover:bg-neutral-800",
        secondary:
          "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:brightness-95 bg-stone-100 text-stone-900 dark:bg-neutral-800 dark:text-white",
        ghost:
          "hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] hover:bg-stone-100 dark:hover:bg-neutral-800",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
