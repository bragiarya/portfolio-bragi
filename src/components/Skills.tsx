import PhysicsSkillBalls from "./PhysicsSkillBalls";

export default function Skills() {
  return (
    <section id="keahlian" className="relative px-6 py-16 lg:px-12 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-code-md font-medium tracking-widest text-primary">
            [ 02. KEAHLIAN TEKNIS ]
          </span>
          <h2 className="text-headline-lg text-on-surface">Keahlian</h2>
          <p className="max-w-2xl text-body-md text-on-surface-variant">
            Tujuh teknologi inti yang saya gunakan membangun sistem nyata. Geser
            kursor di antara bola — setiap teknologi menghindar dan kembali ke
            posisinya.
          </p>
        </div>

        <div className="relative flex h-[62vh] min-h-[460px] w-full flex-col overflow-hidden rounded-2xl border border-secondary/40 bg-surface-container-low/80 p-6 shadow-xl backdrop-blur-md lg:p-8">
          <div className="flex items-center justify-between border-b border-secondary/30 pb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: "20px" }}>
                bubble_chart
              </span>
              <span className="font-display text-headline-sm text-on-surface">
                Interaktif: Physics Core Orb Ecosystem
              </span>
            </div>
            <span className="hidden font-mono text-code-sm text-primary sm:inline-block">
              Geser kursor untuk menggerakkan bola
            </span>
          </div>

          <div className="relative w-full flex-1 min-h-0">
            <PhysicsSkillBalls />
          </div>
        </div>
      </div>
    </section>
  );
}
