import { useTranslation } from 'react-i18next';
import { ExternalLink, Home } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { projects } from '@/data/projects';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { FadeIn } from '@/components/ui/FadeIn';

export function Projects() {
  const { t } = useTranslation();

  return (
    <section id="projetos" className="container-layout py-20 lg:py-28">
      <FadeIn>
        <SectionLabel>{t('projects:label')}</SectionLabel>
        <h2 className="text-fluid-3xl mb-4 font-display font-semibold leading-tight tracking-tight">
          {t('projects:title')}
        </h2>
        <p className="text-fluid-base mb-12 max-w-xl leading-relaxed text-muted">
          {t('projects:subtitle')}
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <FadeIn key={project.id} delay={i * 80}>
            <article className="group h-full overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_0_24px_rgba(34,211,238,0.08)]">
              <div className="flex h-40 items-center justify-center border-b border-border bg-surface-secondary">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-dashed border-border">
                  <Home size={22} strokeWidth={1.5} className="text-muted" />
                </div>
              </div>
              <div className="p-5">
                <div className="mb-2 font-mono text-[10px] tracking-wider text-accent">
                  {t(project.categoryKey)}
                </div>
                <h3 className="mb-2 font-display text-base font-semibold leading-tight text-foreground">
                  {t(project.titleKey)}
                </h3>
                <p className="mb-4 text-xs leading-relaxed text-muted">{t(project.descKey)}</p>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border bg-surface-secondary px-2 py-0.5 font-mono text-[10px] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 font-body text-xs font-medium text-accent-foreground transition-opacity duration-150 hover:opacity-90"
                    >
                      <ExternalLink size={11} strokeWidth={2} />
                      {t('projects:demo')}
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-transparent px-3 py-1.5 font-body text-xs font-medium text-muted transition-colors duration-150 hover:border-accent hover:text-accent"
                    >
                      <GithubIcon size={11} strokeWidth={2} />
                      {t('projects:github')}
                    </a>
                  )}
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
