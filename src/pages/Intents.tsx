import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddIntentDialog from "@/components/intents/AddIntentDialog";
import { useState } from "react";
import { useAgent } from "@/contexts/AgentContext";

export default function Intents() {
  const { intents, executeIntent } = useAgent();
  const [open, setOpen] = useState(false);

  return (
    <main className="p-4 md:p-6 space-y-4">
      <Helmet>
        <title>Intents — TreasuryGuard AI</title>
        <meta name="description" content="Configure AI intents for autonomous treasury management." />
        <link rel="canonical" href="/intents" />
      </Helmet>

      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Intents</h1>
        <Button variant="hero" onClick={() => setOpen(true)}>Add Intent</Button>
      </div>

      <AddIntentDialog open={open} onOpenChange={setOpen} />

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {intents.map((i) => (
          <motion.div key={i.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="font-display text-base">{i.condition} → {i.action}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div>Status: {i.status}</div>
                <div>Last action: {i.last || "—"}</div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => executeIntent(i.id)}>Execute</Button>
                  <Button size="sm" variant="ghost">Pause</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
