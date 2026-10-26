import { useState } from "react";
import { identity } from "../data/content";
import { GithubIcon, LinkedinIcon, MailIcon } from "./icons";

const terminalLines = [
  { k: "role", v: "Junior Web Developer / Freelance" },
  { k: "stack", v: "PHP, CodeIgniter, MySQL, Python" },
  { k: "email", v: identity.contact.email.handle },
  { k: "github", v: identity.contact.github.handle },
] as const;

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.contact.email.handle);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="kontak" className="relative w-full px-6 py-16 lg:px-12 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-code-md font-medium tracking-widest text-primary">
            [ 04. HUBUNGI SAYA ]
          </span>
          <h2 className="text-headline-lg text-on-surface">Kontak</h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Terminal box */}
          <div className="flex flex-col gap-4 rounded-card border border-secondary/40 bg-surface-container-lowest p-6 font-mono shadow-lg lg:col-span-5">
            <div className="flex items-center justify-between border-b border-secondary/30 pb-3">
              <span className="flex items-center gap-2 text-[12px] text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                terminal — connection
              </span>
              <span className="text-[11px] text-outline">secure</span>
            </div>
            <div className="flex flex-col gap-2 text-[13px] text-on-surface-variant">
              {terminalLines.map((line) => (
                <div key={line.k}>
                  <span className="text-primary">$</span> {line.k}:{" "}
                  <span className="font-semibold text-tertiary">{line.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct channels */}
          <div className="flex flex-col gap-3 lg:col-span-7">
            {/* Email with copy */}
            <div className="group flex items-center justify-between rounded-card border border-secondary/40 bg-surface-container/70 p-4 transition-colors hover:border-primary/50">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-secondary/60 bg-secondary/40 text-primary">
                  <MailIcon className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase text-on-surface-variant">
                    Email
                  </span>
                  <span className="font-mono text-[15px] text-on-surface">
                    {identity.contact.email.handle}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Salin email"
                className="flex items-center gap-1 rounded border border-secondary/40 bg-surface-container-lowest px-2.5 py-1.5 font-mono text-xs text-primary transition-colors hover:border-primary/50 hover:text-tertiary"
              >
                <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>
                  content_copy
                </span>
                {copied ? "Tersalin" : "Salin"}
              </button>
            </div>

            {/* LinkedIn */}
            <a
              href={identity.contact.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-card border border-secondary/40 bg-surface-container/70 p-4 transition-colors hover:border-primary/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-secondary/60 bg-secondary/40 text-primary">
                  <LinkedinIcon className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase text-on-surface-variant">
                    LinkedIn
                  </span>
                  <span className="font-mono text-[15px] text-on-surface">
                    {identity.contact.linkedin.handle}
                  </span>
                </div>
              </div>
              <span
                className="material-symbols-outlined text-primary transition-transform group-hover:translate-x-1"
                style={{ fontSize: "18px" }}
              >
                arrow_forward
              </span>
            </a>

            {/* GitHub */}
            <a
              href={identity.contact.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-card border border-secondary/40 bg-surface-container/70 p-4 transition-colors hover:border-primary/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-secondary/60 bg-secondary/40 text-primary">
                  <GithubIcon className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase text-on-surface-variant">
                    GitHub
                  </span>
                  <span className="font-mono text-[15px] text-on-surface">
                    {identity.contact.github.handle}
                  </span>
                </div>
              </div>
              <span
                className="material-symbols-outlined text-primary transition-transform group-hover:translate-x-1"
                style={{ fontSize: "18px" }}
              >
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
