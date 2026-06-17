import { useEffect, type RefObject } from 'react';

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useReveal(
  ref: RefObject<HTMLElement | null>,
  options: UseRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px 0px -40px 0px' } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    const elements = ref.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);
}
