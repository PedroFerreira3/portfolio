import { useTranslation } from 'react-i18next';
import { ArrowRight, Download } from 'lucide-react';
import { heroStack } from '@/data/skills';

export function Hero() {
  const { t } = useTranslation('hero');

  return (
    <section
      id="hero"
      className="container-layout relative flex min-h-screen flex-col justify-center pb-20 pt-32"
    >
      <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 font-mono text-xs text-accent">
        <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-success" />
        {t('badge')}
      </div>

      <h1 className="text-fluid-5xl mb-4 font-display font-bold leading-none tracking-tight">
        {t('firstName')}
        <br />
        <span className="text-accent">{t('lastName')}</span>
      </h1>

      <p className="text-fluid-2xl mb-6 font-display font-normal text-muted">{t('role')}</p>

      <p className="text-fluid-lg mb-10 max-w-xl leading-relaxed text-muted">
        {t('description')}
      </p>

      <div className="mb-14 flex flex-wrap gap-3">
        <a
          href="#projetos"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3 font-body text-sm font-semibold text-accent-foreground transition-all duration-200 hover:-translate-y-px hover:opacity-90 active:scale-[0.97]"
        >
          {t('ctaPrimary')}
          <ArrowRight size={16} strokeWidth={2} />
        </a>
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-7 py-3 font-body text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-px hover:border-accent hover:text-accent active:scale-[0.97]"
        >
          <Download size={16} strokeWidth={2} />
          {t('ctaSecondary')}
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-[11px] text-muted">{t('stackLabel')}</span>
        {heroStack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
