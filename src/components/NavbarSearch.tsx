import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { products, Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface NavbarSearchProps {
  onClose?: () => void;
  isMobile?: boolean;
}

const NavbarSearch = ({ onClose, isMobile = false }: NavbarSearchProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = products.filter(
        (product) =>
          product.nama.toLowerCase().includes(query.toLowerCase()) ||
          product.kategori.toLowerCase().includes(query.toLowerCase()) ||
          product.kode.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
    setSelectedIndex(-1);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSelectProduct(suggestions[selectedIndex]);
      } else if (query.trim()) {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelectProduct = (product: Product) => {
    navigate(`/produk?search=${encodeURIComponent(product.nama)}`);
    setQuery("");
    setIsOpen(false);
    onClose?.();
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/produk?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setIsOpen(false);
      onClose?.();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={cn("relative", isMobile ? "w-full" : "w-64")}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Cari produk..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setSuggestions.length > 0 && setIsOpen(true)}
          className="pl-9 pr-8 h-9 bg-secondary/50 border-border/50 focus:bg-background"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden animate-fade-in">
          <ul className="py-1">
          {suggestions.map((product, index) => {
              const highlightText = (text: string) => {
                if (!query.trim()) return text;
                const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                const parts = text.split(regex);
                return parts.map((part, i) =>
                  regex.test(part) ? (
                    <span key={i} className="bg-primary/20 text-primary font-semibold">
                      {part}
                    </span>
                  ) : (
                    part
                  )
                );
              };

              return (
                <li key={product.kode}>
                  <button
                    onClick={() => handleSelectProduct(product)}
                    className={cn(
                      "w-full px-4 py-2.5 text-left flex items-center gap-3 transition-colors",
                      selectedIndex === index
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-secondary/50"
                    )}
                  >
                    <img
                      src={product.gambar}
                      alt={product.nama}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{highlightText(product.nama)}</p>
                      <p className="text-xs text-muted-foreground">{highlightText(product.kategori)}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
          {query.trim() && (
            <button
              onClick={handleSearch}
              className="w-full px-4 py-2.5 text-sm text-primary hover:bg-primary/5 border-t border-border flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Cari "{query}" di semua produk
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarSearch;
