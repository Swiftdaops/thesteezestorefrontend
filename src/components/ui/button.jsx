import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";           // adjust alias if needed
import { buttonVariants } from "../ui/buttonVariants"; // adjust path if needed

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export default Button;
export { Button }; // (exporting components is fine)
