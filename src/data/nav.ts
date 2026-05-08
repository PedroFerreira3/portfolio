import type { NavLink } from '@/types';

export const navLinks: NavLink[] = [
  { hash: 'sobre', labelKey: 'common:nav.about' },
  { hash: 'skills', labelKey: 'common:nav.skills' },
  { hash: 'projetos', labelKey: 'common:nav.projects' },
  { hash: 'experiencia', labelKey: 'common:nav.experience' },
  { hash: 'contato', labelKey: 'common:nav.contact' },
];

export const SOCIAL = {
  github: 'https://github.com/PedroFerreira3',
  linkedin: 'https://www.linkedin.com/in/pedro-ferreira021',
  email: 'pedro1798225@gmail.com',
} as const;
