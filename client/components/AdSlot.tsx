import { cn } from "@/lib/utils";

export function AdSlot({ id, size = "300x250", className }: { id: string; size?: string; className?: string }) {
  const [w, h] = size.split("x").map((n) => parseInt(n, 10));
  return (
    <div
      id={id}
      aria-hidden
      className={cn(
        "relative flex items-center justify-center border border-dashed border-muted-foreground/30 bg-muted/20 text-muted-foreground/70",
        "rounded-md overflow-hidden",
        className,
      )}
      style={{ width: w, height: h }}
    >
      <span className="text-[10px]">Ad {size}</span>
    </div>
  );
}
