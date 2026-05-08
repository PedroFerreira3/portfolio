import { useTranslation } from 'react-i18next';
import { GraduationCap } from 'lucide-react';
import { experiences } from '@/data/experience';
import { FadeIn } from '@/components/ui/FadeIn';
import { cn } from '@/lib/utils';

export function Experience() {
  const { t } = useTranslation();

  return (
    <section id="experiencia" className="container-layout py-20 lg:py-28">
      <FadeIn>
        <h2 className="text-fluid-3xl mb-12 font-display font-semibold leading-tight tracking-tight">
          {t('experience:title')}
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
        <FadeIn delay={100}>
          <ol className="relative pl-8">
            <span
              aria-hidden
              className="absolute bottom-2 left-2 top-2 w-px bg-border"
            />
            {experiences.map((exp) => (
              <li key={exp.id} className="relative mb-9 last:mb-0">
                <span
                  aria-hidden
                  className={cn(
                    'absolute -left-[26px] top-[5px] flex h-[15px] w-[15px] items-center justify-center rounded-full border-2',
                    exp.current ? 'border-accent bg-accent/10' : 'border-border bg-background',
                  )}
                >
                  <span
                    className={cn(
                      'h-1.5 w-1.5 rounded-full',
                      exp.current ? 'bg-accent' : 'bg-border',
                    )}
                  />
                </span>
                <div className="mb-1.5 font-mono text-[11px] text-muted">
                  {t(`experience:${exp.id}.date`)}
                </div>
                <div className="mb-1 font-display text-base font-semibold text-foreground">
                  {t(exp.companyKey)}
                  {exp.current && (
                    <span className="ml-2.5 inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 align-middle text-[11px] font-medium text-accent">
                      <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
                      {t('experience:currentBadge')}
                    </span>
                  )}
                </div>
                <div className="mb-3 text-sm text-accent">{t(exp.roleKey)}</div>
                <ul className="space-y-1.5">
                  {(() => {
                    const bullets = t(exp.descKey, { returnObjects: true });
                    if (!Array.isArray(bullets)) return null;
                    return (bullets as string[]).map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                        <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                        {bullet}
                      </li>
                    ));
                  })()}
                </ul>
              </li>
            ))}
          </ol>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mb-4 font-mono text-[11px] uppercase tracking-wider text-muted">
            {t('experience:educationLabel')}
          </div>
          <a
            href="https://fatecourinhos.cps.sp.gov.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="group/fatec block rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:border-accent hover:shadow-[0_0_24px_rgba(34,211,238,0.08)]"
          >
            <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10">
              <GraduationCap size={20} strokeWidth={1.5} className="text-accent" />
            </div>
            <div className="mb-1 font-display text-[15px] font-semibold text-foreground">
              {t('experience:fatec.title')}
            </div>
            <div className="text-xs text-muted">{t('experience:fatec.subtitle')}</div>
            <div className="mt-2 font-mono text-[11px] text-accent">{t('experience:fatec.date')}</div>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
