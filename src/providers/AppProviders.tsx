import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { I18nextProvider } from 'react-i18next';
import { I18nProvider } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { Suspense, type ReactNode } from 'react';
import i18n from '@/i18n/config';

interface AppProvidersProps {
  children: ReactNode;
}

function HeroUIWithLocale({ children }: { children: ReactNode }) {
  const { i18n: i18next } = useTranslation();
  return <I18nProvider locale={i18next.language}>{children}</I18nProvider>;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" themes={['light', 'dark']} enableSystem>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={null}>
          <HeroUIWithLocale>{children}</HeroUIWithLocale>
        </Suspense>
      </I18nextProvider>
    </NextThemesProvider>
  );
}
