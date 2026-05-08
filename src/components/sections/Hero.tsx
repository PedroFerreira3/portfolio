import { useTranslation } from 'react-i18next';
import { ArrowRight, Download } from 'lucide-react';
import FloatingLines from '@/components/ui/FloatingLines';

export function Hero() {
  const { t, i18n } = useTranslation('hero');
  const cvFile = i18n.language === 'pt-BR' ? 'Curriculo.pdf' : 'Resume.pdf';
  const cvHref = `${import.meta.env.BASE_URL}cv/${cvFile}`;

  return (
    <section
      id="hero"
      className="container-layout relative flex min-h-screen flex-col justify-center pb-20 pt-32"
    >
      {/* FloatingLines canvas — full viewport, behind everything */}
      <div
        className="pointer-events-none absolute top-0 -z-10 h-full"
        style={{ left: 'calc(50% - 50vw)', width: '100vw' }}
      >
        <FloatingLines
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={13}
          lineDistance={8}
          bendRadius={8}
          bendStrength={-2}
          interactive={true}
          parallax={false}
          animationSpeed={1}
          linesGradient={['#20c0d9', '#0059a9', '#c7151f']}
        />
      </div>
      {/* Gradient overlay — ensures text stays readable over the animated lines */}
      <div
        className="pointer-events-none absolute top-0 -z-[5] h-full bg-gradient-to-r from-background via-background/70 to-background/15"
        style={{ left: 'calc(50% - 50vw)', width: '100vw' }}
      />
      {/* Bottom fade — dissolves into the next section */}
      <div
        className="pointer-events-none absolute bottom-0 -z-[5] h-48 bg-gradient-to-b from-transparent to-background"
        style={{ left: 'calc(50% - 50vw)', width: '100vw' }}
      />
      <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 font-mono text-xs text-accent">
        <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-500" />
        {t('badge')}
      </div>

      <h1 className="text-fluid-5xl mb-4 font-display font-bold leading-none tracking-tight">
        {t('firstName')}
        <br />
        <span className="text-accent">{t('lastName')}</span>
      </h1>

      <p className="text-fluid-2xl mb-6 font-display font-normal text-foreground/70">{t('role')}</p>

      <p className="text-fluid-lg mb-10 max-w-xl leading-relaxed text-foreground/60">
        {t('description')}
      </p>

      <div className="mb-14 flex flex-wrap gap-3">
        <a
          href="#projetos"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3 font-body text-sm font-semibold text-accent-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
        >
          {t('ctaPrimary')}
          <ArrowRight size={16} strokeWidth={2} />
        </a>
        <a
          href={cvHref}
          download
          className="inline-flex items-center gap-2 rounded-md border border-border bg-transparent px-7 py-3 font-body text-sm font-medium text-foreground transition-all duration-200 hover:border-accent hover:text-accent active:scale-[0.97]"
        >
          <Download size={16} strokeWidth={2} />
          {t('ctaSecondary')}
        </a>
      </div>
    </section>
  );
}
