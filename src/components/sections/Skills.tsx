import { useTranslation } from 'react-i18next';
import { Layers, Server } from 'lucide-react';
import { skillGroups } from '@/data/skills';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { FadeIn } from '@/components/ui/FadeIn';
import { cn } from '@/lib/utils';

const ICONS = {
  frontend: Layers,
  backend: Server,
} as const;

export function Skills() {
  const { t } = useTranslation('skills');

  return (
    <section id="skills" className="container-layout py-20 lg:py-28">
      <FadeIn>
        <SectionLabel>{t('label')}</SectionLabel>
        <h2 className="text-fluid-3xl mb-4 font-display font-semibold leading-tight tracking-tight">
          {t('title')}
        </h2>
        <p className="text-fluid-base mb-12 max-w-xl leading-relaxed text-muted">{t('subtitle')}</p>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {skillGroups.map((group) => {
            const Icon = ICONS[group.id];
            const isFrontend = group.id === 'frontend';
            return (
              <div key={group.id} className="rounded-2xl border border-border bg-surface p-7">
                <div className="mb-5 flex items-center gap-2.5 font-display text-base font-semibold text-foreground">
                  <Icon size={18} strokeWidth={1.5} className="text-accent" />
                  {t(group.id)}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={cn(
                        'rounded-md px-3 py-1.5 font-mono text-xs transition-colors duration-200',
                        isFrontend
                          ? 'border border-accent/30 bg-accent/15 text-accent'
                          : 'border border-border bg-surface-secondary text-muted hover:border-muted hover:text-foreground',
                      )}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
