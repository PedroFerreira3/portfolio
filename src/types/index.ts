export type Locale = 'pt-BR' | 'en' | 'es';

export interface Project {
  id: string;
  titleKey: string;
  descKey: string;
  categoryKey: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
}

export interface ExperienceItem {
  id: string;
  companyKey: string;
  roleKey: string;
  descKey: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
}

export interface SkillGroup {
  id: 'frontend' | 'backend';
  titleKey: string;
  skills: string[];
}

export interface NavLink {
  hash: string;
  labelKey: string;
}
