import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "../data/content";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 24,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-secondary/30 bg-surface/85 backdrop-blur-md"
          : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 lg:px-12">
        <a
          href="#top"
          onClick={close}
          className="font-display text-headline-sm font-semibold tracking-tight text-on-surface transition-colors hover:text-primary"
        >
          Bragi Arya Dwi Saputra<span className="text-primary">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-label-md text-on-surface-variant transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#kontak"
            className="hidden items-center gap-2 rounded-lg border border-primary/40 bg-primary px-4 py-2 font-mono text-label-sm uppercase tracking-wider font-semibold text-on-primary shadow-[0_0_15px_rgba(104,207,235,0.25)] transition-colors hover:bg-tertiary sm:inline-flex"
          >
            Hubungi Saya
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
              arrow_forward
            </span>
          </a>

          <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-secondary/50 bg-surface-container text-primary md:flex">
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              person
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-secondary/50 bg-surface-container text-on-surface transition-colors hover:text-primary md:hidden"
          >
            <span className="material-symbols-outlined text-[20px]">
              {open ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-secondary/20 bg-surface/95 backdrop-blur-md md:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col px-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={close}
                    className="block border-b border-secondary/10 py-3 font-mono text-label-md text-on-surface-variant transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
