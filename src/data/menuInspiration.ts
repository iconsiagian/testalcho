import nasiGorengImg from "@/assets/menu/nasi-goreng.jpg";
import rendangImg from "@/assets/menu/rendang.jpg";
import sotoAyamImg from "@/assets/menu/soto-ayam.jpg";
import ayamBbqImg from "@/assets/menu/ayam-bbq.jpg";
import gulaiKambingImg from "@/assets/menu/gulai-kambing.jpg";
import nasiCampurImg from "@/assets/menu/nasi-campur.jpg";

export type CuisineCategory = "local" | "international";
export type UseCaseType = "Cloud Kitchen" | "Restoran" | "Katering";

export interface Ingredient {
  item: string;
  amount: string;
  isAlchoProduct?: boolean;
}

export interface RecipeStep {
  step: number;
  instruction: string;
}

export interface BusinessNote {
  title: string;
  content: string;
}

export interface MenuRecipe {
  id: string;
  name: string;
  description: string;
  image: string;
  category: CuisineCategory;
  alchoProduct: string;
  useCase: UseCaseType;
  servings: string;
  prepTime: string;
  cookTime: string;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  businessNotes: BusinessNote[];
}

export const menuRecipes: MenuRecipe[] = [
  {
    id: "nasi-goreng-spesial",
    name: "Nasi Goreng Spesial",
    description: "Hidangan nasi goreng dengan bumbu khas yang konsisten di setiap porsi, ideal untuk operasional dapur dengan volume tinggi.",
    image: nasiGorengImg,
    category: "local",
    alchoProduct: "Bumbu Nasi Goreng ALCHO",
    useCase: "Cloud Kitchen",
    servings: "10 porsi",
    prepTime: "15 menit",
    cookTime: "20 menit",
    ingredients: [
      { item: "Bumbu Nasi Goreng ALCHO", amount: "100 gram", isAlchoProduct: true },
      { item: "Nasi putih dingin", amount: "1.5 kg" },
      { item: "Telur ayam", amount: "10 butir" },
      { item: "Ayam suwir matang", amount: "300 gram" },
      { item: "Kecap manis", amount: "50 ml" },
      { item: "Minyak goreng", amount: "100 ml" },
      { item: "Daun bawang iris", amount: "50 gram" },
      { item: "Bawang merah goreng", amount: "50 gram" },
    ],
    steps: [
      { step: 1, instruction: "Panaskan minyak dalam wajan besar dengan api sedang-tinggi." },
      { step: 2, instruction: "Masukkan Bumbu Nasi Goreng ALCHO, tumis hingga harum (sekitar 1 menit)." },
      { step: 3, instruction: "Sisihkan bumbu ke pinggir wajan, masukkan telur dan orak-arik." },
      { step: 4, instruction: "Masukkan nasi dingin, aduk rata dengan bumbu dan telur." },
      { step: 5, instruction: "Tambahkan ayam suwir dan kecap manis, aduk hingga merata." },
      { step: 6, instruction: "Masak hingga nasi terasa kering dan bumbu meresap (3-5 menit)." },
      { step: 7, instruction: "Angkat, taburi daun bawang dan bawang merah goreng." },
    ],
    businessNotes: [
      { title: "Skalabilitas", content: "Resep ini dapat dengan mudah dilipatgandakan untuk batch cooking. Untuk 50 porsi, kalikan semua bahan dengan 5." },
      { title: "Konsistensi Rasa", content: "Gunakan takaran Bumbu ALCHO yang sama per porsi untuk memastikan rasa yang konsisten setiap saat." },
      { title: "Efisiensi Waktu", content: "Siapkan nasi sehari sebelumnya dan simpan di kulkas untuk hasil terbaik dan efisiensi operasional." },
    ],
  },
  {
    id: "rendang-daging-sapi",
    name: "Rendang Daging Sapi",
    description: "Menu andalan dengan cita rasa autentik Padang yang terjaga kualitasnya, cocok untuk menu premium restoran.",
    image: rendangImg,
    category: "local",
    alchoProduct: "Bumbu Rendang ALCHO",
    useCase: "Restoran",
    servings: "15 porsi",
    prepTime: "20 menit",
    cookTime: "3 jam",
    ingredients: [
      { item: "Bumbu Rendang ALCHO", amount: "200 gram", isAlchoProduct: true },
      { item: "Daging sapi has dalam", amount: "2 kg" },
      { item: "Santan kental", amount: "1 liter" },
      { item: "Santan encer", amount: "500 ml" },
      { item: "Daun jeruk", amount: "5 lembar" },
      { item: "Daun kunyit", amount: "2 lembar" },
      { item: "Serai, geprek", amount: "3 batang" },
      { item: "Minyak goreng", amount: "100 ml" },
    ],
    steps: [
      { step: 1, instruction: "Potong daging sapi menjadi ukuran 4x4 cm." },
      { step: 2, instruction: "Panaskan minyak, tumis Bumbu Rendang ALCHO hingga harum." },
      { step: 3, instruction: "Masukkan daging, aduk hingga berubah warna." },
      { step: 4, instruction: "Tambahkan serai, daun jeruk, dan daun kunyit." },
      { step: 5, instruction: "Tuang santan encer, masak dengan api sedang hingga mendidih." },
      { step: 6, instruction: "Kecilkan api, masak selama 2 jam sambil sesekali diaduk." },
      { step: 7, instruction: "Tambahkan santan kental, lanjutkan memasak hingga kuah mengering dan berminyak." },
      { step: 8, instruction: "Aduk terus hingga daging berwarna cokelat kehitaman dan bumbu meresap sempurna." },
    ],
    businessNotes: [
      { title: "Masa Simpan", content: "Rendang dapat disimpan di freezer hingga 1 bulan. Panaskan ulang dengan api kecil sebelum disajikan." },
      { title: "Batch Cooking", content: "Masak dalam jumlah besar sekaligus untuk efisiensi bahan bakar. Rendang justru lebih enak setelah didiamkan." },
      { title: "Margin Profit", content: "Dengan Bumbu ALCHO, biaya bumbu per porsi lebih terkontrol dibanding racikan manual." },
    ],
  },
  {
    id: "soto-ayam-komplit",
    name: "Soto Ayam Komplit",
    description: "Kuah bening beraroma rempah, siap saji dalam volume besar untuk kebutuhan katering dan prasmanan.",
    image: sotoAyamImg,
    category: "local",
    alchoProduct: "Bumbu Soto ALCHO",
    useCase: "Katering",
    servings: "20 porsi",
    prepTime: "30 menit",
    cookTime: "1 jam",
    ingredients: [
      { item: "Bumbu Soto ALCHO", amount: "150 gram", isAlchoProduct: true },
      { item: "Ayam kampung", amount: "2 kg" },
      { item: "Air kaldu", amount: "4 liter" },
      { item: "Soun, rendam", amount: "200 gram" },
      { item: "Tauge pendek", amount: "300 gram" },
      { item: "Telur rebus", amount: "10 butir" },
      { item: "Kentang goreng", amount: "500 gram" },
      { item: "Daun seledri & bawang goreng", amount: "secukupnya" },
    ],
    steps: [
      { step: 1, instruction: "Rebus ayam dalam air hingga matang, angkat dan suwir dagingnya." },
      { step: 2, instruction: "Saring kaldu ayam, sisihkan." },
      { step: 3, instruction: "Tumis Bumbu Soto ALCHO dengan sedikit minyak hingga harum." },
      { step: 4, instruction: "Masukkan bumbu tumis ke dalam kaldu, didihkan." },
      { step: 5, instruction: "Koreksi rasa, tambahkan garam jika diperlukan." },
      { step: 6, instruction: "Siapkan mangkuk dengan soun, tauge, ayam suwir, dan telur." },
      { step: 7, instruction: "Siram dengan kuah panas, taburi seledri dan bawang goreng." },
    ],
    businessNotes: [
      { title: "Mise en Place", content: "Siapkan semua pelengkap dalam wadah terpisah untuk mempercepat penyajian saat event." },
      { title: "Kuah Terpisah", content: "Untuk katering, kirim kuah dalam termos terpisah agar tetap panas saat disajikan." },
      { title: "Porsi Fleksibel", content: "Soto mudah disesuaikan porsinya tanpa mengubah rasa karena bumbu sudah terstandar." },
    ],
  },
  {
    id: "ayam-bakar-bbq",
    name: "Ayam Bakar BBQ",
    description: "Ayam panggang dengan olesan saus BBQ yang meresap sempurna, favorit untuk menu grab & go.",
    image: ayamBbqImg,
    category: "international",
    alchoProduct: "Saus BBQ ALCHO",
    useCase: "Cloud Kitchen",
    servings: "10 porsi",
    prepTime: "15 menit + marinasi",
    cookTime: "25 menit",
    ingredients: [
      { item: "Saus BBQ ALCHO", amount: "300 gram", isAlchoProduct: true },
      { item: "Ayam potong 8", amount: "2 kg" },
      { item: "Madu", amount: "50 ml" },
      { item: "Kecap asin", amount: "30 ml" },
      { item: "Bawang putih bubuk", amount: "1 sdm" },
      { item: "Minyak zaitun", amount: "50 ml" },
      { item: "Garam & lada", amount: "secukupnya" },
    ],
    steps: [
      { step: 1, instruction: "Campurkan 200 gram Saus BBQ ALCHO dengan madu, kecap, bawang putih, dan minyak zaitun." },
      { step: 2, instruction: "Marinasi ayam dengan campuran bumbu minimal 2 jam (idealnya semalaman)." },
      { step: 3, instruction: "Panaskan grill atau oven pada suhu 200°C." },
      { step: 4, instruction: "Panggang ayam selama 20-25 menit, balik sesekali." },
      { step: 5, instruction: "Olesi dengan sisa Saus BBQ ALCHO di 5 menit terakhir." },
      { step: 6, instruction: "Angkat dan diamkan 3 menit sebelum disajikan." },
    ],
    businessNotes: [
      { title: "Prep Malam Sebelumnya", content: "Marinasi ayam semalaman untuk memaksimalkan penyerapan rasa dan efisiensi waktu pagi hari." },
      { title: "Batch Grilling", content: "Gunakan grill profesional untuk memanggang 20 potong sekaligus saat peak hours." },
      { title: "Packaging", content: "Ideal untuk kemasan takeaway karena saus BBQ menjaga kelembaban ayam lebih lama." },
    ],
  },
  {
    id: "gulai-kambing",
    name: "Gulai Kambing",
    description: "Hidangan gulai dengan santan dan rempah yang seimbang untuk prasmanan acara besar.",
    image: gulaiKambingImg,
    category: "local",
    alchoProduct: "Bumbu Gulai ALCHO",
    useCase: "Katering",
    servings: "20 porsi",
    prepTime: "25 menit",
    cookTime: "2 jam",
    ingredients: [
      { item: "Bumbu Gulai ALCHO", amount: "250 gram", isAlchoProduct: true },
      { item: "Daging kambing", amount: "2.5 kg" },
      { item: "Santan kental", amount: "1.5 liter" },
      { item: "Air", amount: "1 liter" },
      { item: "Kentang potong", amount: "500 gram" },
      { item: "Tomat merah", amount: "4 buah" },
      { item: "Daun kari & serai", amount: "secukupnya" },
      { item: "Minyak goreng", amount: "100 ml" },
    ],
    steps: [
      { step: 1, instruction: "Rebus daging kambing dengan air hingga setengah empuk (45 menit)." },
      { step: 2, instruction: "Tumis Bumbu Gulai ALCHO dengan minyak hingga harum dan berminyak." },
      { step: 3, instruction: "Masukkan daging kambing beserta air rebusannya." },
      { step: 4, instruction: "Tambahkan daun kari, serai, dan tomat potong." },
      { step: 5, instruction: "Tuang santan, masak dengan api sedang selama 1 jam." },
      { step: 6, instruction: "Masukkan kentang, lanjutkan memasak hingga kentang dan daging empuk." },
      { step: 7, instruction: "Koreksi rasa dan sajikan hangat." },
    ],
    businessNotes: [
      { title: "Volume Besar", content: "Gulai sangat cocok untuk masak dalam kuali besar. Semakin banyak, semakin gurih dan efisien." },
      { title: "Standar Rasa", content: "Bumbu Gulai ALCHO memastikan rasa konsisten meski dimasak oleh koki berbeda." },
      { title: "Hot Holding", content: "Simpan dalam chafing dish dengan api kecil untuk menjaga suhu optimal saat prasmanan." },
    ],
  },
  {
    id: "nasi-campur-bali",
    name: "Nasi Campur Bali",
    description: "Set menu dengan sambal matah autentik sebagai pelengkap utama, signature dish untuk restoran.",
    image: nasiCampurImg,
    category: "local",
    alchoProduct: "Sambal Matah ALCHO",
    useCase: "Restoran",
    servings: "10 porsi",
    prepTime: "30 menit",
    cookTime: "45 menit",
    ingredients: [
      { item: "Sambal Matah ALCHO", amount: "200 gram", isAlchoProduct: true },
      { item: "Nasi putih hangat", amount: "1 kg" },
      { item: "Ayam suwir bumbu bali", amount: "400 gram" },
      { item: "Sate lilit", amount: "10 tusuk" },
      { item: "Lawar sayur", amount: "300 gram" },
      { item: "Telur dadar iris", amount: "5 butir" },
      { item: "Kacang tanah goreng", amount: "100 gram" },
      { item: "Kerupuk", amount: "secukupnya" },
    ],
    steps: [
      { step: 1, instruction: "Siapkan semua komponen lauk secara terpisah." },
      { step: 2, instruction: "Tata nasi putih di atas piring." },
      { step: 3, instruction: "Susun ayam suwir, sate lilit, lawar, dan telur di sekeliling nasi." },
      { step: 4, instruction: "Tambahkan porsi Sambal Matah ALCHO di atas nasi atau dalam wadah terpisah." },
      { step: 5, instruction: "Taburi kacang goreng dan sajikan dengan kerupuk." },
    ],
    businessNotes: [
      { title: "Plating Standar", content: "Buat panduan foto plating untuk memastikan presentasi konsisten antar shift." },
      { title: "Prep Station", content: "Siapkan semua komponen dalam bain marie untuk mempercepat assembly saat order masuk." },
      { title: "Sambal Siap Pakai", content: "Sambal Matah ALCHO siap saji, mengurangi waktu prep hingga 30 menit per batch." },
    ],
  },
];

export const getCategoryLabel = (category: CuisineCategory): string => {
  return category === "local" ? "Lokal" : "Internasional";
};
