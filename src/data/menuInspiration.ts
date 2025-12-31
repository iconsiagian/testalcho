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
  {
    id: "mie-goreng-seafood",
    name: "Mie Goreng Seafood",
    description: "Mie goreng dengan topping seafood segar dan bumbu yang pas, menu andalan untuk cloud kitchen.",
    image: nasiGorengImg,
    category: "local",
    alchoProduct: "Bumbu Nasi Goreng ALCHO",
    useCase: "Cloud Kitchen",
    servings: "10 porsi",
    prepTime: "20 menit",
    cookTime: "15 menit",
    ingredients: [
      { item: "Bumbu Nasi Goreng ALCHO", amount: "100 gram", isAlchoProduct: true },
      { item: "Mie telur", amount: "1 kg" },
      { item: "Udang kupas", amount: "300 gram" },
      { item: "Cumi potong", amount: "200 gram" },
      { item: "Sawi hijau", amount: "200 gram" },
      { item: "Telur ayam", amount: "5 butir" },
      { item: "Kecap manis", amount: "50 ml" },
      { item: "Bawang putih cincang", amount: "30 gram" },
      { item: "Minyak wijen", amount: "20 ml" },
    ],
    steps: [
      { step: 1, instruction: "Rebus mie hingga al dente, tiriskan dan beri sedikit minyak." },
      { step: 2, instruction: "Panaskan wajan, tumis bawang putih hingga harum." },
      { step: 3, instruction: "Masukkan udang dan cumi, masak hingga berubah warna." },
      { step: 4, instruction: "Tambahkan Bumbu Nasi Goreng ALCHO, aduk rata." },
      { step: 5, instruction: "Masukkan mie dan sawi, aduk dengan api besar." },
      { step: 6, instruction: "Buat lubang di tengah, masukkan telur dan orak-arik." },
      { step: 7, instruction: "Tambahkan kecap manis dan minyak wijen, aduk rata." },
      { step: 8, instruction: "Sajikan dengan taburan bawang goreng." },
    ],
    businessNotes: [
      { title: "Prep Seafood", content: "Bersihkan dan simpan seafood dalam freezer terpisah untuk kualitas optimal." },
      { title: "Wok Hei", content: "Gunakan api besar dan wajan panas untuk mendapatkan aroma smoky yang khas." },
      { title: "Porsi Standar", content: "Timbang mie 100gr per porsi untuk konsistensi biaya dan penyajian." },
    ],
  },
  {
    id: "ayam-teriyaki-rice-bowl",
    name: "Ayam Teriyaki Rice Bowl",
    description: "Rice bowl modern dengan ayam teriyaki yang manis gurih, sempurna untuk delivery dan takeaway.",
    image: ayamBbqImg,
    category: "international",
    alchoProduct: "Saus Teriyaki ALCHO",
    useCase: "Cloud Kitchen",
    servings: "10 porsi",
    prepTime: "15 menit",
    cookTime: "20 menit",
    ingredients: [
      { item: "Saus Teriyaki ALCHO", amount: "250 gram", isAlchoProduct: true },
      { item: "Paha ayam fillet", amount: "1.5 kg" },
      { item: "Nasi putih hangat", amount: "1.5 kg" },
      { item: "Brokoli rebus", amount: "300 gram" },
      { item: "Wortel iris tipis", amount: "200 gram" },
      { item: "Wijen sangrai", amount: "30 gram" },
      { item: "Daun bawang iris", amount: "50 gram" },
      { item: "Minyak goreng", amount: "50 ml" },
    ],
    steps: [
      { step: 1, instruction: "Potong paha ayam menjadi ukuran bite size." },
      { step: 2, instruction: "Panaskan minyak, goreng ayam hingga kecokelatan." },
      { step: 3, instruction: "Tuang Saus Teriyaki ALCHO, masak hingga saus mengental." },
      { step: 4, instruction: "Pastikan ayam terbalut saus dengan sempurna." },
      { step: 5, instruction: "Siapkan bowl dengan nasi hangat di dasar." },
      { step: 6, instruction: "Tata ayam teriyaki, brokoli, dan wortel di atas nasi." },
      { step: 7, instruction: "Taburi wijen dan daun bawang sebagai finishing." },
    ],
    businessNotes: [
      { title: "Bowl Assembly", content: "Buat SOP assembly yang jelas dengan foto untuk konsistensi tampilan." },
      { title: "Batch Cooking", content: "Masak ayam teriyaki dalam batch besar, simpan hangat di bain marie." },
      { title: "Packaging", content: "Gunakan bowl tahan panas dengan tutup untuk menjaga kualitas saat delivery." },
    ],
  },
  {
    id: "capcay-sayuran",
    name: "Capcay Sayuran Segar",
    description: "Tumis sayuran dengan saus tiram yang gurih, menu sehat favorit untuk katering dan restoran.",
    image: nasiCampurImg,
    category: "international",
    alchoProduct: "Saus Tiram ALCHO",
    useCase: "Katering",
    servings: "15 porsi",
    prepTime: "20 menit",
    cookTime: "15 menit",
    ingredients: [
      { item: "Saus Tiram ALCHO", amount: "150 gram", isAlchoProduct: true },
      { item: "Wortel iris", amount: "300 gram" },
      { item: "Brokoli", amount: "300 gram" },
      { item: "Baby corn", amount: "200 gram" },
      { item: "Jamur shitake", amount: "200 gram" },
      { item: "Sawi putih", amount: "300 gram" },
      { item: "Bawang putih cincang", amount: "30 gram" },
      { item: "Kaldu ayam", amount: "200 ml" },
      { item: "Tepung maizena", amount: "30 gram" },
    ],
    steps: [
      { step: 1, instruction: "Siapkan semua sayuran, potong ukuran seragam." },
      { step: 2, instruction: "Tumis bawang putih hingga harum dengan api besar." },
      { step: 3, instruction: "Masukkan wortel dan baby corn terlebih dahulu (sayur keras)." },
      { step: 4, instruction: "Tambahkan brokoli dan jamur, tumis 2 menit." },
      { step: 5, instruction: "Tuang Saus Tiram ALCHO dan kaldu, aduk rata." },
      { step: 6, instruction: "Masukkan sawi putih, masak hingga layu." },
      { step: 7, instruction: "Kentalkan dengan larutan maizena, sajikan segera." },
    ],
    businessNotes: [
      { title: "Mise en Place", content: "Potong semua sayuran pagi hari dan simpan dalam wadah terpisah siap masak." },
      { title: "Kesegaran", content: "Masak capcay mendekati waktu saji untuk menjaga warna dan tekstur sayuran." },
      { title: "Protein Tambahan", content: "Dapat ditambah udang atau ayam untuk upgrade menu dengan margin lebih tinggi." },
    ],
  },
  {
    id: "sambal-goreng-kentang-ati",
    name: "Sambal Goreng Kentang Ati",
    description: "Lauk prasmanan klasik dengan bumbu yang meresap sempurna, favorit di setiap hajatan.",
    image: rendangImg,
    category: "local",
    alchoProduct: "Sambal Bajak ALCHO",
    useCase: "Katering",
    servings: "20 porsi",
    prepTime: "30 menit",
    cookTime: "30 menit",
    ingredients: [
      { item: "Sambal Bajak ALCHO", amount: "200 gram", isAlchoProduct: true },
      { item: "Kentang potong dadu", amount: "1 kg" },
      { item: "Ati ampela ayam", amount: "500 gram" },
      { item: "Santan kental", amount: "400 ml" },
      { item: "Daun salam", amount: "4 lembar" },
      { item: "Lengkuas geprek", amount: "3 cm" },
      { item: "Gula merah", amount: "50 gram" },
      { item: "Minyak untuk menggoreng", amount: "secukupnya" },
    ],
    steps: [
      { step: 1, instruction: "Goreng kentang hingga kuning kecokelatan, tiriskan." },
      { step: 2, instruction: "Rebus ati ampela hingga matang, potong-potong." },
      { step: 3, instruction: "Tumis Sambal Bajak ALCHO dengan daun salam dan lengkuas." },
      { step: 4, instruction: "Masukkan ati ampela, aduk hingga bumbu meresap." },
      { step: 5, instruction: "Tuang santan, masak dengan api sedang." },
      { step: 6, instruction: "Tambahkan gula merah, aduk hingga larut." },
      { step: 7, instruction: "Masukkan kentang goreng, aduk perlahan agar tidak hancur." },
      { step: 8, instruction: "Masak hingga santan meresap dan sedikit mengering." },
    ],
    businessNotes: [
      { title: "Prep Terpisah", content: "Goreng kentang dan rebus ati di malam sebelumnya untuk efisiensi waktu event." },
      { title: "Tahan Lama", content: "Menu ini tahan 2-3 jam di suhu ruang, ideal untuk prasmanan lama." },
      { title: "Porsi Event", content: "Untuk 100 tamu, kalikan resep 5x dan masak dalam 2 batch terpisah." },
    ],
  },
  {
    id: "ayam-rica-rica",
    name: "Ayam Rica-Rica Manado",
    description: "Ayam dengan sambal rica yang pedas dan aromatik, signature dish untuk menu premium.",
    image: ayamBbqImg,
    category: "local",
    alchoProduct: "Sambal Pedas ALCHO",
    useCase: "Restoran",
    servings: "10 porsi",
    prepTime: "20 menit",
    cookTime: "35 menit",
    ingredients: [
      { item: "Sambal Pedas ALCHO", amount: "200 gram", isAlchoProduct: true },
      { item: "Ayam potong 10", amount: "2 kg" },
      { item: "Tomat merah", amount: "4 buah" },
      { item: "Daun kemangi", amount: "100 gram" },
      { item: "Serai geprek", amount: "3 batang" },
      { item: "Daun jeruk", amount: "5 lembar" },
      { item: "Bawang merah iris", amount: "100 gram" },
      { item: "Air jeruk nipis", amount: "50 ml" },
      { item: "Minyak goreng", amount: "100 ml" },
    ],
    steps: [
      { step: 1, instruction: "Goreng ayam setengah matang hingga kecokelatan, tiriskan." },
      { step: 2, instruction: "Tumis bawang merah hingga layu dan harum." },
      { step: 3, instruction: "Masukkan Sambal Pedas ALCHO, serai, dan daun jeruk." },
      { step: 4, instruction: "Tambahkan tomat potong, masak hingga tomat lunak." },
      { step: 5, instruction: "Masukkan ayam goreng, aduk hingga bumbu meresap." },
      { step: 6, instruction: "Tambahkan sedikit air jika terlalu kering, masak 10 menit." },
      { step: 7, instruction: "Masukkan kemangi dan air jeruk nipis, aduk sebentar." },
      { step: 8, instruction: "Angkat dan sajikan dengan nasi putih hangat." },
    ],
    businessNotes: [
      { title: "Level Pedas", content: "Sesuaikan jumlah sambal berdasarkan preferensi pelanggan lokal." },
      { title: "Plating Premium", content: "Sajikan di hot plate untuk efek sizzling yang menambah experience." },
      { title: "Kemangi Segar", content: "Tambahkan kemangi saat akhir agar aroma tetap segar dan tidak layu." },
    ],
  },
  {
    id: "spaghetti-aglio-olio",
    name: "Spaghetti Aglio Olio Sambal",
    description: "Fusion Italia-Indonesia dengan sentuhan sambal yang unik, menu signature untuk restoran modern.",
    image: nasiCampurImg,
    category: "international",
    alchoProduct: "Sambal Matah ALCHO",
    useCase: "Restoran",
    servings: "10 porsi",
    prepTime: "15 menit",
    cookTime: "20 menit",
    ingredients: [
      { item: "Sambal Matah ALCHO", amount: "150 gram", isAlchoProduct: true },
      { item: "Spaghetti", amount: "1 kg" },
      { item: "Minyak zaitun extra virgin", amount: "150 ml" },
      { item: "Bawang putih iris tipis", amount: "60 gram" },
      { item: "Cabai kering", amount: "20 gram" },
      { item: "Udang ukuran besar", amount: "500 gram" },
      { item: "Peterseli cincang", amount: "50 gram" },
      { item: "Garam & lada", amount: "secukupnya" },
    ],
    steps: [
      { step: 1, instruction: "Rebus spaghetti al dente, sisakan 100ml air rebusan." },
      { step: 2, instruction: "Panaskan minyak zaitun dengan api kecil." },
      { step: 3, instruction: "Tumis bawang putih hingga keemasan, jangan sampai gosong." },
      { step: 4, instruction: "Tambahkan cabai kering dan udang, masak hingga udang matang." },
      { step: 5, instruction: "Masukkan spaghetti dan sedikit air rebusan." },
      { step: 6, instruction: "Aduk dengan api sedang hingga tercampur rata." },
      { step: 7, instruction: "Matikan api, tambahkan Sambal Matah ALCHO dan peterseli." },
      { step: 8, instruction: "Aduk rata dan sajikan segera dengan taburan sambal matah di atas." },
    ],
    businessNotes: [
      { title: "Fusion Appeal", content: "Menu fusion menarik pelanggan yang ingin coba sesuatu yang berbeda." },
      { title: "Made to Order", content: "Pasta harus disajikan segera setelah dimasak untuk kualitas optimal." },
      { title: "Upsell Protein", content: "Tawarkan upgrade ke salmon atau scallop untuk margin lebih tinggi." },
    ],
  },
];

export const getCategoryLabel = (category: CuisineCategory): string => {
  return category === "local" ? "Lokal" : "Internasional";
};
