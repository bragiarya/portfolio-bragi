import { projects } from "../data/projects";
import ProjectCase from "./ProjectCase";

export default function Projects() {
  return (
    <section id="proyek" className="relative w-full px-6 py-16 lg:px-12 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-code-md font-medium tracking-widest text-primary">
            [ 03. PORTOFOLIO KARYA ]
          </span>
          <h2 className="text-headline-lg text-on-surface">Proyek</h2>
          <p className="max-w-2xl text-body-md text-on-surface-variant">
            Enam sistem nyata yang dibangun dari nol dengan PHP, CodeIgniter, dan
            MySQL. Setiap proyek disajikan lengkap dengan Problem, Method, dan
            Result.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {projects.map((project, index) => (
            <ProjectCase key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
