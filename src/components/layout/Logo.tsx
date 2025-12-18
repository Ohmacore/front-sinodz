import { ShipIcon } from "../icons/ShipIcon";
import { cn } from "@/lib/utils";

export function Logo({ size = "default", className }: { size?: "small" | "default" | "large", className?: string }) {
    const sizes = {
        small: { text: "text-lg", subtext: "text-[10px]", icon: "h-5 w-5" },
        default: { text: "text-2xl", subtext: "text-xs", icon: "h-7 w-7" },
        large: { text: "text-4xl", subtext: "text-sm", icon: "h-10 w-10" }
    };

    const s = sizes[size];

    return (
        <div className={cn("flex items-center gap-3", className)}>
            <div className="relative">
                <ShipIcon className={`${s.icon} text-primary`} />
            </div>
            <div className="flex flex-col">
                <span className={`${s.text} font-bold text-secondary leading-none tracking-tight`}>
                    SinoDz
                </span>
                <span className={`${s.subtext} text-muted-foreground uppercase tracking-wider`}>
                    Import/Export
                </span>
            </div>
        </div>
    );
}
