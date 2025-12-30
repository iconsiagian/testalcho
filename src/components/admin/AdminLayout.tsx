import React from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ShoppingCart,
  Wallet,
  Package,
  Users,
  Shield,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  Building2
} from 'lucide-react';
import { useState } from 'react';

const sidebarLinks = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { to: '/admin/cashflow', icon: Wallet, label: 'Cashflow' },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/customers', icon: Users, label: 'Customers' },
  { to: '/admin/security', icon: Shield, label: 'Security' },
];

const AdminLayout: React.FC = () => {
  const { profile, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
            <Building2 className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          {sidebarOpen && (
            <div>
              <h1 className="font-display font-bold text-sidebar-foreground">ALCHO</h1>
              <p className="text-xs text-sidebar-foreground/60">Admin Panel</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:flex"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform", !sidebarOpen && "rotate-180")} />
        </Button>
      </div>

      {/* User Info */}
      {sidebarOpen && profile && (
        <div className="p-4 border-b border-sidebar-border">
          <p className="font-medium text-sidebar-foreground text-sm truncate">{profile.business_name}</p>
          <p className="text-xs text-sidebar-foreground/60 truncate">{profile.full_name}</p>
          {userRole && (
            <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs bg-sidebar-primary/20 text-sidebar-primary capitalize">
              {userRole.role}
            </span>
          )}
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="px-2 space-y-1">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )
              }
            >
              <link.icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>{link.label}</span>}
            </NavLink>
          ))}
        </nav>
      </ScrollArea>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10",
            !sidebarOpen && "justify-center"
          )}
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-sidebar-background border-r border-sidebar-border transition-all duration-300",
          sidebarOpen ? "w-64" : "w-[72px]"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-sidebar-background z-50 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden h-14 border-b border-border bg-card flex items-center px-4 gap-4">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <span className="font-display font-bold">ALCHO Admin</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
