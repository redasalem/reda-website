import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
// Lightweight field composition for the existing shadcn Input and Textarea controls.
export function FieldGroup({ className, ...props }: ComponentProps<"div">) { return <div className={cn("flex flex-col gap-5", className)} {...props} />; }
export function Field({ className, ...props }: ComponentProps<"div">) { return <div className={cn("flex flex-col gap-2", className)} {...props} />; }
export function FieldLabel({ className, ...props }: ComponentProps<"label">) { return <label className={cn("text-sm font-medium", className)} {...props} />; }
