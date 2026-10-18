'use client';
/** A single route-scoped motion owner: smooth scroll, staggered reveals, image depth, tilt,
 * counters, draw-on lines, page curtains and cursor. Adjust shared distances/durations here. */
import { usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, useGSAP, motionOK, pointerOK } from '@/lib/motion';

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      let navigateTimer: ReturnType<typeof setTimeout> | undefined;
      const routeClick = (e: MouseEvent) => {
        const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
        if (
          !link ||
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          link.target ||
          link.hasAttribute('download')
        )
          return;
        const url = new URL(link.href, location.href);
        if (
          /\.[a-z0-9]+$/i.test(url.pathname) ||
          url.origin !== location.origin ||
          url.hash ||
          !link.getAttribute('href')?.startsWith('/') ||
          url.pathname.replace(/\/$/, '') === pathname.replace(/\/$/, '')
        )
          return;
        e.preventDefault();
        if (!motionOK()) {
          router.push(url.pathname);
          return;
        }
        gsap.to(curtain.current, {
          scaleY: 1,
          transformOrigin: 'bottom',
          duration: 0.3,
          ease: 'power3.inOut',
          onComplete: () => {
            router.push(url.pathname);
          },
        });
        // A failed navigation must never leave a curtain blocking the page.
        navigateTimer = setTimeout(
          () => gsap.to(curtain.current, { scaleY: 0, duration: 0.3 }),
          3500,
        );
      };
      document.addEventListener('click', routeClick, true);
      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduce: '(prefers-reduced-motion: reduce)',
          desktop: '(min-width: 768px) and (hover: hover) and (pointer: fine)',
        },
        (context) => {
          const { motion, desktop } = context.conditions!;
          const cleanups: (() => void)[] = [];
          let lenis: Lenis | undefined;
          if (motion && desktop) {
            lenis = new Lenis({ duration: 1.1, smoothWheel: true, autoRaf: false });
            lenis.on('scroll', ScrollTrigger.update);
            const tick = (time: number) => lenis?.raf(time * 1000);
            gsap.ticker.add(tick);
            cleanups.push(() => {
              gsap.ticker.remove(tick);
              lenis?.destroy();
            });
          }
          const scroll = (e: Event) => {
            const target = (e as CustomEvent<number | string | HTMLElement>).detail;
            if (lenis)
              lenis.scrollTo(target, {
                offset: typeof target === 'number' ? 0 : -100,
                duration: 1.3,
              });
            else {
              const y =
                typeof target === 'number'
                  ? target
                  : (typeof target === 'string'
                      ? document.querySelector(target)
                      : target
                    )?.getBoundingClientRect().top;
              if (y !== undefined)
                window.scrollTo({
                  top: typeof target === 'number' ? y : y + window.scrollY - 100,
                  behavior: motion ? 'smooth' : 'instant',
                });
            }
          };
          const anchorClick = (e: MouseEvent) => {
            const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
            const hash = a?.getAttribute('href');
            if (hash && hash.length > 1 && document.querySelector(hash)) {
              e.preventDefault();
              scroll(new CustomEvent('scroll', { detail: hash }));
            }
          };
          const pause = () => lenis?.stop();
          const resume = () => lenis?.start();
          window.addEventListener('parallax:menu-open', pause);
          window.addEventListener('parallax:menu-close', resume);
          window.addEventListener('parallax:scroll', scroll);
          document.addEventListener('click', anchorClick);
          cleanups.push(() => {
            window.removeEventListener('parallax:menu-open', pause);
            window.removeEventListener('parallax:menu-close', resume);
            window.removeEventListener('parallax:scroll', scroll);
            document.removeEventListener('click', anchorClick);
          });
          gsap.fromTo(
            curtain.current,
            { scaleY: motion ? 1 : 0, transformOrigin: 'top' },
            { scaleY: 0, duration: motion ? 0.35 : 0 },
          );
          const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]');
          ScrollTrigger.batch(reveals, {
            start: 'top 94%',
            once: true,
            onEnter: (elements) =>
              gsap.fromTo(
                elements,
                { y: motion ? 36 : 0, opacity: 0, clipPath: motion ? 'inset(0 0 12% 0)' : 'none' },
                {
                  y: 0,
                  opacity: 1,
                  clipPath: 'inset(0 0 0% 0)',
                  duration: motion ? 0.85 : 0.22,
                  stagger: motion ? 0.06 : 0,
                  ease: 'power3.out',
                  clearProps: 'transform,clipPath',
                },
              ),
          });
          gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
            const final = Number(el.dataset.count);
            if (!motion) {
              el.textContent = final.toLocaleString();
              return;
            }
            const counter = { value: 0 };
            gsap.to(counter, {
              value: final,
              duration: 1.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 90%', once: true },
              onUpdate: () => {
                el.textContent = Math.round(counter.value).toLocaleString();
              },
            });
          });
          gsap.utils.toArray<SVGPathElement>('[data-draw]').forEach((el) => {
            const length = el.getTotalLength();
            if (motion)
              gsap.fromTo(
                el,
                { strokeDasharray: length, strokeDashoffset: length },
                {
                  strokeDashoffset: 0,
                  duration: 1.4,
                  ease: 'power3.out',
                  scrollTrigger: { trigger: el, start: 'top 90%', once: true },
                },
              );
          });
          if (motion) {
            gsap.utils.toArray<HTMLElement>('[data-depth]').forEach((el) => {
              gsap.fromTo(
                el,
                { y: -Number(el.dataset.depth) },
                {
                  y: Number(el.dataset.depth),
                  ease: 'none',
                  scrollTrigger: {
                    trigger: el.closest('section') || el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                  },
                },
              );
            });
            gsap.utils.toArray<HTMLElement>('.section').forEach((el) => {
              const glow = el.querySelector('.section-glow');
              if (glow)
                gsap.fromTo(
                  glow,
                  { opacity: 0.05, xPercent: -20 },
                  {
                    opacity: 0.17,
                    xPercent: 20,
                    scrollTrigger: {
                      trigger: el,
                      start: 'top bottom',
                      end: 'bottom top',
                      scrub: 1,
                    },
                  },
                );
            });
            const heroWords = gsap.utils.toArray<HTMLElement>('.hero-word');
            gsap.fromTo(
              heroWords,
              { y: 70, opacity: 0, rotationX: -25, filter: 'blur(8px)' },
              {
                y: 0,
                opacity: 1,
                rotationX: 0,
                filter: 'blur(0px)',
                duration: 1,
                stagger: 0.07,
                ease: 'power3.out',
                delay: sessionStorage.getItem('parallax-intro') ? 0.1 : 1.5,
              },
            );
            gsap.to('.scroll-cue', {
              opacity: 0,
              y: -15,
              scrollTrigger: { trigger: '.home-hero', start: 'top top', end: '+=180', scrub: true },
            });
          }
          if (motion && desktop && pointerOK()) {
            gsap.utils.toArray<HTMLElement>('[data-tilt]').forEach((card) => {
              gsap.set(card, { transformPerspective: 900 });
              const x = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' });
              const y = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' });
              const move = (e: PointerEvent) => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                x((0.5 - py) * 5);
                y((px - 0.5) * 5);
                card.style.setProperty('--mx', px * 100 + '%');
                card.style.setProperty('--my', py * 100 + '%');
              };
              const leave = () => {
                x(0);
                y(0);
              };
              card.addEventListener('pointermove', move);
              card.addEventListener('pointerleave', leave);
              cleanups.push(() => {
                card.removeEventListener('pointermove', move);
                card.removeEventListener('pointerleave', leave);
              });
            });
            const cx = gsap.quickTo(cursor.current, 'x', { duration: 0.35, ease: 'power3.out' });
            const cy = gsap.quickTo(cursor.current, 'y', { duration: 0.35, ease: 'power3.out' });
            const move = (e: PointerEvent) => {
              cx(e.clientX);
              cy(e.clientY);
              const target = e.target as HTMLElement;
              const active = target.closest('a,button,[data-cursor]');
              cursor.current?.classList.toggle('cursor-active', !!active);
              cursor.current?.classList.toggle('cursor-text', !!target.closest('p,input,textarea'));
              const label = cursor.current?.querySelector('span');
              if (label) label.textContent = active?.getAttribute('data-cursor') || '';
            };
            document.addEventListener('pointermove', move);
            cleanups.push(() => document.removeEventListener('pointermove', move));
          }
          const refresh = () => ScrollTrigger.refresh();
          const timer = window.setTimeout(refresh, 500);
          window.addEventListener('load', refresh);
          return () => {
            cleanups.forEach((fn) => fn());
            clearTimeout(timer);
            window.removeEventListener('load', refresh);
          };
        },
      );
      return () => {
        mm.revert();
        clearTimeout(navigateTimer);
        document.removeEventListener('click', routeClick, true);
      };
    },
    { scope: root, dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <div ref={root}>
      <div ref={curtain} className="route-curtain" aria-hidden="true" />
      {children}
      <div className="custom-cursor" ref={cursor} aria-hidden="true">
        <i />
        <span />
      </div>
      <div className="film-grain" aria-hidden="true" />
    </div>
  );
}
