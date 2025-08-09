import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { useAgent } from "@/contexts/AgentContext";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function Logs() {
  const { logs, refreshLogs } = useAgent();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(async () => {
      await refreshLogs();
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, [refreshLogs]);

  const copy = (t: string) => navigator.clipboard.writeText(t);
  const items = logs;

  return (
    <main className="p-4 md:p-6 space-y-4">
      <Helmet>
        <title>Logs — TreasuryGuard AI</title>
        <meta name="description" content="On-chain audit logs of AI actions and treasury events." />
        <link rel="canonical" href="/logs" />
      </Helmet>

      <div className="flex items-center justify-between gap-2">
        <h1 className="font-display text-2xl">Logs</h1>
        <div className="flex items-center gap-2">
          <Input placeholder="Search transactions…" className="max-w-xs" />
          <Button variant="outline" onClick={() => refreshLogs()}>Refresh</Button>
        </div>
      </div>

      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="font-display">Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="grid gap-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <div className="grid gap-2">
              {items.map((l) => (
                <motion.div key={l.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between rounded-md bg-background/40 p-3 text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <span className="font-medium">{l.description}</span>
                    <span className="text-muted-foreground">{new Date(l.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground hidden sm:block">{l.txHash}</span>
                    <Button size="sm" variant="outline" onClick={() => copy(l.txHash)}>Copy Tx</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
