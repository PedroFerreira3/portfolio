import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ptBRCommon from '@/locales/pt-BR/common.json';
import ptBRHero from '@/locales/pt-BR/hero.json';
import ptBRAbout from '@/locales/pt-BR/about.json';
import ptBRSkills from '@/locales/pt-BR/skills.json';
import ptBRProjects from '@/locales/pt-BR/projects.json';
import ptBRExperience from '@/locales/pt-BR/experience.json';
import ptBRContact from '@/locales/pt-BR/contact.json';

import enCommon from '@/locales/en/common.json';
import enHero from '@/locales/en/hero.json';
import enAbout from '@/locales/en/about.json';
import enSkills from '@/locales/en/skills.json';
import enProjects from '@/locales/en/projects.json';
import enExperience from '@/locales/en/experience.json';
import enContact from '@/locales/en/contact.json';

import esCommon from '@/locales/es/common.json';
import esHero from '@/locales/es/hero.json';
import esAbout from '@/locales/es/about.json';
import esSkills from '@/locales/es/skills.json';
import esProjects from '@/locales/es/projects.json';
import esExperience from '@/locales/es/experience.json';
import esContact from '@/locales/es/contact.json';

const SUPPORTED_LOCALES = ['pt-BR', 'en', 'es'] as const;

const resources = {
  'pt-BR': {
    common: ptBRCommon,
    hero: ptBRHero,
    about: ptBRAbout,
    skills: ptBRSkills,
    projects: ptBRProjects,
    experience: ptBRExperience,
    contact: ptBRContact,
  },
  en: {
    common: enCommon,
    hero: enHero,
    about: enAbout,
    skills: enSkills,
    projects: enProjects,
    experience: enExperience,
    contact: enContact,
  },
  es: {
    common: esCommon,
    hero: esHero,
    about: esAbout,
    skills: esSkills,
    projects: esProjects,
    experience: esExperience,
    contact: esContact,
  },
} as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt-BR',
    supportedLngs: SUPPORTED_LOCALES,
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'portfolio.lang',
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
