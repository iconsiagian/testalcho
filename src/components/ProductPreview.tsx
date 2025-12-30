import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { products, categories, Product } from "@/data/products";

const ProductPreview = () => {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Show only first 8 products for preview
  const previewProducts = products
    .filter((p) => selectedCategory === "Semua" || p.kategori === selectedCategory)
    .slice(0, 8);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

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

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
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

        {/* Product Grid - Grouped by Category */}
        {selectedCategory === "Semua" ? (
          <>
            {/* Sauces Section */}
            {previewProducts.some(p => p.kategori === "Sauce") && (
              <section id="sauces" className="scroll-mt-32 mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-primary rounded-full"></span>
                  Sauce
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {previewProducts
                    .filter(p => p.kategori === "Sauce")
                    .map((product, index) => (
                      <ProductCard
                        key={product.kode}
                        product={product}
                        onClick={() => handleProductClick(product)}
                        index={index}
                      />
                    ))}
                </div>
              </section>
            )}

            {/* Sambal Section */}
            {previewProducts.some(p => p.kategori === "Sambal & Saus Pedas") && (
              <section id="sambal" className="scroll-mt-32 mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-primary rounded-full"></span>
                  Sambal & Saus Pedas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {previewProducts
                    .filter(p => p.kategori === "Sambal & Saus Pedas")
                    .map((product, index) => (
                      <ProductCard
                        key={product.kode}
                        product={product}
                        onClick={() => handleProductClick(product)}
                        index={index}
                      />
                    ))}
                </div>
              </section>
            )}

            {/* Seasoning Section */}
            {previewProducts.some(p => p.kategori === "Bumbu & Seasoning") && (
              <section id="seasoning" className="scroll-mt-32 mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-primary rounded-full"></span>
                  Bumbu & Seasoning
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {previewProducts
                    .filter(p => p.kategori === "Bumbu & Seasoning")
                    .map((product, index) => (
                      <ProductCard
                        key={product.kode}
                        product={product}
                        onClick={() => handleProductClick(product)}
                        index={index}
                      />
                    ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {previewProducts.map((product, index) => (
              <ProductCard
                key={product.kode}
                product={product}
                onClick={() => handleProductClick(product)}
                index={index}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button asChild size="lg" className="gap-2">
            <Link to="/produk">
              Lihat Semua Produk
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            {products.length} produk tersedia dengan filter lengkap
          </p>
        </div>
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

export default ProductPreview;
