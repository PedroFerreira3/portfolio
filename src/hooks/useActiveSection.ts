import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[], rootMarginTop = '-40%'): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0 && visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: `${rootMarginTop} 0px -50% 0px`, threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, rootMarginTop]);

  return active;
}
