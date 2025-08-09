import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Wallet as WalletIcon, ChevronDown, LogOut, Copy, HardDriveDownload } from "lucide-react";
import { useWallet, WalletType } from "@/contexts/WalletContext";
import { useMemo } from "react";
import { toast } from "@/components/ui/sonner";

function truncate(addr?: string) {
  if (!addr) return "";
  return addr.length <= 12 ? addr : `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export default function WalletButton({ size = "sm" as const }: { size?: "sm" | "default" | "lg" | "xl" }) {
  const { connected, address, connect, disconnect, mode } = useWallet();

  const label = useMemo(() => (connected ? truncate(address) : "Connect Wallet"), [connected, address]);

  if (!connected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={size} variant="glow" className="hover-scale pulse">
            <WalletIcon className="mr-2 h-4 w-4" /> {label}
            <ChevronDown className="ml-1 h-3.5 w-3.5 opacity-70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-50">
          <DropdownMenuItem onClick={() => connect("NEAR" as WalletType)}>NEAR Wallet</DropdownMenuItem>
          <DropdownMenuItem onClick={() => connect("MetaMask" as WalletType)}>MetaMask (EVM)</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={size} variant="outline" className="hover-scale">
          <WalletIcon className="mr-2 h-4 w-4" /> {label}
          <ChevronDown className="ml-1 h-3.5 w-3.5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-50">
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(address || "").then(() => toast.success("Address copied"))}>
          <Copy className="mr-2 h-4 w-4" /> Copy address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => disconnect()}>
          <LogOut className="mr-2 h-4 w-4" /> Disconnect
        </DropdownMenuItem>
        {mode === "mock" && (
          <DropdownMenuItem disabled>
            <HardDriveDownload className="mr-2 h-4 w-4" /> Mock mode
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
