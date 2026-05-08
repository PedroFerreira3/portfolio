import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { frontendSkills, backendSkills, toolsSkills } from '@/data/skills';
import { FadeIn } from '@/components/ui/FadeIn';
import { techIconMap } from '@/lib/techIcons';
import type { SkillItem } from '@/types';

const edgeMask = {
  maskImage:
    'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
  WebkitMaskImage:
    'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
} as React.CSSProperties;

function SkillChip({ skill }: { skill: SkillItem }) {
  const Icon = techIconMap[skill.iconKey];
  return (
    <div className="group/chip flex flex-col items-center gap-2.5 rounded-xl border border-border bg-surface px-5 py-4 transition-all duration-200 hover:border-accent/40 hover:shadow-[0_0_0_1px_var(--accent)]">
      {Icon && (
        <Icon
          size={28}
          className="text-foreground/40 transition-colors duration-200 group-hover/chip:text-accent"
        />
      )}
      <span className="whitespace-nowrap font-mono text-xs text-muted transition-colors duration-200 group-hover/chip:text-foreground">
        {skill.name}
      </span>
    </div>
  );
}

function MarqueeRow({ skills, reverse = false }: { skills: SkillItem[]; reverse?: boolean }) {
  const [paused, setPaused] = useState(false);
  const items = [...skills, ...skills, ...skills];

  return (
    <div
      className="overflow-hidden py-1.5"
      style={edgeMask}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`flex w-max gap-4 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
      >
        {items.map((skill, i) => (
          <SkillChip key={`${skill.iconKey}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

interface CategoryRowProps {
  labelKey: string;
  skills: SkillItem[];
  reverse?: boolean;
}

function CategoryRow({ labelKey, skills, reverse = false }: CategoryRowProps) {
  const { t } = useTranslation('skills');
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <span className="shrink-0 font-mono text-xs">
          <span className="text-accent">// </span>
          <span className="text-muted">{t(labelKey)}</span>
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <MarqueeRow skills={skills} reverse={reverse} />
    </div>
  );
}

export function Skills() {
  const { t } = useTranslation('skills');

  return (
    <section id="skills" className="py-20 lg:py-28">
      <div className="container-layout">
        <FadeIn>
          <h2 className="text-fluid-3xl mb-4 font-display font-semibold leading-tight tracking-tight">
            {t('title')}
          </h2>
          <p className="text-fluid-base mb-12 max-w-xl leading-relaxed text-muted">
            {t('subtitle')}
          </p>
        </FadeIn>

        <ul className="sr-only">
          {[...frontendSkills, ...backendSkills, ...toolsSkills].map((s) => (
            <li key={s.iconKey}>{s.name}</li>
          ))}
        </ul>

        <FadeIn delay={100}>
          <div className="flex flex-col gap-10">
            <CategoryRow labelKey="frontend" skills={frontendSkills} />
            <CategoryRow labelKey="backend" skills={backendSkills} reverse />
            <CategoryRow labelKey="tools" skills={toolsSkills} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
