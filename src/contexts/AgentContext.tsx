import { createContext, useContext, useEffect, useMemo, useRef, useState, ReactNode } from "react";
import { toast } from "@/components/ui/sonner";
import { useWallet } from "@/contexts/WalletContext";

export type IntentCondition = "price_drop" | "stake_idle" | "rebalance";
export type IntentAction = "buy_near" | "swap_usdt" | "stake";

export type Intent = {
  id: string;
  condition: IntentCondition;
  action: IntentAction;
  status: "Active" | "Paused";
  last?: string;
  createdAt: number;
};

export type LogEntry = {
  id: string;
  txHash: string;
  timestamp: number;
  description: string;
};

type AgentContextType = {
  initializing: boolean;
  intents: Intent[];
  logs: LogEntry[];
  addIntent: (i: Omit<Intent, "id" | "status" | "createdAt">) => Promise<Intent>;
  executeIntent: (id: string) => Promise<void>;
  refreshLogs: () => Promise<void>;
};

const AgentContext = createContext<AgentContextType | undefined>(undefined);

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function AgentProvider({ children }: { children: ReactNode }) {
  const { connected, address, wallet, mode } = useWallet();
  const [initializing, setInitializing] = useState(false);
  const [intents, setIntents] = useState<Intent[]>([
    { id: genId(), condition: "rebalance", action: "swap_usdt", status: "Active", createdAt: Date.now() - 86400000, last: "1d ago" },
    { id: genId(), condition: "price_drop", action: "buy_near", status: "Active", createdAt: Date.now() - 7200000, last: "2h ago" },
  ]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => { isMounted.current = false; };
  }, []);

  useEffect(() => {
    async function init() {
      if (!connected || !address) return;
      setInitializing(true);
      try {
        if (mode === "live") {
          // TODO: Integrate Shade Agent init & registration here when package is available
          // Example placeholder:
          // const agent = await initAgent({ accountId: address });
          // await ensureRegistered(agent);
          toast.info("Initializing Shade Agent (placeholder)");
        }
      } catch (e) {
        console.error(e);
        toast.error("Failed to initialize agent");
      } finally {
        if (isMounted.current) setInitializing(false);
      }
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, address, mode]);

  const addIntent: AgentContextType["addIntent"] = async (i) => {
    // In live mode, call contract/API via Shade Agent; for now, mock
    const created: Intent = { id: genId(), status: "Active", createdAt: Date.now(), ...i };
    setIntents((prev) => [created, ...prev]);
    toast.success("Intent added");
    return created;
  };

  const executeIntent: AgentContextType["executeIntent"] = async (id) => {
    const intent = intents.find((x) => x.id === id);
    if (!intent) return;

    // In live mode, trigger agent to execute. Here we simulate a tx hash.
    const txHash = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`;
    const entry: LogEntry = {
      id: genId(),
      txHash,
      timestamp: Date.now(),
      description: `Executed intent: ${intent.condition} -> ${intent.action}`,
    };
    setLogs((prev) => [entry, ...prev]);
    setIntents((prev) => prev.map((it) => (it.id === id ? { ...it, last: "just now" } : it)));
    toast.success("Intent executed (demo)");
  };

  const refreshLogs: AgentContextType["refreshLogs"] = async () => {
    // In live mode, fetch on-chain logs
    if (mode === "live") {
      toast.info("Fetching on-chain logs (placeholder)");
    }
    // Simulate new log occasionally
    if (Math.random() > 0.5) {
      const entry: LogEntry = {
        id: genId(),
        txHash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
        timestamp: Date.now(),
        description: "Agent heartbeat: portfolio check",
      };
      setLogs((prev) => [entry, ...prev]);
    }
  };

  const value = useMemo(
    () => ({ initializing, intents, logs, addIntent, executeIntent, refreshLogs }),
    [initializing, intents, logs]
  );

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
}

export function useAgent() {
  const ctx = useContext(AgentContext);
  if (!ctx) throw new Error("useAgent must be used within AgentProvider");
  return ctx;
}
