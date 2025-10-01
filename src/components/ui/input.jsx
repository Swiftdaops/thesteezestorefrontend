import * as React from "react"

import { cn } from "../../lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base md:text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // color system with fallbacks
        "text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] bg-transparent",
        "border-[hsl(var(--input))] focus-visible:border-[hsl(var(--ring))] focus-visible:ring-[hsl(var(--ring))]/50 focus-visible:ring-[3px]",
        // fallbacks if CSS vars are not present
        "bg-white text-stone-900 placeholder:text-stone-500 border-stone-300",
        "dark:bg-neutral-900 dark:text-white dark:placeholder:text-stone-400 dark:border-stone-600",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props} />
  );
}

export { Input }
