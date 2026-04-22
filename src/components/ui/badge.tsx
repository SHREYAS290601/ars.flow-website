import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = PropsWithChildren<{
  className?: string;
}>;

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-panelBorder bg-panel/95 px-3 py-1 text-xs font-medium text-text dark:text-[#d7e2ee]",
        className
      )}
    >
      {children}
    </span>
  );
}
