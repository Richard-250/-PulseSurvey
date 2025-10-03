import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AdSlotProps {
  id: string;
  size?: string;
  className?: string;
  adKey?: string; // pass Adsterra key here
}

export function AdSlot({ id, size = "300x750", className, adKey }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [w, h] = size.split("x").map((n) => parseInt(n, 10));

  useEffect(() => {
    if (!adKey || !containerRef.current) return;

    // Create the atOptions config globally
    (window as any).atOptions = {
      key: adKey,
      format: "iframe",
      height: h,
      width: w,
      params: {},
    };

    // Inject the Adsterra script dynamically
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `//pl27775921.revenuecpmgate.com/${adKey}/invoke.js`;
    script.async = true;

    // Clear container first to avoid duplicate ads
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [adKey, w, h]);

  return (
    <div
      id={id}
      className={cn(
        "relative flex items-center justify-center border-muted-foreground/30 text-muted-foreground/70",
        "rounded-md overflow-hidden",
        className
      )}
      style={{ width: w, height: h }}
    >
      <div ref={containerRef}></div>
    </div>
  );
}
