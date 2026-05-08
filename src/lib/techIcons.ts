import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiVite,
  SiPython,
  SiDjango,
  SiFlask,
  SiCplusplus,
  SiSqlite,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiLinux,
  SiDocker,
  SiFigma,
  SiInsomnia,
  SiPostman,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { DiMysql } from 'react-icons/di';
import type { IconType } from 'react-icons';

const techIconMap: Record<string, IconType> = {
  // iconKey format (usado em skills data)
  react: SiReact,
  typescript: SiTypescript,
  nextjs: SiNextdotjs,
  javascript: SiJavascript,
  html5: SiHtml5,
  css3: SiCss,
  tailwindcss: SiTailwindcss,
  vite: SiVite,
  java: FaJava,
  python: SiPython,
  django: SiDjango,
  flask: SiFlask,
  cplusplus: SiCplusplus,
  sqlite: SiSqlite,
  mysql: DiMysql,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  git: SiGit,
  github: SiGithub,
  linux: SiLinux,
  docker: SiDocker,
  figma: SiFigma,
  insomnia: SiInsomnia,
  postman: SiPostman,
  // display name format (usado em project tags)
  'next.js': SiNextdotjs,
  'tailwind css': SiTailwindcss,
  tailwind: SiTailwindcss,
  html: SiHtml5,
  css: SiCss,
  'c++': SiCplusplus,
  'django rest': SiDjango,
  'django rest framework': SiDjango,
  'docker compose': SiDocker,
};

export function getTechIcon(name: string): IconType | null {
  return techIconMap[name.toLowerCase()] ?? null;
}

export { techIconMap };
