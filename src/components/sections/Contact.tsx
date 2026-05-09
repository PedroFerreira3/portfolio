import { type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Mail, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { FadeIn } from '@/components/ui/FadeIn';
import { SOCIAL } from '@/data/nav';

const LINKS = [
  {
    id: 'linkedin',
    href: SOCIAL.linkedin,
    icon: LinkedinIcon,
    sub: 'linkedin.com/in/pedro-ferreira021',
  },
  {
    id: 'github',
    href: SOCIAL.github,
    icon: GithubIcon,
    sub: 'github.com/PedroFerreira3',
  },
  {
    id: 'email',
    href: `mailto:${SOCIAL.email}`,
    icon: Mail,
    sub: SOCIAL.email,
  },
] as const;

export function Contact() {
  const { t } = useTranslation('contact');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') ?? '');
    const email = String(form.get('email') ?? '');
    const subjectInput = String(form.get('subject') ?? '');
    const subject = subjectInput || t('form.subjectDefault');
    const message = String(form.get('message') ?? '');

    const body = `${message}\n\n— ${name} (${email})`;
    const mailto = `mailto:${SOCIAL.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  const inputClass =
    'w-full rounded-md border border-border bg-surface-secondary px-3.5 py-2.5 font-body text-sm text-foreground placeholder:text-muted/60 outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20';

  return (
    <section id="contato" className="container-layout py-20 lg:py-28">
      <FadeIn>
        <h2 className="text-fluid-3xl mb-4 font-display font-semibold leading-tight tracking-tight">
          {t('title')}
        </h2>
        <p className="text-fluid-base mb-12 max-w-xl leading-relaxed text-muted">{t('subtitle')}</p>
      </FadeIn>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeIn>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted">{t('form.name')}</span>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder={t('form.namePlaceholder')}
                  className={inputClass}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted">{t('form.email')}</span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={t('form.emailPlaceholder')}
                  className={inputClass}
                />
              </label>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted">{t('form.subject')}</span>
              <input
                name="subject"
                type="text"
                placeholder={t('form.subjectPlaceholder')}
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted">{t('form.message')}</span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder={t('form.messagePlaceholder')}
                className={`${inputClass} min-h-[120px] resize-y`}
              />
            </label>
            <button
              type="submit"
              className="inline-flex w-fit items-center gap-2 rounded-md bg-accent px-7 py-3 font-body text-sm font-semibold text-accent-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
            >
              <Send size={16} strokeWidth={2} />
              {t('form.submit')}
            </button>
          </form>
        </FadeIn>

        <FadeIn delay={100} className="lg:pt-[22px]">
          <div className="flex flex-col gap-4">
            {LINKS.map(({ id, href, icon: Icon, sub }) => (
              <a
                key={id}
                href={href}
                target={id === 'email' ? undefined : '_blank'}
                rel={id === 'email' ? undefined : 'noopener noreferrer'}
                className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-5 transition-colors duration-200 hover:border-accent hover:bg-accent/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Icon size={18} strokeWidth={1.5} className="text-accent" />
                </div>
                <div className="flex-1">
                  <div className="font-display text-[15px] font-semibold text-foreground">
                    {t(`links.${id}`)}
                  </div>
                  <div className="text-xs text-muted">{sub}</div>
                </div>
                <ArrowUpRight
                  size={14}
                  strokeWidth={2}
                  className="text-muted transition-colors duration-200 group-hover:text-accent"
                />
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
