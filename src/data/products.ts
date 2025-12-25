export interface ProductVariant {
  pack: string;
  hargaSatuan: number;
  hargaKarton: number;
}

export interface Product {
  kode: string;
  nama: string;
  kategori: string;
  izin: string;
  varian: ProductVariant[];
}

export const products: Product[] = [
  {
    kode: "ALC-001",
    nama: "Saus Tomat Premium",
    kategori: "Sauce",
    izin: "P-IRT",
    varian: [
      { pack: "250ml Botol", hargaSatuan: 15000, hargaKarton: 165000 },
      { pack: "500ml Botol", hargaSatuan: 27000, hargaKarton: 297000 },
      { pack: "1L Jerigen", hargaSatuan: 48000, hargaKarton: 528000 }
    ]
  },
  {
    kode: "ALC-002",
    nama: "Saus Sambal Extra Pedas",
    kategori: "Sambal & Saus Pedas",
    izin: "P-IRT",
    varian: [
      { pack: "250ml Botol", hargaSatuan: 18000, hargaKarton: 198000 },
      { pack: "500ml Botol", hargaSatuan: 32000, hargaKarton: 352000 }
    ]
  },
  {
    kode: "ALC-003",
    nama: "Bumbu Nasi Goreng Spesial",
    kategori: "Bumbu & Seasoning",
    izin: "P-IRT",
    varian: [
      { pack: "50g Sachet", hargaSatuan: 5000, hargaKarton: 110000 },
      { pack: "250g Pouch", hargaSatuan: 22000, hargaKarton: 242000 },
      { pack: "1kg Bucket", hargaSatuan: 78000, hargaKarton: 858000 }
    ]
  },
  {
    kode: "ALC-004",
    nama: "Saus Tiram Premium",
    kategori: "Sauce",
    izin: "P-IRT",
    varian: [
      { pack: "300ml Botol", hargaSatuan: 25000, hargaKarton: 275000 },
      { pack: "600ml Botol", hargaSatuan: 45000, hargaKarton: 495000 }
    ]
  },
  {
    kode: "ALC-005",
    nama: "Sambal Matah Ready",
    kategori: "Sambal & Saus Pedas",
    izin: "SEDANG PROSES",
    varian: [
      { pack: "200g Jar", hargaSatuan: 28000, hargaKarton: 308000 },
      { pack: "500g Jar", hargaSatuan: 62000, hargaKarton: 682000 }
    ]
  },
  {
    kode: "ALC-006",
    nama: "Bumbu Rendang Instan",
    kategori: "Bumbu & Seasoning",
    izin: "P-IRT",
    varian: [
      { pack: "100g Sachet", hargaSatuan: 12000, hargaKarton: 132000 },
      { pack: "500g Pouch", hargaSatuan: 52000, hargaKarton: 572000 }
    ]
  },
  {
    kode: "ALC-007",
    nama: "Saus BBQ Smoky",
    kategori: "Sauce",
    izin: "P-IRT",
    varian: [
      { pack: "250ml Botol", hargaSatuan: 20000, hargaKarton: 220000 },
      { pack: "500ml Botol", hargaSatuan: 36000, hargaKarton: 396000 },
      { pack: "1L Jerigen", hargaSatuan: 65000, hargaKarton: 715000 }
    ]
  },
  {
    kode: "ALC-008",
    nama: "Sambal Bajak Tradisional",
    kategori: "Sambal & Saus Pedas",
    izin: "P-IRT",
    varian: [
      { pack: "200g Jar", hargaSatuan: 24000, hargaKarton: 264000 },
      { pack: "500g Jar", hargaSatuan: 55000, hargaKarton: 605000 }
    ]
  },
  {
    kode: "ALC-009",
    nama: "Bumbu Gulai Padang",
    kategori: "Bumbu & Seasoning",
    izin: "P-IRT",
    varian: [
      { pack: "100g Sachet", hargaSatuan: 14000, hargaKarton: 154000 },
      { pack: "500g Pouch", hargaSatuan: 62000, hargaKarton: 682000 }
    ]
  },
  {
    kode: "ALC-010",
    nama: "Saus Teriyaki Jepang",
    kategori: "Sauce",
    izin: "SEDANG PROSES",
    varian: [
      { pack: "300ml Botol", hargaSatuan: 28000, hargaKarton: 308000 },
      { pack: "600ml Botol", hargaSatuan: 50000, hargaKarton: 550000 }
    ]
  },
  {
    kode: "ALC-011",
    nama: "Bumbu Soto Ayam",
    kategori: "Bumbu & Seasoning",
    izin: "P-IRT",
    varian: [
      { pack: "50g Sachet", hargaSatuan: 6000, hargaKarton: 132000 },
      { pack: "250g Pouch", hargaSatuan: 26000, hargaKarton: 286000 }
    ]
  },
  {
    kode: "ALC-012",
    nama: "Saus Cabai Manis",
    kategori: "Sambal & Saus Pedas",
    izin: "P-IRT",
    varian: [
      { pack: "250ml Botol", hargaSatuan: 16000, hargaKarton: 176000 },
      { pack: "500ml Botol", hargaSatuan: 29000, hargaKarton: 319000 }
    ]
  }
];

export const categories = ["Semua", "Sauce", "Bumbu & Seasoning", "Sambal & Saus Pedas"];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const generateWhatsAppLink = (product?: Product): string => {
  const phone = "6281249186623";
  let message = "";
  
  if (product) {
    message = `Halo Admin ALCHO, saya tertarik untuk memesan:\n\n*${product.nama}*\nKode: ${product.kode}\n\nMohon informasi lebih lanjut. Terima kasih!`;
  } else {
    message = "Halo Admin ALCHO, saya tertarik dengan produk bumbu dan saus Anda. Mohon informasi lebih lanjut. Terima kasih!";
  }
  
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

export const generatePricelistCSV = (): string => {
  let csv = "Kode,Nama Produk,Kategori,Status Izin,Kemasan,Harga Satuan,Harga Karton\n";
  
  products.forEach(product => {
    product.varian.forEach(v => {
      csv += `${product.kode},"${product.nama}",${product.kategori},${product.izin},"${v.pack}",${v.hargaSatuan},${v.hargaKarton}\n`;
    });
  });
  
  return csv;
};
