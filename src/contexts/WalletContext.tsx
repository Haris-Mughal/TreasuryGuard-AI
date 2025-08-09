import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "@/components/ui/sonner";
import { BrowserProvider } from "ethers";
// Importing near-api-js to prepare for live NEAR integration
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as nearAPI from "near-api-js";

export type WalletType = "NEAR" | "MetaMask" | "WalletConnect";
export type Mode = "mock" | "live";

type WalletState = {
  connected: boolean;
  address?: string;
  wallet?: WalletType;
  evmProvider?: BrowserProvider;
  mode: Mode;
};

type WalletContextType = WalletState & {
  connect: (type: WalletType) => Promise<void>;
  disconnect: () => void;
  setMode: (mode: Mode) => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WalletState>({ connected: false, mode: (localStorage.getItem("tg.mode") as Mode) || "mock" });

  useEffect(() => {
    localStorage.setItem("tg.mode", state.mode);
  }, [state.mode]);

  const connect = async (type: WalletType) => {
    if (state.mode === "mock") {
      const mockAddress = type === "NEAR" ? "demo.near" : type === "MetaMask" ? "0x12…A9f3" : "wc:9f3…aa1";
      setState({ connected: true, wallet: type, address: mockAddress, mode: state.mode });
      toast.success(`${type} connected (mock)`);
      return;
    }

    if (type === "MetaMask") {
      try {
        const anyWindow = window as any;
        if (!anyWindow.ethereum) {
          toast.error("MetaMask not found");
          return;
        }
        const provider = new BrowserProvider(anyWindow.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const addr = await signer.getAddress();
        setState({ connected: true, wallet: type, address: addr, evmProvider: provider, mode: state.mode });
        toast.success("MetaMask connected");
      } catch (e) {
        console.error(e);
        toast.error("Failed to connect MetaMask");
      }
      return;
    }

    if (type === "NEAR") {
      // Placeholder for NEAR Wallet connection via near-api-js or Wallet Selector
      toast.info("NEAR wallet connection (live) pending integration — using mock now");
      const mockAddress = "demo.near";
      setState({ connected: true, wallet: type, address: mockAddress, mode: state.mode });
      return;
    }
  };

  const disconnect = () => {
    setState({ connected: false, mode: state.mode });
    toast("Disconnected");
  };

  const setMode = (mode: Mode) => {
    setState((s) => ({ ...s, mode }));
    toast.success(`Mode set to ${mode.toUpperCase()}`);
  };

  return (
    <WalletContext.Provider value={{ ...state, connect, disconnect, setMode }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
