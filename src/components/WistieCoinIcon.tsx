import { cn } from "@/lib/utils";

interface WistieCoinIconProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-4 h-4 text-[10px]",
  md: "w-8 h-8 text-base",
  lg: "w-16 h-16 text-3xl",
};

const WistieCoinIcon = ({ size = "md", className }: WistieCoinIconProps) => {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground font-serif shadow-[inset_0_-2px_4px_rgba(0,0,0,0.18),inset_0_2px_3px_rgba(255,255,255,0.25)] ring-1 ring-accent/40 select-none",
        sizeMap[size],
        className
      )}
    >
      W
    </span>
  );
};

export default WistieCoinIcon;
