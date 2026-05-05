import { cn } from '@/lib/utils';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'text-fluid-sm mb-4 inline-block font-mono font-medium tracking-wider text-accent',
        className,
      )}
    >
      {children}
    </span>
  );
}
