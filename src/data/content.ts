/**
 * Visitor-facing copy — sourced from docs/CONTENT.md.
 * Do not invent claims beyond what CONTENT.md and the project docs state.
 */

export const identity = {
  name: "Bragi Arya Dwi Saputra",
  roles: [
    "Junior Web Developer",
    "PHP & CodeIgniter Developer",
    "Information Systems Student",
    "Freelance Developer",
  ],
  cta: "Lihat Proyek Saya",
  bio: "Mahasiswa Sistem Informasi UNBAJA yang membangun solusi digital nyata, dari sistem kasir restoran sampai analisis data mining apotek. 6 proyek live, semua dibangun dari nol dengan PHP, CodeIgniter, dan MySQL.",
  stats: [
    { value: "6", label: "Proyek Selesai" },
    { value: "4+", label: "Klien Real" },
    { value: "2", label: "Tahun Pengalaman Web Development" },
  ],
  contact: {
    github: {
      label: "GitHub",
      handle: "github.com/bragiarya",
      url: "https://github.com/bragiarya",
    },
    linkedin: {
      label: "LinkedIn",
      handle: "in/bragi-arya-dwi-saputra",
      url: "https://linkedin.com/in/bragi-arya-dwi-saputra",
    },
    email: {
      label: "Email",
      handle: "bragi.aryadwi@gmail.com",
      url: "mailto:bragi.aryadwi@gmail.com",
    },
  },
  globeCredit:
    '3D Globe: "Holographic Earth | Sci-Fi Grid Globe" AdityaDas5501, Sketchfab (CC Attribution)',
} as const;

export const navLinks = [
  { href: "#tentang", label: "Tentang" },
  { href: "#keahlian", label: "Keahlian" },
  { href: "#proyek", label: "Proyek" },
  { href: "#kontak", label: "Kontak" },
] as const;
