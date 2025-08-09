import * as React from "react";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("shrink-0 text-primary", className)}
      viewBox="0 0 24 24"
      role="img"
      aria-label="TreasuryGuard AI logo"
    >
      <defs>
        <linearGradient id="tg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--primary) / 0.8)" />
        </linearGradient>
      </defs>
      {/* Shield shape */}
      <path
        d="M12 2l7 3v5c0 5-3.5 9-7 12-3.5-3-7-7-7-12V5l7-3z"
        fill="url(#tg-gradient)"
      />
      {/* Simple AI node network */}
      <circle cx="12" cy="9" r="2" fill="hsl(var(--primary-foreground))" />
      <circle cx="8.5" cy="12.5" r="1" fill="hsl(var(--primary-foreground))" />
      <circle cx="15.5" cy="12.5" r="1" fill="hsl(var(--primary-foreground))" />
      <path
        d="M12 11v3M12 11L9 13M12 11l3 2"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
