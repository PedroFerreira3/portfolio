import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Home,
  LayoutGrid,
  List,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { projects } from '@/data/projects';
import { FadeIn } from '@/components/ui/FadeIn';
import { getTechIcon } from '@/lib/techIcons';
import type { Project } from '@/types';

type View = 'grid' | 'list';

const ITEMS_PER_PAGE = 6;

function gridColsClass(count: number): string {
  if (count === 4) return 'grid-cols-1 sm:grid-cols-2';
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
}

// ── Shared building blocks ─────────────────────────────────────

function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => {
        const Icon = getTechIcon(tag);
        return (
          <span
            key={tag}
            title={tag}
            className="flex h-6 w-6 items-center justify-center rounded border border-border bg-surface-secondary text-foreground/50 transition-colors duration-150 hover:border-accent/50 hover:text-accent"
          >
            {Icon ? <Icon size={13} /> : <span className="font-mono text-[8px]">{tag.slice(0, 2)}</span>}
          </span>
        );
      })}
    </div>
  );
}

interface ProjectActionsProps {
  demoUrl?: string;
  repoUrl?: string;
  className?: string;
}

function ProjectActions({ demoUrl, repoUrl, className }: ProjectActionsProps) {
  const { t } = useTranslation('projects');
  return (
    <div className={`relative z-[2] flex gap-2 ${className ?? ''}`}>
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 font-body text-xs font-medium text-accent-foreground transition-opacity duration-150 hover:opacity-90"
        >
          <ExternalLink size={11} strokeWidth={2} />
          {t('demo')}
        </a>
      )}
      {repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-transparent px-3 py-1.5 font-body text-xs font-medium text-muted transition-colors duration-150 hover:border-accent hover:text-accent"
        >
          <GithubIcon size={11} strokeWidth={2} />
          {t('github')}
        </a>
      )}
    </div>
  );
}

function CardOverlayLink({ href }: { href?: string }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden="true"
      tabIndex={-1}
      className="absolute inset-0 z-[1] rounded-2xl"
    />
  );
}

// ── View toggle ────────────────────────────────────────────────

interface ViewToggleProps {
  view: View;
  onChange: (v: View) => void;
}

function ViewToggle({ view, onChange }: ViewToggleProps) {
  const { t } = useTranslation('projects');
  return (
    <div
      role="group"
      aria-label={t('viewToggle.label')}
      className="flex items-center rounded-lg border border-border p-0.5"
    >
      {(['grid', 'list'] as const).map((v) => {
        const Icon = v === 'grid' ? LayoutGrid : List;
        return (
          <button
            key={v}
            onClick={() => onChange(v)}
            aria-pressed={view === v}
            aria-label={t(`viewToggle.${v}`)}
            className={`rounded-md p-2 transition-colors duration-150 ${
              view === v ? 'bg-accent/10 text-accent' : 'text-muted hover:text-foreground'
            }`}
          >
            <Icon size={15} strokeWidth={1.5} />
          </button>
        );
      })}
    </div>
  );
}

// ── Pagination ─────────────────────────────────────────────────

interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (p: number) => void;
}

function Pagination({ page, pageCount, onChange }: PaginationProps) {
  const { t } = useTranslation('projects');
  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 0}
        aria-label={t('pagination.previous')}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors duration-150 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft size={14} strokeWidth={1.5} />
      </button>

      {Array.from({ length: pageCount }, (_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          aria-current={i === page ? 'page' : undefined}
          className={`flex h-8 w-8 items-center justify-center rounded-lg border font-mono text-xs transition-colors duration-150 ${
            i === page
              ? 'border-accent bg-accent/10 text-accent'
              : 'border-border text-muted hover:border-accent/50 hover:text-foreground'
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount - 1}
        aria-label={t('pagination.next')}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors duration-150 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
}

// ── Card view ──────────────────────────────────────────────────

function cardImageUrl(id: string): string {
  return `${import.meta.env.BASE_URL}card-images/${id}.png`;
}

function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();
  const [imgFailed, setImgFailed] = useState(false);
  const handleImgError = useCallback(() => setImgFailed(true), []);
  const primaryUrl = project.demoUrl ?? project.repoUrl;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-200 hover:border-accent hover:shadow-[0_0_24px_rgba(34,211,238,0.08)]">
      <CardOverlayLink href={primaryUrl} />
      <div className="flex h-40 items-center justify-center overflow-hidden border-b border-border bg-surface-secondary">
        {!imgFailed ? (
          <img
            src={cardImageUrl(project.id)}
            alt={t(project.titleKey)}
            className="h-full w-full object-cover object-top"
            loading="lazy"
            onError={handleImgError}
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-dashed border-border">
            <Home size={22} strokeWidth={1.5} className="text-muted" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 font-mono text-[10px] tracking-wider text-accent">
          {t(project.categoryKey)}
        </div>
        <h3 className="mb-2 font-display text-base font-semibold leading-tight text-foreground">
          {t(project.titleKey)}
        </h3>
        <p className="mb-4 flex-1 text-xs leading-relaxed text-muted">{t(project.descKey)}</p>
        <div className="mb-4">
          <ProjectTags tags={project.tags} />
        </div>
        <ProjectActions demoUrl={project.demoUrl} repoUrl={project.repoUrl} />
      </div>
    </article>
  );
}

// ── List view ──────────────────────────────────────────────────

function ProjectListItem({ project }: { project: Project }) {
  const { t } = useTranslation();
  const primaryUrl = project.demoUrl ?? project.repoUrl;
  return (
    <article className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 transition-all duration-200 hover:border-accent hover:shadow-[0_0_24px_rgba(34,211,238,0.08)] sm:flex-row sm:items-start sm:gap-6">
      <CardOverlayLink href={primaryUrl} />
      <div className="min-w-0 flex-1">
        <span className="mb-1 block font-mono text-[10px] tracking-wider text-accent">
          {t(project.categoryKey)}
        </span>
        <h3 className="mb-1.5 font-display text-base font-semibold leading-tight text-foreground">
          {t(project.titleKey)}
        </h3>
        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-muted">
          {t(project.descKey)}
        </p>
        <ProjectTags tags={project.tags} />
      </div>

      <ProjectActions
        demoUrl={project.demoUrl}
        repoUrl={project.repoUrl}
        className="shrink-0 sm:flex-col"
      />
    </article>
  );
}

// ── Section ────────────────────────────────────────────────────

export function Projects() {
  const [view, setView] = useState<View>('grid');
  const [page, setPage] = useState(0);
  const { t } = useTranslation('projects');

  const needsPagination = projects.length > ITEMS_PER_PAGE;
  const pageCount = needsPagination ? Math.ceil(projects.length / ITEMS_PER_PAGE) : 1;
  const visible = needsPagination
    ? projects.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
    : projects;

  function handleViewChange(v: View) {
    setView(v);
    setPage(0);
  }

  return (
    <section id="projetos" className="container-layout py-20 lg:py-28">
      <FadeIn>
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-fluid-3xl mb-4 font-display font-semibold leading-tight tracking-tight">
              {t('title')}
            </h2>
            <p className="text-fluid-base max-w-xl leading-relaxed text-muted">
              {t('subtitle')}
            </p>
          </div>
          <ViewToggle view={view} onChange={handleViewChange} />
        </div>
      </FadeIn>

      <div key={`${view}-${page}`}>
        {view === 'grid' ? (
          <div className={`grid gap-5 ${gridColsClass(visible.length)}`}>
            {visible.map((project, i) => (
              <FadeIn key={project.id} delay={i * 80} className="h-full">
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {visible.map((project, i) => (
              <FadeIn key={project.id} delay={i * 60}>
                <ProjectListItem project={project} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      {needsPagination && (
        <Pagination page={page} pageCount={pageCount} onChange={setPage} />
      )}
    </section>
  );
}
