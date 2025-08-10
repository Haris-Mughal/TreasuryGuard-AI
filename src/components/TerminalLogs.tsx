import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type TerminalLogsProps = {
  active?: boolean;
  lines: string[];
  className?: string;
  title?: string;
};

export default function TerminalLogs({ active = false, lines, className = "", title = "Agent Deployment Logs" }: TerminalLogsProps) {
  const [typed, setTyped] = useState<string[]>(() => Array(lines.length).fill(""));

  const currentIndex = useMemo(() => {
    if (!active) return -1;
    for (let i = 0; i < lines.length; i++) {
      if ((typed[i] ?? "").length < lines[i].length) return i;
    }
    return -1;
  }, [active, lines, typed]);

  useEffect(() => {
    if (!active) {
      setTyped(Array(lines.length).fill(""));
      return;
    }

    const timeouts: number[] = [];

    const typeLine = (index: number) => {
      const line = lines[index] ?? "";
      let j = 0;
      const tick = () => {
        setTyped((prev) => {
          const next = [...prev];
          next[index] = line.slice(0, j + 1);
          return next;
        });
        j++;
        if (j < line.length) {
          timeouts.push(window.setTimeout(tick, 20));
        } else if (index + 1 < lines.length) {
          timeouts.push(window.setTimeout(() => typeLine(index + 1), 400));
        }
      };
      tick();
    };

    timeouts.push(window.setTimeout(() => typeLine(0), 200));

    return () => timeouts.forEach((t) => clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, lines.join("|")]);

  return (
    <div className={`glass-panel rounded-lg border p-0 overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 border-b bg-background/60">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--brand-2))]" />
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--brand-1))]" />
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--brand-3))]" />
        </div>
        <span className="text-xs text-muted-foreground">{title}</span>
      </div>
      <div className="px-4 py-4 bg-background/70">
        <div className="space-y-2 font-mono text-sm">
          {lines.map((line, i) => {
            const isActive = i === currentIndex;
            const isDone = typed[i]?.length === line.length && line.length > 0;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start">
                <span className="select-none text-muted-foreground mr-2">$</span>
                <div className="text-[hsl(var(--brand-1))]">
                  <span>{typed[i]}</span>
                  {isActive && (
                    <motion.span
                      className="ml-1 inline-block w-2 h-4 bg-[hsl(var(--brand-1))]"
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                  {isDone && <span className="ml-2 text-xs text-muted-foreground">✔</span>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}