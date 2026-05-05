import { useTranslation } from 'react-i18next';
import { GraduationCap } from 'lucide-react';
import { withBase } from '@/lib/utils';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { FadeIn } from '@/components/ui/FadeIn';

const STATS = [
  { id: 'years', value: '2+' },
  { id: 'projects', value: '3+' },
  { id: 'stack', value: '7' },
  { id: 'graduation', value: 'Dez 2026' },
] as const;

export function About() {
  const { t } = useTranslation('about');

  return (
    <section id="sobre" className="container-layout py-20 lg:py-28">
      <FadeIn>
        <SectionLabel>{t('label')}</SectionLabel>
      </FadeIn>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <FadeIn>
          <div className="mx-auto aspect-square w-full max-w-80 overflow-hidden rounded-2xl border border-border bg-surface">
            <img src={withBase('avatar.svg')} alt="Pedro Ferreira" className="h-full w-full object-cover" />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {STATS.map(({ id, value }) => (
              <div key={id} className="rounded-xl border border-border bg-surface p-5">
                <div className="font-display text-2xl font-bold leading-none text-accent">{value}</div>
                <div className="mt-1 text-fluid-sm text-muted">{t(`stats.${id}`)}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <h2 className="text-fluid-3xl mb-6 font-display font-semibold leading-tight tracking-tight">
            {t('title')
              .split('\n')
              .map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
          </h2>

          <div className="space-y-5 text-fluid-base leading-relaxed text-muted">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
            <p>{t('p3')}</p>
          </div>

          <div className="mt-7 flex items-start gap-4 rounded-xl border border-border bg-surface p-5">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-accent/10">
              <GraduationCap size={16} strokeWidth={1.5} className="text-accent" />
            </div>
            <div>
              <div className="font-display text-sm font-semibold text-foreground">{t('education.title')}</div>
              <div className="mt-0.5 text-xs text-muted">{t('education.subtitle')}</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
