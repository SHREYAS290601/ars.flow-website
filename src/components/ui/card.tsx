import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export function Card({ children, className }: CardProps) {
  return <article className={cn("rounded-3xl border border-panelBorder bg-panel/80 p-6 backdrop-blur", className)}>{children}</article>;
}
