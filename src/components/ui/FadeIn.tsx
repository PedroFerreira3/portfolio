import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'span';
}

export function FadeIn({ children, delay = 0, className, as: Tag = 'div' }: FadeInProps) {
  const { ref, isVisible } = useFadeInOnScroll<HTMLDivElement>();

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-all duration-[600ms] ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
