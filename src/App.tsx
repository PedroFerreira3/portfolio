import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n, t } = useTranslation('common');

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <main className="container-layout flex min-h-screen flex-col items-center justify-center gap-6 py-24 text-center">
      <span className="text-fluid-sm font-mono text-accent">// scaffolding</span>
      <h1 className="text-fluid-4xl font-bold">{t('app.title', 'Portfolio em construção')}</h1>
      <p className="text-fluid-base max-w-md text-muted">
        {t(
          'app.scaffolding',
          'Estrutura inicial pronta. Próximo passo: implementar as seções seguindo o design system.',
        )}
      </p>
      <code className="text-fluid-sm rounded-md bg-surface-secondary px-3 py-1.5 text-accent">
        npm run dev
      </code>
    </main>
  );
}

export default App;
