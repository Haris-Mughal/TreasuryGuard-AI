import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Shield, Zap } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { useNavigate, Link, NavLink } from "react-router-dom";
import Logo from "@/components/Logo";

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <Card className="glass-panel">
    <CardContent className="p-6">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="font-display text-lg">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </CardContent>
  </Card>
);

const Index = () => {
  const { connected, connect } = useWallet();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <Helmet>
        <title>TreasuryGuard AI — Autonomous DAO Treasury Manager</title>
        <meta name="description" content="Autonomous, AI-driven treasury management on NEAR with secure TEE execution and on-chain audit logs." />
        <link rel="canonical" href="/" />
      </Helmet>
      <div className="aurora" />

      <header className="relative z-10 w-full border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:glass-panel">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover-scale" aria-label="TreasuryGuard AI Home">
            <Logo className="h-6 w-6" />
            <span className="font-display tracking-wide">TreasuryGuard AI</span>
          </Link>
          <nav className="flex items-center gap-4">
            <NavLink to="/dashboard" className="story-link text-sm text-muted-foreground">Dashboard</NavLink>
            <NavLink to="/intents" className="story-link text-sm text-muted-foreground">Intents</NavLink>
            <NavLink to="/logs" className="story-link text-sm text-muted-foreground">Logs</NavLink>
            <NavLink to="/settings" className="story-link text-sm text-muted-foreground">Settings</NavLink>
          </nav>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-16 flex-1">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl md:text-6xl leading-tight bg-gradient-brand bg-clip-text text-transparent"
          >
            Autonomous Treasury Management. On NEAR. Secure. AI‑Driven.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Connect your DAO or community treasury, set intents, and let the Shade Agent execute with verifiable, on-chain transparency.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              variant="hero"
              size="xl"
              className={!connected ? "hover-scale pulse shadow-glow" : "hover-scale"}
              aria-label={connected ? "Go to Dashboard" : "Connect NEAR Wallet to continue"}
              title={connected ? "Go to Dashboard" : "Connect NEAR Wallet to continue"}
              onClick={() => (connected ? navigate("/dashboard") : connect("NEAR"))}
            >
              {connected ? "Go to Dashboard" : "Connect NEAR Wallet"}
            </Button>
            <Button variant="glass" size="lg" className="hover-scale" onClick={() => navigate("/dashboard")}>Explore Dashboard</Button>
          </motion.div>
        </div>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <FeatureCard icon={Brain} title="Set Intents" desc="Rules like ‘50% in stables’, ‘buy dips’, and ‘stake idle assets’." />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05, duration: 0.5 }}>
            <FeatureCard icon={Zap} title="AI Executes" desc="Shade Agent monitors markets and executes via NEAR Intents." />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }}>
            <FeatureCard icon={Shield} title="On‑Chain Security" desc="TEE-protected decisions with verifiable on-chain logs." />
          </motion.div>
        </section>
      </main>

      <footer className="relative z-10 w-full border-t bg-background/60 backdrop-blur supports-[backdrop-filter]:glass-panel">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <nav className="flex items-center gap-4">
            <NavLink to="/" className="story-link text-sm text-muted-foreground">Home</NavLink>
            <NavLink to="/dashboard" className="story-link text-sm text-muted-foreground">Dashboard</NavLink>
            <NavLink to="/intents" className="story-link text-sm text-muted-foreground">Intents</NavLink>
            <NavLink to="/logs" className="story-link text-sm text-muted-foreground">Logs</NavLink>
            <NavLink to="/settings" className="story-link text-sm text-muted-foreground">Settings</NavLink>
          </nav>
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} TreasuryGuard AI — Autonomous Treasury on NEAR</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
