import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useWallet } from "@/contexts/WalletContext";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { connected, wallet, address, connect, disconnect, mode, setMode } = useWallet();

  return (
    <main className="p-4 md:p-6 space-y-4">
      <Helmet>
        <title>Settings — TreasuryGuard AI</title>
        <meta name="description" content="Manage wallets and preferences for TreasuryGuard AI." />
        <link rel="canonical" href="/settings" />
      </Helmet>

      <h1 className="font-display text-2xl">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="font-display">Theme</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Dark Mode</span>
            <Switch checked={theme === "dark"} onCheckedChange={(v) => setTheme(v ? "dark" : "light")} />
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="font-display">Mode</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Mock Mode</span>
            <Switch checked={mode === "mock"} onCheckedChange={(v) => setMode(v ? "mock" : "live")} />
          </CardContent>
        </Card>

        <Card className="glass-panel lg:col-span-1">
          <CardHeader>
            <CardTitle className="font-display">Wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {connected ? (
              <>
                <div>Connected: {wallet} — {address}</div>
                <Button variant="outline" onClick={() => disconnect()}>Disconnect</Button>
              </>
            ) : (
              <div className="flex flex-wrap gap-2">
                <Button variant="glow" onClick={() => connect("NEAR")}>Connect NEAR</Button>
                <Button variant="glass" onClick={() => connect("MetaMask")}>MetaMask</Button>
                <Button variant="glass" onClick={() => connect("WalletConnect")} disabled>WalletConnect (soon)</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
