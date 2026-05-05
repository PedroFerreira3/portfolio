import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useTranslation('common');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      aria-label={t('theme.toggle')}
      title={t('theme.toggle')}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-transparent text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
    >
      {mounted ? <Icon size={15} strokeWidth={1.5} /> : <span className="h-[15px] w-[15px]" />}
    </button>
  );
}
