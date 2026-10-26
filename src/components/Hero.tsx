import { identity } from "../data/content";
import InteractiveGlobe from "./InteractiveGlobe";
import RotatingTitle from "./RotatingTitle";
import { GithubIcon, LinkedinIcon, MailIcon } from "./icons";

const heroChips = ["PHP", "CodeIgniter", "MySQL", "Python"];

const socials = [
  {
    key: "email",
    label: "Email",
    href: identity.contact.email.url,
    Icon: MailIcon,
  },
  {
    key: "github",
    label: "GitHub",
    href: identity.contact.github.url,
    Icon: GithubIcon,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: identity.contact.linkedin.url,
    Icon: LinkedinIcon,
  },
] as const;

export default function Hero() {
  return (
    <section id="top" className="relative w-full overflow-hidden px-6 pb-16 pt-12 lg:px-12 lg:pb-24 lg:pt-20">
      {/* Soft atmospheric backlight */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-[36rem] w-[36rem] rounded-full bg-secondary/20 blur-[140px]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Left: copy & CTAs */}
        <div className="z-10 flex flex-col items-start gap-6 lg:col-span-7">
          {/* Status Pill Badge */}
          <div className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-secondary/50 bg-surface-container/90 px-3.5 py-1.5 text-xs backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-label-sm uppercase tracking-wider text-on-surface">
              Available for Freelance &amp; Work
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="text-balance font-display text-display-xl font-extrabold tracking-tight text-on-surface lg:text-[68px] lg:leading-[74px]">
              Bragi Arya
              <br className="hidden sm:inline" />{" "}
              <span className="bg-gradient-to-r from-on-surface via-tertiary to-primary bg-clip-text text-transparent">
                Dwi Saputra<span className="text-primary">.</span>
              </span>
            </h1>

            {/* Rotating title with terminal glyph + blinking cursor */}
            <div className="flex min-h-[36px] items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: "20px" }}>
                terminal
              </span>
              <span className="font-mono text-code-md font-semibold tracking-wide text-primary sm:text-[17px]">
                <RotatingTitle words={identity.roles} />
              </span>
              <span className="cursor-blink ml-0.5 inline-block h-5 w-2 bg-primary align-middle" />
            </div>
          </div>

          {/* Subheading bio */}
          <p className="max-w-2xl font-sans text-body-lg leading-relaxed text-on-surface-variant">
            {identity.bio}
          </p>

          {/* Action bar */}
          <div className="flex w-full flex-wrap items-center gap-4 pt-2 sm:w-auto">
            <a
              href="#proyek"
              className="group inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary px-6 py-3 font-mono text-label-md uppercase tracking-wider font-semibold text-on-primary shadow-[0_0_20px_rgba(104,207,235,0.3)] transition-colors hover:bg-tertiary"
            >
              {identity.cta}
              <span
                className="material-symbols-outlined transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ fontSize: "18px" }}
              >
                north_east
              </span>
            </a>
            <a
              href="#kontak"
              className="inline-flex items-center gap-2 rounded-xl border border-secondary/50 bg-surface-container/80 px-5 py-3 font-mono text-label-md tracking-wider text-on-surface transition-colors hover:border-primary/50 hover:bg-surface-container-high"
            >
              Hubungi Saya
            </a>
          </div>

          {/* Social links + tech chips */}
          <div className="flex w-full flex-col gap-6 pt-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              {socials.map(({ key, label, href, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target={key === "email" ? undefined : "_blank"}
                  rel={key === "email" ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-secondary/50 bg-surface-container text-on-surface-variant transition-all hover:border-primary/50 hover:text-primary"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
            <div className="hidden h-6 w-px bg-outline-variant/40 sm:block" />
            <div className="flex flex-wrap items-center gap-2">
              {heroChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded border border-secondary/40 bg-surface-container-low font-mono text-code-sm text-primary"
                  style={{ padding: "0.25rem 0.625rem" }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: free-floating holographic globe */}
        <div className="relative flex min-h-[440px] items-center justify-center lg:col-span-5 lg:min-h-[500px]">
          <div className="pointer-events-none absolute inset-0 m-auto h-72 w-72 rounded-full bg-gradient-to-tr from-secondary/25 via-primary/15 to-transparent blur-[80px] sm:h-96 sm:w-96" />
          <div className="pointer-events-none absolute inset-0 m-auto h-64 w-64 rounded-full bg-background/70 shadow-[inset_0_0_50px_rgba(21,21,18,0.9)]" />
          <div className="relative h-[440px] w-full lg:h-[500px]">
            <InteractiveGlobe />
          </div>
        </div>
      </div>
    </section>
  );
}
