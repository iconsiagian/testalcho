import { Search, SlidersHorizontal, ArrowUpAZ, ArrowDownAZ, TrendingUp, TrendingDown, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { categories, formatPrice } from "@/data/products";

export type SortOption = "a-z" | "z-a" | "price-low" | "price-high";

interface ProductFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedIzin: string[];
  setSelectedIzin: (izin: string[]) => void;
  maxPrice: number;
  activeFilterCount: number;
  onResetFilters: () => void;
}

const ProductFilters = ({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  selectedIzin,
  setSelectedIzin,
  maxPrice,
  activeFilterCount,
  onResetFilters,
}: ProductFiltersProps) => {
  const sortOptions = [
    { value: "a-z" as SortOption, label: "Nama A-Z", icon: ArrowUpAZ },
    { value: "z-a" as SortOption, label: "Nama Z-A", icon: ArrowDownAZ },
    { value: "price-low" as SortOption, label: "Harga Terendah", icon: TrendingDown },
    { value: "price-high" as SortOption, label: "Harga Tertinggi", icon: TrendingUp },
  ];

  const izinOptions = ["P-IRT", "SEDANG PROSES"];

  const currentSort = sortOptions.find((o) => o.value === sortBy);

  const toggleIzin = (izin: string) => {
    if (selectedIzin.includes(izin)) {
      setSelectedIzin(selectedIzin.filter((i) => i !== izin));
    } else {
      setSelectedIzin([...selectedIzin, izin]);
    }
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h4 className="font-semibold text-foreground mb-3">Kategori</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="font-semibold text-foreground mb-3">Rentang Harga</h4>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={maxPrice}
            min={0}
            step={1000}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Status Izin Filter */}
      <div>
        <h4 className="font-semibold text-foreground mb-3">Status Izin</h4>
        <div className="space-y-3">
          {izinOptions.map((izin) => (
            <div key={izin} className="flex items-center space-x-2">
              <Checkbox
                id={izin}
                checked={selectedIzin.includes(izin)}
                onCheckedChange={() => toggleIzin(izin)}
              />
              <Label htmlFor={izin} className="cursor-pointer">
                {izin}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      {activeFilterCount > 0 && (
        <Button variant="outline" className="w-full" onClick={onResetFilters}>
          <X className="h-4 w-4 mr-2" />
          Reset Filter ({activeFilterCount})
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Search & Sort Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama atau kode produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Mobile Filter Button */}
        <div className="flex gap-2 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2 flex-1">
                <Filter className="h-4 w-4" />
                Filter
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Filter Produk</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">{currentSort?.label}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className="gap-2"
                >
                  <option.icon className="h-4 w-4" />
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Sort */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 shrink-0 hidden lg:flex">
              <SlidersHorizontal className="h-4 w-4" />
              {currentSort?.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className="gap-2"
              >
                <option.icon className="h-4 w-4" />
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCategory !== "Semua" && (
            <Badge variant="secondary" className="gap-1">
              {selectedCategory}
              <button onClick={() => setSelectedCategory("Semua")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedIzin.map((izin) => (
            <Badge key={izin} variant="secondary" className="gap-1">
              {izin}
              <button onClick={() => toggleIzin(izin)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
            <Badge variant="secondary" className="gap-1">
              {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              <button onClick={() => setPriceRange([0, maxPrice])}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Desktop Sidebar Filter - rendered by parent */}
    </div>
  );
};

export const DesktopFilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedIzin,
  setSelectedIzin,
  maxPrice,
  activeFilterCount,
  onResetFilters,
}: Omit<ProductFiltersProps, "searchQuery" | "setSearchQuery" | "sortBy" | "setSortBy">) => {
  const izinOptions = ["P-IRT", "SEDANG PROSES"];

  const toggleIzin = (izin: string) => {
    if (selectedIzin.includes(izin)) {
      setSelectedIzin(selectedIzin.filter((i) => i !== izin));
    } else {
      setSelectedIzin([...selectedIzin, izin]);
    }
  };

  return (
    <div className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24 bg-card rounded-xl border border-border p-5 space-y-6">
        <h3 className="font-display text-lg font-semibold text-foreground">Filter</h3>

        {/* Category Filter */}
        <div>
          <h4 className="font-medium text-foreground mb-3 text-sm">Kategori</h4>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h4 className="font-medium text-foreground mb-3 text-sm">Rentang Harga</h4>
          <div className="px-1">
            <Slider
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              max={maxPrice}
              min={0}
              step={1000}
              className="mb-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        </div>

        {/* Status Izin Filter */}
        <div>
          <h4 className="font-medium text-foreground mb-3 text-sm">Status Izin</h4>
          <div className="space-y-2">
            {izinOptions.map((izin) => (
              <div key={izin} className="flex items-center space-x-2">
                <Checkbox
                  id={`desktop-${izin}`}
                  checked={selectedIzin.includes(izin)}
                  onCheckedChange={() => toggleIzin(izin)}
                />
                <Label htmlFor={`desktop-${izin}`} className="cursor-pointer text-sm">
                  {izin}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        {activeFilterCount > 0 && (
          <Button variant="outline" size="sm" className="w-full" onClick={onResetFilters}>
            <X className="h-4 w-4 mr-2" />
            Reset ({activeFilterCount})
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
