import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="container-layout border-t border-separator">
      <div className="flex flex-col items-center justify-center gap-2 py-8 font-mono text-xs text-muted">
        <span>
          © 2026 <span className="text-accent">Pedro Ferreira</span>
        </span>
        <span>{t('footer.stack')}</span>
      </div>
    </footer>
  );
}
