import { identity } from "../data/content";

const stats = [
  {
    value: "2",
    unit: "Tahun",
    label: "Pengalaman Web Development & Backend Architecture",
    icon: "history_edu",
  },
  {
    value: "6",
    unit: "Proyek",
    label: "Aplikasi Web, Sistem Informasi & Analisis Data Live",
    icon: "deployed_code",
  },
  {
    value: "4+",
    unit: "Klien",
    label: "Klien Real & Sistem Terpasang Siap Produksi",
    icon: "groups",
  },
] as const;

export default function About() {
  return (
    <section
      id="tentang"
      className="relative w-full border-y border-secondary/30 bg-surface-container-lowest/80 px-6 py-16 lg:px-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-code-md font-medium tracking-widest text-primary">
            [ 01. PROFIL ]
          </span>
          <h2 className="text-headline-lg text-on-surface">
            Membangun Fondasi Web yang Tangguh dan Efisien
          </h2>
          <p className="max-w-2xl text-body-md text-on-surface-variant">
            {identity.bio}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Left: Narrative Bio & Philosophy Box */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-secondary/40 bg-surface-container/70 p-6 shadow-lg backdrop-blur-md sm:p-8">
              <div className="flex items-center gap-3 border-b border-secondary/30 pb-4">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: "24px" }}>
                  terminal
                </span>
                <h3 className="font-display text-headline-sm text-on-surface">
                  Arsitektur &amp; Etos Rekayasa
                </h3>
              </div>

              <div className="flex flex-col gap-3 font-sans text-body-md leading-relaxed text-on-surface-variant">
                <p>
                  Selama masa perkuliahan dan proyek freelance, saya memiliki keterlibatan aktif dalam membangun sistem untuk klien nyata:
                </p>
                <ul className="list-inside list-disc space-y-1.5 pl-2 text-on-surface-variant">
                  <li>
                    Sistem informasi penyewaan peralatan tari (full-lifecycle hingga instalasi sisi klien)
                  </li>
                  <li>
                    Sistem informasi rental kendaraan (fitur export PDF &amp; pengelolaan data armada)
                  </li>
                  <li>
                    Sistem rekomendasi produk &amp; data mining berbasis algoritma Apriori
                  </li>
                </ul>
                <p>
                  Sistem-sistem tersebut dibangun menggunakan stack{" "}
                  <span className="font-medium text-primary">
                    PHP (Native &amp; CodeIgniter) dan MySQL
                  </span>
                  .
                </p>
              </div>

              {/* Code Snippet Philosophy Box */}
              <div className="mt-2 flex flex-col gap-1 rounded-xl border border-secondary/40 bg-surface-container-lowest p-4 font-mono text-[13px] leading-relaxed text-on-surface-variant">
                <div className="pb-1 font-mono text-[11px] uppercase tracking-wider text-outline">
                  // Philosophy • Clean Architecture
                </div>
                <div>
                  <span className="text-tertiary">class</span>{" "}
                  <span className="text-primary">EngineeringPrinciple</span> {"{"}
                </div>
                <div className="pl-4">
                  <span className="text-tertiary">public readonly</span>{" "}
                  <span className="text-on-surface">bool</span>{" "}
                  <span className="text-primary">$prioritizeSecurity</span> ={" "}
                  <span className="text-tertiary">true</span>;
                </div>
                <div className="pl-4">
                  <span className="text-tertiary">public readonly</span>{" "}
                  <span className="text-on-surface">string</span>{" "}
                  <span className="text-primary">$dbIntegrity</span> ={" "}
                  <span className="text-tertiary">"Strict 3NF + Indexing"</span>;
                </div>
                <div className="pl-4">
                  <span className="text-tertiary">public function</span>{" "}
                  <span className="text-primary">deliverSolution</span>():{" "}
                  <span className="text-on-surface">HighPerformanceSystem</span>;
                </div>
                <div>{"}"}</div>
              </div>
            </div>
          </div>

          {/* Right: 3 Stat Cards */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group flex items-center gap-5 rounded-2xl border border-secondary/40 bg-surface-container/70 p-6 shadow-md transition-colors hover:border-primary/40"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-secondary/60 bg-secondary/40 text-primary">
                  <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>
                    {stat.icon}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1.5">
                    <span className="tnum font-display text-headline-lg font-bold text-on-surface">
                      {stat.value}
                    </span>
                    <span className="font-display text-headline-sm font-semibold text-primary">
                      {stat.unit}
                    </span>
                  </div>
                  <span className="text-body-sm text-on-surface-variant">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
