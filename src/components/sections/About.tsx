import { useTranslation } from 'react-i18next';
import { withBase } from '@/lib/utils';
import { FadeIn } from '@/components/ui/FadeIn';
import { frontendSkills, backendSkills, toolsSkills } from '@/data/skills';

const totalSkills = frontendSkills.length + backendSkills.length + toolsSkills.length;

export function About() {
  const { t } = useTranslation('about');

  const stats = [
    { id: 'years', value: '2+' },
    { id: 'projects', value: '3+' },
    { id: 'stack', value: String(totalSkills) },
    { id: 'graduation', value: t('stats.graduationValue') },
  ] as const;

  return (
    <section id="sobre" className="container-layout py-20 lg:py-28">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <FadeIn>
          <div className="mx-auto aspect-square w-full max-w-80 overflow-hidden rounded-2xl border border-border bg-surface">
            <img src={withBase('avatar.jpeg')} alt="Pedro Ferreira" className="h-full w-full object-cover" />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {stats.map(({ id, value }) => (
              <div key={id} className="rounded-xl border border-border bg-surface p-5">
                <div className="font-display text-2xl font-bold leading-none text-accent">{value}</div>
                <div className="mt-1 text-fluid-sm text-muted">{t(`stats.${id}`)}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <h2 className="text-fluid-3xl mb-6 font-display font-semibold leading-tight tracking-tight">
            {t('heading')}
          </h2>

          <div className="space-y-5 text-fluid-base leading-relaxed text-muted">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
            <p>{t('p3')}</p>
          </div>

        </FadeIn>
      </div>
    </section>
  );
}
