import type { Project } from "../data/projects";

type Props = {
  project: Project;
  index: number;
};

const PMR = [
  { key: "problem", label: "Problem", tone: "text-outline" },
  { key: "method", label: "Method", tone: "text-primary" },
  { key: "result", label: "Result", tone: "text-tertiary" },
] as const;

export default function ProjectCase({ project, index }: Props) {
  const flip = index % 2 === 1;

  return (
    <article
      className={`group flex flex-col gap-8 rounded-card border border-secondary/40 bg-surface-container/60 p-6 shadow-lg backdrop-blur-md transition-colors hover:border-primary/50 lg:flex-row lg:items-center lg:p-8 ${
        flip ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      {/* Window mockup with the real screenshot */}
      <div className="flex w-full flex-col self-start overflow-hidden rounded-xl border border-secondary/40 bg-surface-container-lowest shadow-md lg:w-1/2 lg:self-center">
        <div className="flex items-center justify-between border-b border-secondary/40 bg-secondary/30 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-tertiary" />
            <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="ml-2 font-mono text-[11px] text-on-surface-variant">
              {project.repoLabel}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase text-primary">
            PHP · CI
          </span>
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-container-lowest">
          <img
            src={project.image}
            alt={`Screenshot ${project.title}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Details */}
      <div className="flex w-full flex-col gap-5 lg:w-1/2">
        <div className="flex flex-wrap items-center gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded border border-secondary/40 bg-surface-container px-2.5 py-1 font-mono text-code-sm text-primary"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-1.5">
          <h3 className="text-headline-md text-on-surface">{project.title}</h3>
          <p className="text-body-sm text-on-surface-variant">{project.subtitle}</p>
        </div>

        <div className="flex flex-col gap-3 text-body-sm">
          {PMR.map(({ key, label, tone }) => (
            <div
              key={key}
              className="flex flex-col gap-1 rounded-lg border border-secondary/30 bg-surface-container-lowest p-3"
            >
              <span className={`font-mono text-[11px] font-semibold uppercase ${tone}`}>
                &gt; {label}
              </span>
              <p className="text-on-surface-variant">{project[key]}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-1">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-secondary/50 bg-surface-container px-4 py-2 font-mono text-label-sm uppercase tracking-wider text-on-surface transition-colors hover:border-primary/50"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
              code
            </span>
            GitHub Repo
          </a>
        </div>
      </div>
    </article>
  );
}
