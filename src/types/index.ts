export type Locale = 'pt-BR' | 'en' | 'es';

export interface Project {
  id: string;
  titleKey: string;
  descKey: string;
  categoryKey: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  companyKey: string;
  roleKey: string;
  descKey: string;
  current: boolean;
}

export interface SkillItem {
  name: string;
  iconKey: string;
}

export interface NavLink {
  hash: string;
  labelKey: string;
}
