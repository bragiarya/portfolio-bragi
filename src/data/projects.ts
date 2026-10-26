/**
 * Six shipped projects — Problem / Method / Result condensed from
 * docs/DOKUMENTASI SEMUA PROJECT (docs/project-docs-extract.txt).
 * No invented metrics. Repository handles reflect the documented yt-bads org.
 */

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  repoLabel: string;
  repoUrl: string;
  image: string;
  problem: string;
  method: string;
  result: string;
  tech: string[];
};

export const projects: Project[] = [
  {
    id: "petshop-apriori",
    title: "Petshop Apriori",
    subtitle: "Manajemen Petshop + Market Basket Analysis",
    repoLabel: "yt-bads/petshop_apriori",
    repoUrl: "https://github.com/yt-bads/petshop_apriori",
    image: "/images/projects/PETSHOP%20APRIORI.png",
    problem:
      "Pemilik petshop kesulitan mengetahui produk mana yang sering dibeli bersamaan. Penempatan rak dan strategi bundling dilakukan intuitif tanpa dasar data transaksi.",
    method:
      "Algoritma Apriori (Market Basket Analysis) diimplementasikan native untuk menemukan frequent itemset dan association rules dari transaksi historis, dengan parameter min. support dan min. confidence yang dapat dikonfigurasi pengguna.",
    result:
      "Modul kasir lengkap, import transaksi CSV untuk analisis retroaktif, output tabel frequent itemset + aturan asosiasi dengan nilai support & confidence, serta export aturan ke Excel.",
    tech: ["PHP 8.2", "CodeIgniter 4", "MySQL", "PhpSpreadsheet", "Composer"],
  },
  {
    id: "apriori-asia-farma",
    title: "Apriori Asia Farma",
    subtitle: "Data Mining Apotek — Association Rule Analysis",
    repoLabel: "yt-bads/apriori-asiafarma",
    repoUrl: "https://github.com/yt-bads/apriori-asiafarma",
    image: "/images/projects/asiafarma-apriori.png",
    problem:
      "Apotek Asia Farma tidak memiliki sistem analitik untuk memahami pola pembelian obat. Penempatan produk, paket promo, dan keputusan inventoris diambil tanpa dasar asosiasi data.",
    method:
      "Apriori diimplementasikan murni dalam PHP: representasi transaksi, candidate generation (Ck), perhitungan support & filtering (Lk), pembentukan association rules, lalu perhitungan confidence dan lift ratio untuk memvalidasi kekuatan aturan.",
    result:
      "Output frequent itemset & association rules lengkap dengan Support, Confidence, dan Lift; histori sesi analisis tersimpan dan dapat dibandingkan lintas periode; laporan ekspor Excel dan PDF.",
    tech: ["PHP 8", "CodeIgniter 4", "MySQL", "PhpSpreadsheet", "Dompdf"],
  },
  {
    id: "penyewaan-peralatan-tari",
    title: "Penyewaan Peralatan Tari",
    subtitle: "Sistem Manajemen Penyewaan — Sanggar Seni Bedug Yudha",
    repoLabel: "yt-bads/penyewaan-peralatan-tari",
    repoUrl: "https://github.com/yt-bads/penyewaan-peralatan-tari",
    image: "/images/projects/penyewaan-peralatan-tari.png",
    problem:
      "Sanggar mencatat penyewaan peralatan tari secara manual di kertas. Tidak ada pencatatan stok, histori transaksi, dan perhitungan denda yang akurat, serta tidak ada pemisahan tanggung jawab antar pengelola.",
    method:
      "Digitalisasi penuh proses penyewaan dengan Role-Based Access Control (RBAC) untuk memisahkan tanggung jawab: siklus pemesanan → pembayaran → pengelolaan stok → pengembalian → pelaporan.",
    result:
      "Kalkulasi otomatis denda keterlambatan, monitoring status penyewaan terpusat dan real-time, pencatatan histori stok untuk setiap mutasi, serta laporan operasional dalam format PDF.",
    tech: ["PHP 8", "MySQL", "PDO", "Dompdf"],
  },
  {
    id: "car-rental-system",
    title: "Car Rental System",
    subtitle: "Sistem Informasi Manajemen Rental Mobil",
    repoLabel: "yt-bads/car-rental-system",
    repoUrl: "https://github.com/yt-bads/car-rental-system",
    image: "/images/projects/RENTAL%20MOBIL.png",
    problem:
      "Reservasi kendaraan masih dilakukan manual atau via komunikasi langsung, rentan kehilangan data. Tidak ada sistem terstruktur untuk verifikasi pembayaran, pengelolaan armada, dan monitoring transaksi.",
    method:
      "Sistem informasi web dengan RBAC tiga tingkat: Customer (self-service pemesanan & pembayaran), Administrator (validasi transaksi & manajemen armada), dan Direktur (monitoring eksekutif & pelaporan).",
    result:
      "Alur reservasi mandiri oleh pelanggan dengan upload bukti bayar, dashboard eksekutif untuk direktur, pengelolaan armada terpusat oleh administrator, serta laporan transaksi rental terintegrasi dalam PDF.",
    tech: ["PHP", "MySQL", "HTML5 / CSS3 / JS", "mPDF", "Composer"],
  },
  {
    id: "mtm-pos",
    title: "MTM POS & Inventory",
    subtitle: "Point of Sale + Manajemen Inventaris — MTM Steak",
    repoLabel: "yt-bads/mtm_pos",
    repoUrl: "https://github.com/yt-bads/mtm_pos",
    image: "/images/projects/mtm-pos.png",
    problem:
      "Kasir mencatat transaksi dua kali (aplikasi ponsel lalu disalin manual ke buku besar), antrean panjang di meja kasir, dan bahan baku sering habis mendadak karena pengecekan stok dilakukan manual tiap malam.",
    method:
      "POS terintegrasi dengan manajemen inventaris berbasis Recipe Management: E-Menu via QR Code, real-time stock deduction sesuai gramasi resep, perputaran bahan baku FIFO, dan RBAC empat peran (Pelanggan, Kasir, Kitchen, Owner).",
    result:
      "Eliminasi pencatatan ganda kasir, E-Menu QR mengurangi antrean, stok bahan baku terpotong otomatis berbasis resep sehingga tidak ada lagi stockout mendadak, dashboard owner dengan grafik omzet dan alert safety stock, laporan PDF.",
    tech: ["PHP", "CodeIgniter", "MySQL", "QR Code", "RBAC"],
  },
  {
    id: "suaratamu",
    title: "SuaraTamū",
    subtitle: "E-CRM Terintegrasi CSI & IPA — MTM Steak (Skripsi)",
    repoLabel: "yt-bads/suaratamu",
    repoUrl: "https://github.com/yt-bads/suaratamu",
    image: "/images/projects/SUARATAMU.png",
    problem:
      "MTM Steak tidak memiliki sistem terstruktur untuk mengumpulkan dan menganalisis kepuasan pelanggan. Evaluasi layanan dilakukan manual dan subjektif, tanpa dasar data kuantitatif atau prioritas perbaikan.",
    method:
      "Sistem E-CRM mengintegrasikan CSI (Customer Satisfaction Index) untuk mengukur kepuasan menyeluruh dan IPA (Importance-Performance Analysis) yang memetakan atribut layanan ke 4 kuadran Kartesius untuk identifikasi prioritas perbaikan. Kuesioner adaptif membedakan Dine-in vs Online Order.",
    result:
      "Nilai CSI terkomputasi otomatis, diagram Kartesius IPA 4 kuadran otomatis, kuesioner adaptif meningkatkan relevansi data, mekanisme E-Voucher otomatis meningkatkan response rate, dashboard multi-role Admin & Owner.",
    tech: ["PHP", "MySQL", "HTML / CSS / JS", "QR Code", "CSI & IPA"],
  },
];
