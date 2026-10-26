import { identity, navLinks } from "../data/content";
import { GithubIcon, LinkedinIcon, MailIcon } from "./icons";

const socials = [
  { key: "github", label: "GitHub", href: identity.contact.github.url, Icon: GithubIcon },
  { key: "linkedin", label: "LinkedIn", href: identity.contact.linkedin.url, Icon: LinkedinIcon },
  { key: "email", label: "Email", href: identity.contact.email.url, Icon: MailIcon },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-16 border-t border-secondary/40 bg-surface-container-lowest py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-10 border-b border-secondary/30 pb-12 md:grid-cols-12">
          {/* Brand */}
          <div className="flex flex-col gap-4 md:col-span-5">
            <a href="#top" className="w-fit font-display text-headline-sm font-semibold tracking-tight text-on-surface transition-colors hover:text-primary">
              Bragi Arya Dwi Saputra<span className="text-primary">.</span>
            </a>
            <p className="max-w-sm text-body-sm leading-relaxed text-on-surface-variant">
              Junior Web Developer · PHP &amp; CodeIgniter
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {socials.map(({ key, label, href, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target={key === "email" ? undefined : "_blank"}
                  rel={key === "email" ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="flex items-center gap-2 rounded-lg border border-secondary/40 bg-surface-container px-3.5 py-2 font-mono text-label-sm text-on-surface-variant transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-3.5 md:col-span-3">
            <span className="font-mono text-label-sm uppercase tracking-widest text-primary">
              Navigasi Cepat
            </span>
            <div className="flex flex-col gap-2 text-body-sm">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex w-fit items-center gap-1.5 text-on-surface-variant transition-all hover:translate-x-1 hover:text-primary"
                >
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: "14px" }}>
                    chevron_right
                  </span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Channels note + credit */}
          <div className="flex flex-col gap-3.5 md:col-span-4">
            <span className="font-mono text-label-sm uppercase tracking-widest text-primary">
              Kredit
            </span>
            <p className="text-body-sm leading-relaxed text-on-surface-variant">
              {identity.globeCredit}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-secondary/20 pt-6 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-code-sm text-on-surface-variant">
            © {year} Bragi Arya Dwi Saputra. All rights reserved.
          </p>
          <div className="inline-flex items-center gap-2 rounded-lg border border-secondary/40 bg-surface-container-low px-3 py-1.5 font-mono text-[11px] text-tertiary">
            <span className="material-symbols-outlined text-[14px] text-primary">memory</span>
            Built with React · Three.js · GSAP
          </div>
        </div>
      </div>
    </footer>
  );
}
