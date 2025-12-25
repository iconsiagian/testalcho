import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import ProductFilters, { DesktopFilterSidebar, SortOption } from "@/components/ProductFilters";
import ProductDetailView from "@/components/ProductDetailView";
import { products, Product } from "@/data/products";

const ProductsPage = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", !isDark ? "dark" : "light");
  };

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("a-z");
  const [selectedIzin, setSelectedIzin] = useState<string[]>([]);
  
  // Calculate max price from all products
  const maxPrice = useMemo(() => {
    return Math.max(...products.flatMap((p) => p.varian.map((v) => v.hargaSatuan)));
  }, []);
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);

  // Selected product for detail view
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "Semua") count++;
    if (selectedIzin.length > 0) count += selectedIzin.length;
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) count++;
    return count;
  }, [selectedCategory, selectedIzin, priceRange, maxPrice]);

  const resetFilters = () => {
    setSelectedCategory("Semua");
    setSearchQuery("");
    setSelectedIzin([]);
    setPriceRange([0, maxPrice]);
  };

  // Filter and sort products
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

    // Filter by izin status
    if (selectedIzin.length > 0) {
      filtered = filtered.filter((p) => selectedIzin.includes(p.izin));
    }

    // Filter by price range
    filtered = filtered.filter((p) => {
      const minProductPrice = Math.min(...p.varian.map((v) => v.hargaSatuan));
      return minProductPrice >= priceRange[0] && minProductPrice <= priceRange[1];
    });

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
  }, [selectedCategory, searchQuery, sortBy, selectedIzin, priceRange]);

  return (
    <>
      <Helmet>
        <title>Katalog Produk - ALCHO Bumbu & Saus Premium</title>
        <meta
          name="description"
          content="Lihat katalog lengkap produk bumbu dan saus premium ALCHO. Filter berdasarkan kategori, harga, dan status izin. Pesan langsung via WhatsApp."
        />
        <meta property="og:title" content="Katalog Produk ALCHO" />
        <meta
          property="og:description"
          content="Katalog lengkap bumbu dan saus premium untuk bisnis kuliner Anda."
        />
        <link rel="canonical" href="https://alcho.id/produk" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar isDark={isDark} toggleDark={toggleDark} />

        <main className="pt-24 pb-16">
          <div className="container-custom">
            {selectedProduct ? (
              // Product Detail View
              <ProductDetailView
                product={selectedProduct}
                onBack={() => setSelectedProduct(null)}
              />
            ) : (
              // Product List View
              <>
                {/* Page Header */}
                <div className="mb-8">
                  <Button
                    asChild
                    variant="ghost"
                    className="mb-4 gap-2 hover:bg-secondary -ml-2"
                  >
                    <Link to="/">
                      <ArrowLeft className="h-4 w-4" />
                      Kembali ke Beranda
                    </Link>
                  </Button>

                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                        Katalog Produk
                      </h1>
                      <p className="text-muted-foreground">
                        {products.length} produk tersedia
                      </p>
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <ProductFilters
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedIzin={selectedIzin}
                  setSelectedIzin={setSelectedIzin}
                  maxPrice={maxPrice}
                  activeFilterCount={activeFilterCount}
                  onResetFilters={resetFilters}
                />

                {/* Main Content with Sidebar */}
                <div className="flex gap-8 mt-8">
                  {/* Desktop Sidebar */}
                  <DesktopFilterSidebar
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedIzin={selectedIzin}
                    setSelectedIzin={setSelectedIzin}
                    maxPrice={maxPrice}
                    activeFilterCount={activeFilterCount}
                    onResetFilters={resetFilters}
                  />

                  {/* Product Grid */}
                  <div className="flex-1">
                    {filteredProducts.length > 0 ? (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                          {filteredProducts.map((product, index) => (
                            <ProductCard
                              key={product.kode}
                              product={product}
                              onClick={() => setSelectedProduct(product)}
                              index={index}
                            />
                          ))}
                        </div>

                        {/* Results count */}
                        <p className="text-center text-sm text-muted-foreground mt-8">
                          Menampilkan {filteredProducts.length} dari {products.length} produk
                        </p>
                      </>
                    ) : (
                      <div className="text-center py-16 bg-card rounded-xl border border-border">
                        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground text-lg mb-2">
                          Tidak ada produk yang ditemukan
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Coba ubah filter atau kata kunci pencarian
                        </p>
                        <Button variant="outline" onClick={resetFilters}>
                          Reset semua filter
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>

        <Footer />
        <CartDrawer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default ProductsPage;
