import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useActiveSection } from '@/hooks/useActiveSection';
import { navLinks, SOCIAL } from '@/data/nav';
import { cn } from '@/lib/utils';

const SECTION_IDS = navLinks.map((l) => l.hash);

export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-6 transition-colors duration-300 sm:px-8 lg:px-20',
        'border-b backdrop-blur-md',
        scrolled ? 'border-border bg-background/85' : 'border-separator bg-background/70',
      )}
    >
      <a href="#" className="font-display text-xl font-bold tracking-tight text-foreground">
        pedro<span className="text-accent">.</span>dev
      </a>

      <ul className="hidden items-center gap-0.5 md:flex">
        {navLinks.map(({ hash, labelKey }) => (
          <li key={hash}>
            <a
              href={`#${hash}`}
              className={cn(
                'rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors duration-200',
                active === hash
                  ? 'text-accent'
                  : 'text-muted hover:bg-surface-secondary hover:text-foreground',
              )}
            >
              {t(labelKey)}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-1.5">
        <LanguageSwitcher />
        <a
          href={SOCIAL.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
          className="hidden h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors duration-200 hover:border-accent hover:text-accent sm:flex"
        >
          <GithubIcon size={15} strokeWidth={1.5} />
        </a>
        <a
          href={SOCIAL.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
          className="hidden h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors duration-200 hover:border-accent hover:text-accent sm:flex"
        >
          <LinkedinIcon size={15} strokeWidth={1.5} />
        </a>
      </div>
    </nav>
  );
}
