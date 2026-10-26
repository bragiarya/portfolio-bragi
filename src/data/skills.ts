/**
 * Tech stack for the physics skill balls — sourced from docs/PRD.md & CONTENT.md.
 * Radii follow the Apple Siri / AI sphere visual spec (Three.js units).
 */

export type Skill = {
  id: string;
  label: string;
  radius: number;
};

export const skills: Skill[] = [
  { id: "php",         label: "PHP",          radius: 1.1  },
  { id: "codeigniter", label: "CodeIgniter",   radius: 1.15 },
  { id: "mysql",       label: "MySQL",         radius: 0.9  },
  { id: "tailwind",    label: "Tailwind CSS",  radius: 0.9  },
  { id: "javascript",  label: "JavaScript",    radius: 0.85 },
  { id: "git",         label: "Git",           radius: 0.78 },
  { id: "python",      label: "Python",        radius: 0.88 },
];
