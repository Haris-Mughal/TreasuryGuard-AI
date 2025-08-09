import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar";
import { Brain, Home, Wallet as WalletIcon, FileText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import WalletButton from "@/components/WalletButton";
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";

const items = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Treasury", url: "/dashboard", icon: WalletIcon },
  { title: "Intents", url: "/intents", icon: Brain },
  { title: "Logs", url: "/logs", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-display text-base">TreasuryGuard AI</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end className={({ isActive }) => (isActive ? "bg-muted text-primary font-medium" : "hover:bg-muted/50") }>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
      </SidebarContent>
    </Sidebar>
  );
}

function HeaderBar() {
  const navigate = useNavigate();

  return (
    <header className="flex h-14 items-center justify-between px-3 border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:glass-panel">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <span className="font-display text-sm tracking-wide text-muted-foreground">Autonomous Treasury on NEAR</span>
      </div>
      <div className="flex items-center gap-2">
        <WalletButton size="sm" />
        <Button variant="glass" size="sm" onClick={() => navigate("/")}>Landing</Button>
      </div>
    </header>
  );
}

export default function DashboardLayout() {
  // Ensure full-width wrapper as per sidebar docs
  useEffect(() => {
    // no-op: placeholder for analytics or resize hooks later
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <HeaderBar />
          <SidebarInset>
            <div className="aurora" />
            <Outlet />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
