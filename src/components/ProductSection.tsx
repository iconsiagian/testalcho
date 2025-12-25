import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ArrowUpAZ, ArrowDownAZ, TrendingUp, TrendingDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { products, categories, Product } from "@/data/products";

type SortOption = "a-z" | "z-a" | "price-low" | "price-high";

const ProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("a-z");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "Semua") {
      filtered = filtered.filter((p) => p.kategori === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.nama.toLowerCase().includes(query) ||
          p.kode.toLowerCase().includes(query)
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "a-z":
          return a.nama.localeCompare(b.nama);
        case "z-a":
          return b.nama.localeCompare(a.nama);
        case "price-low":
          return a.varian[0].hargaSatuan - b.varian[0].hargaSatuan;
        case "price-high":
          return b.varian[0].hargaSatuan - a.varian[0].hargaSatuan;
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const sortOptions = [
    { value: "a-z" as SortOption, label: "Nama A-Z", icon: ArrowUpAZ },
    { value: "z-a" as SortOption, label: "Nama Z-A", icon: ArrowDownAZ },
    { value: "price-low" as SortOption, label: "Harga Terendah", icon: TrendingDown },
    { value: "price-high" as SortOption, label: "Harga Tertinggi", icon: TrendingUp },
  ];

  const currentSort = sortOptions.find((o) => o.value === sortBy);

  return (
    <section id="produk" className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Katalog <span className="text-primary">Produk</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Temukan berbagai pilihan bumbu dan saus berkualitas tinggi untuk kebutuhan bisnis kuliner Anda
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau kode produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 shrink-0">
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
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.kode}
                product={product}
                onClick={() => handleProductClick(product)}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Tidak ada produk yang ditemukan
            </p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Semua");
              }}
              className="mt-2"
            >
              Reset filter
            </Button>
          </div>
        )}

        {/* Results count */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Menampilkan {filteredProducts.length} dari {products.length} produk
        </p>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default ProductSection;
