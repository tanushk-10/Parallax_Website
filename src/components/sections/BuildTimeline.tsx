'use client';
import { copy as contentText } from '@/data/copy';
/** Build process progresses horizontally with scroll on desktop, vertically on small screens.
 * The SVG spine draws as the planned phases enter view. No phase is presented as completed. */
import { useRef } from 'react';
import { robot } from '@/data/robot';
import { gsap, useGSAP } from '@/lib/motion';
export default function BuildTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.to(track.current, {
          x: () => -(track.current!.scrollWidth - ref.current!.clientWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 140px',
            end: '+=1800',
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div className="build-timeline" ref={ref}>
      <div className="build-track" ref={track}>
        {robot.buildTimeline.map((p, i) => (
          <article className="build-phase" key={p.phase}>
            <svg viewBox="0 0 300 24" aria-hidden="true">
              <path data-draw d="M0 12H300" />
              <circle cx="12" cy="12" r="7" />
            </svg>
            <span className="mono">
              {String(i + 1).padStart(2, '0')}{' '}
              {contentText['components_sections_BuildTimeline']['_planned_phase']}
            </span>
            <h3>{p.phase}</h3>
            <h4>{p.title}</h4>
            <p>{p.blurb}</p>
            {p.date && <time>{p.date}</time>}
          </article>
        ))}
      </div>
    </div>
  );
}
