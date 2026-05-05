import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

const LOCALES: { code: Locale; short: string }[] = [
  { code: 'pt-BR', short: 'PT' },
  { code: 'en', short: 'EN' },
  { code: 'es', short: 'ES' },
];

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation('common');
  const current = i18n.language as Locale;

  return (
    <div
      role="group"
      aria-label={t('language.switch')}
      className="flex items-center gap-0.5 rounded-md border border-border bg-transparent p-0.5"
    >
      {LOCALES.map(({ code, short }) => {
        const isActive = current === code || current.startsWith(code.split('-')[0] ?? code);
        return (
          <button
            key={code}
            type="button"
            onClick={() => void i18n.changeLanguage(code)}
            aria-pressed={isActive}
            aria-label={t(`language.${code}`)}
            className={cn(
              'rounded-sm px-2 py-1 font-mono text-[11px] font-medium tracking-wide transition-colors duration-200',
              isActive ? 'bg-surface-secondary text-accent' : 'text-muted hover:text-foreground',
            )}
          >
            {short}
          </button>
        );
      })}
    </div>
  );
}
