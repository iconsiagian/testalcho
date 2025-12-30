import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Menu, 
  X, 
  MessageCircle, 
  Moon, 
  Sun, 
  Search, 
  User, 
  LogIn, 
  UserPlus,
  LayoutDashboard,
  Shield,
  LogOut,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateWhatsAppLink } from "@/data/products";
import { useAuth } from "@/contexts/AuthContext";
import NavbarSearch from "./NavbarSearch";

interface NavbarProps {
  isDark: boolean;
  toggleDark: () => void;
}

const Navbar = ({ isDark, toggleDark }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Produk", href: "/produk", isRoute: true },
    { name: "Inspirasi Menu", href: "#inspirasi-menu", isRoute: false },
    { name: "Pricelist", href: "#pricelist", isRoute: false },
    { name: "Tentang", href: "#tentang", isRoute: false },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const renderNavLink = (link: typeof navLinks[0], mobile: boolean = false) => {
    const baseClass = mobile
      ? "py-3 px-4 text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors font-medium"
      : "text-sm text-foreground/70 hover:text-foreground transition-colors font-medium";

    if (link.isRoute) {
      return (
        <Link
          key={link.name}
          to={link.href}
          onClick={mobile ? () => setIsMobileMenuOpen(false) : undefined}
          className={baseClass}
        >
          {link.name}
        </Link>
      );
    }

    if (location.pathname === "/") {
      return (
        <a
          key={link.name}
          href={link.href}
          onClick={mobile ? () => setIsMobileMenuOpen(false) : undefined}
          className={baseClass}
        >
          {link.name}
        </a>
      );
    }

    return (
      <Link
        key={link.name}
        to={`/${link.href}`}
        onClick={mobile ? () => setIsMobileMenuOpen(false) : undefined}
        className={baseClass}
      >
        {link.name}
      </Link>
    );
  };

  const AccountDropdown = ({ mobile = false }: { mobile?: boolean }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size={mobile ? "default" : "sm"}
          className={mobile 
            ? "w-full justify-start gap-3 py-3 px-4 text-foreground/80 hover:text-primary hover:bg-secondary/50"
            : "gap-2 text-foreground/70 hover:text-foreground"
          }
        >
          <User className="h-4 w-4" />
          <span>Account</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={mobile ? "start" : "end"} 
        className="w-48 bg-popover border-border z-50"
      >
        {user ? (
          <>
            {/* Admin Dashboard - only visible to admin */}
            {isAdmin && (
              <DropdownMenuItem 
                onClick={() => {
                  navigate("/admin/dashboard");
                  if (mobile) setIsMobileMenuOpen(false);
                }}
                className="cursor-pointer"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Admin Dashboard
              </DropdownMenuItem>
            )}
            {isAdmin && <DropdownMenuSeparator />}
            <DropdownMenuItem 
              onClick={() => {
                handleLogout();
                if (mobile) setIsMobileMenuOpen(false);
              }}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem 
              onClick={() => {
                navigate("/auth/login");
                if (mobile) setIsMobileMenuOpen(false);
              }}
              className="cursor-pointer"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => {
                navigate("/auth/register");
                if (mobile) setIsMobileMenuOpen(false);
              }}
              className="cursor-pointer"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Register
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-gradient-to-r from-background/80 via-background/90 to-background/80 backdrop-blur-xl shadow-lg border-b border-border/50"
          : "bg-transparent backdrop-blur-none"
      }`}
      style={{
        WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
      }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Left Section: Logo + Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <span className="font-display text-xl md:text-2xl font-bold text-primary">
                ALCHO
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => renderNavLink(link, false))}
            </div>
          </div>

          {/* Right Section: Search, Theme, WhatsApp, Account */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Expandable Search */}
            <div ref={searchRef} className="relative">
              {isSearchOpen ? (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 animate-fade-in">
                  <NavbarSearch onClose={() => setIsSearchOpen(false)} />
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="rounded-full text-foreground/70 hover:text-foreground"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDark}
              className="rounded-full text-foreground/70 hover:text-foreground"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Primary CTA: Order WhatsApp */}
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white gap-2 font-medium"
            >
              <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Order WhatsApp
              </a>
            </Button>

            {/* Account Dropdown */}
            <AccountDropdown />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDark}
              className="rounded-full text-foreground/70"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground/70"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg animate-fade-in">
            <div className="container-custom py-4 flex flex-col gap-1">
              {/* Mobile Search */}
              <div className="px-4 py-2">
                <NavbarSearch isMobile onClose={() => setIsMobileMenuOpen(false)} />
              </div>
              
              {/* Navigation Links */}
              {navLinks.map((link) => renderNavLink(link, true))}
              
              {/* Account Dropdown */}
              <div className="border-t border-border/50 mt-2 pt-2">
                <AccountDropdown mobile />
              </div>

              {/* WhatsApp CTA */}
              <Button
                asChild
                className="mt-3 mx-4 bg-green-600 hover:bg-green-700 text-white gap-2"
              >
                <a 
                  href={generateWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <MessageCircle className="h-4 w-4" />
                  Order WhatsApp
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
