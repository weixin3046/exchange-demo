"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

const Slider = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      type="range"
      className={cn("bg-secondary accent-primary h-2 w-full cursor-pointer appearance-none rounded-lg", className)}
      ref={ref}
      {...props}
    />
  )
);
Slider.displayName = "Slider";

export { Slider };
