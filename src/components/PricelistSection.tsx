import { useState } from "react";
import { Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, formatPrice, generatePricelistCSV } from "@/data/products";
import { cn } from "@/lib/utils";

const PricelistSection = () => {
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());

  const handleDownload = () => {
    const csv = generatePricelistCSV();
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `ALCHO_Pricelist_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleExpand = (kode: string) => {
    setExpandedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(kode)) {
        newSet.delete(kode);
      } else {
        newSet.add(kode);
      }
      return newSet;
    });
  };

  return (
    <section id="pricelist" className="section-padding bg-[#1a1614]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Daftar Harga
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Harga <span className="text-primary">Premium</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Harga transparan untuk mitra bisnis. Lihat kemasan lengkap untuk setiap produk.
          </p>
        </div>

        {/* Download Button */}
        <div className="flex justify-center mb-10">
          <Button onClick={handleDownload} size="lg" className="gap-2 bg-primary hover:bg-primary/90">
            <Download className="h-5 w-5" />
            Unduh Pricelist (CSV)
          </Button>
        </div>

        {/* Products List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {products.map((product) => {
            const isExpanded = expandedProducts.has(product.kode);
            const primaryVariant = product.varian[0];
            const hasMoreVariants = product.varian.length > 1;

            return (
              <div 
                key={product.kode}
                className="rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 overflow-hidden hover:border-primary/30 transition-all duration-300"
              >
                {/* Main Product Row */}
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    {/* Product Image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/5 flex-shrink-0 overflow-hidden">
                      <img 
                        src={product.gambar} 
                        alt={product.nama}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-white/40">{product.kode}</span>
                            <span className="text-white/20">•</span>
                            <span className="text-xs text-primary/70">{product.kategori}</span>
                          </div>
                          <h3 className="font-display font-semibold text-white text-lg truncate">
                            {product.nama}
                          </h3>
                          <p className="text-sm text-white/50 mt-1">
                            {primaryVariant.pack}
                          </p>
                        </div>

                        {/* Prices */}
                        <div className="text-right flex-shrink-0">
                          <p className="font-display text-xl sm:text-2xl font-bold text-primary">
                            {formatPrice(primaryVariant.hargaSatuan)}
                          </p>
                          <p className="text-sm text-white/40 mt-0.5">
                            {formatPrice(primaryVariant.hargaKarton)}
                            <span className="text-xs ml-1 text-primary/50">/ karton</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expand Toggle */}
                  {hasMoreVariants && (
                    <button
                      onClick={() => toggleExpand(product.kode)}
                      className="mt-4 flex items-center gap-2 text-sm text-primary/80 hover:text-primary transition-colors group"
                    >
                      <ChevronDown 
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )} 
                      />
                      <span>
                        {isExpanded ? "Sembunyikan kemasan lain" : `Lihat ${product.varian.length - 1} kemasan lainnya`}
                      </span>
                    </button>
                  )}
                </div>

                {/* Expanded Variants */}
                {hasMoreVariants && (
                  <div 
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                      <div className="border-t border-white/10 pt-4 space-y-3">
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
                          Kemasan lainnya
                        </p>
                        {product.varian.slice(1).map((variant, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5"
                          >
                            <span className="text-sm text-white/70">{variant.pack}</span>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <span className="font-semibold text-primary">
                                  {formatPrice(variant.hargaSatuan)}
                                </span>
                              </div>
                              <div className="text-right min-w-[100px]">
                                <span className="text-sm text-white/40">
                                  {formatPrice(variant.hargaKarton)}
                                </span>
                                <span className="text-xs text-white/30 ml-1">/ karton</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        <p className="text-xs text-primary/60 mt-3 flex items-center gap-1.5">
                          <span className="inline-block w-1 h-1 rounded-full bg-primary/60"></span>
                          Lebih hemat per karton
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-10 text-center">
          <p className="text-sm text-white/40 max-w-xl mx-auto">
            <span className="text-primary/70">*</span> Harga dapat berubah sewaktu-waktu. 
            Hubungi admin untuk konfirmasi harga terbaru sebelum melakukan pemesanan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricelistSection;
