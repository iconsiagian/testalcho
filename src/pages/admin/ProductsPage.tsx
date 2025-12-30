import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Package,
  Search,
  Eye,
  ImageIcon,
} from 'lucide-react';
import { products as localProducts, categories, formatPrice, Product } from '@/data/products';

const CATEGORIES = categories.filter(c => c !== 'Semua');

const ProductsPage: React.FC = () => {
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  // Use local products as the single source of truth
  const products = localProducts;

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.kode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === 'all' || product.kategori === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  const handleViewProduct = (product: Product) => {
    setViewingProduct(product);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setViewingProduct(null);
  };

  const getIzinBadge = (izin: string) => {
    if (izin === 'P-IRT') {
      return <Badge className="bg-green-500/10 text-green-500 border-0">P-IRT</Badge>;
    }
    return <Badge className="bg-orange-500/10 text-orange-500 border-0">Proses</Badge>;
  };

  return (
    <>
      <Helmet>
        <title>Products - ALCHO Admin</title>
      </Helmet>

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground">Katalog produk ALCHO ({products.length} produk)</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Cari produk atau kode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="w-5 h-5" />
              Daftar Produk ({filteredProducts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filteredProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="w-16">Gambar</TableHead>
                      <TableHead className="w-24">Kode</TableHead>
                      <TableHead>Nama Produk</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Varian</TableHead>
                      <TableHead>Harga Mulai</TableHead>
                      <TableHead>Status Izin</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.kode} className="border-border/50">
                        <TableCell>
                          {product.gambar ? (
                            <img
                              src={product.gambar}
                              alt={product.nama}
                              className="w-12 h-12 rounded-lg object-cover bg-background"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-muted-foreground" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-sm text-muted-foreground">
                          {product.kode}
                        </TableCell>
                        <TableCell>
                          <p className="font-medium">{product.nama}</p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {product.kategori}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {product.varian.length} kemasan
                        </TableCell>
                        <TableCell className="font-semibold text-primary">
                          {formatPrice(product.varian[0]?.hargaSatuan || 0)}
                        </TableCell>
                        <TableCell>{getIzinBadge(product.izin)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewProduct(product)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-muted-foreground">Tidak ada produk ditemukan</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* View Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail Produk</DialogTitle>
            <DialogDescription>
              Informasi lengkap produk
            </DialogDescription>
          </DialogHeader>

          {viewingProduct && (
            <div className="space-y-6">
              {/* Product Image */}
              <div className="flex justify-center">
                {viewingProduct.gambar ? (
                  <img
                    src={viewingProduct.gambar}
                    alt={viewingProduct.nama}
                    className="w-32 h-32 rounded-xl object-cover bg-background"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-xl bg-muted flex items-center justify-center">
                    <ImageIcon className="w-10 h-10 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Kode Produk</Label>
                    <p className="font-mono">{viewingProduct.kode}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Status Izin</Label>
                    <div className="mt-1">{getIzinBadge(viewingProduct.izin)}</div>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Nama Produk</Label>
                  <p className="font-semibold text-lg">{viewingProduct.nama}</p>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Kategori</Label>
                  <p>{viewingProduct.kategori}</p>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Daftar Kemasan & Harga</Label>
                  <div className="mt-2 space-y-2">
                    {viewingProduct.varian.map((v, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50"
                      >
                        <span className="text-sm font-medium">{v.pack}</span>
                        <div className="text-right">
                          <p className="font-semibold text-primary">{formatPrice(v.hargaSatuan)}</p>
                          <p className="text-xs text-muted-foreground">
                            Karton: {formatPrice(v.hargaKarton)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={handleCloseDialog} variant="outline">
                  Tutup
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductsPage;
