import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { useState } from "react";
import AddIntentDialog from "@/components/intents/AddIntentDialog";

const pieData = [
  { name: "Stablecoins", value: 50 },
  { name: "NEAR", value: 30 },
  { name: "ETH", value: 15 },
  { name: "Yield", value: 5 },
];
const COLORS = ["hsl(var(--brand-1))", "hsl(var(--brand-3))", "hsl(var(--accent))", "hsl(var(--brand-2))"];

const areaData = [
  { name: "Mon", value: 42 },
  { name: "Tue", value: 45 },
  { name: "Wed", value: 47 },
  { name: "Thu", value: 46 },
  { name: "Fri", value: 49 },
  { name: "Sat", value: 51 },
  { name: "Sun", value: 53 },
];

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  return (
    <main className="p-4 md:p-6 space-y-4">
      <Helmet>
        <title>TreasuryGuard AI Dashboard</title>
        <meta name="description" content="Web3 dashboard for autonomous DAO treasury management on NEAR." />
        <link rel="canonical" href="/dashboard" />
      </Helmet>

      <AddIntentDialog open={open} onOpenChange={setOpen} />

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
        <Card className="col-span-2 glass-panel">
          <CardHeader>
            <CardTitle className="font-display">Treasury Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--brand-1))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--brand-1))" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="hsl(var(--brand-1))" fillOpacity={1} fill="url(#valueGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" labelLine={false} outerRadius={90}>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="font-display">Agent Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-muted-foreground">Shade Agent: Active in TEE</div>
            <Button variant="glow" className="w-full">Pause Agent</Button>
            <Button variant="outline" className="w-full">View On-Chain Log</Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.45 }} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="glass-panel lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display">Recent Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between p-2 rounded-md bg-background/40">
              <span>Rebalanced to 50% stablecoins</span>
              <Button size="sm" variant="ghost">View Tx</Button>
            </div>
            <div className="flex items-center justify-between p-2 rounded-md bg-background/40">
              <span>Staked 500 NEAR</span>
              <Button size="sm" variant="ghost">View Tx</Button>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="font-display">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button variant="hero" onClick={() => setOpen(true)}>Add Intent</Button>
            <Button variant="outline">Run Simulation</Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
