'use client';
import { copy as contentText } from '@/data/copy';
/** Desktop showcase pins while feature panels translate horizontally; mobile/reduced-motion stack.
 * Focused panels are scrolled into view so keyboard users can traverse the entire pinned region. */
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/motion';
import { robot } from '@/data/robot';
export default function RobotFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => Math.max(0, track.current!.scrollWidth - ref.current!.clientWidth);
        gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            pin: true,
            start: 'top 90px',
            end: () => '+=' + distance(),
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div className="feature-viewport" ref={ref}>
      <div className="feature-track" ref={track}>
        {robot.features.map((f, i) => (
          <article className="feature-panel" key={f.id} aria-labelledby={f.id + '-title'}>
            <div className="feature-image">
              <img
                data-depth="12"
                src={f.image}
                width="1200"
                height="800"
                alt={'Photo needed: Override robot showing ' + f.label.toLowerCase()}
                loading="lazy"
                decoding="async"
              />
              <svg
                className="hotspot-line"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  data-draw
                  d={'M' + f.hotspot.x + ' ' + f.hotspot.y + ' L' + f.hotspot.x + ' 15 L90 15'}
                />
              </svg>
              <span
                className="hotspot"
                style={{ left: f.hotspot.x + '%', top: f.hotspot.y + '%' }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="feature-label mono">
                {f.label}{' '}
                {contentText['components_sections_RobotFeatures']['_design_to_be_confirmed']}
              </span>
            </div>
            <div className="feature-copy">
              <p className="mono text-accent">
                {String(i + 1).padStart(2, '0')} / {f.label}
              </p>
              <h3 id={f.id + '-title'}>{f.title}</h3>
              <p>{f.blurb}</p>
              <span className="spec-line mono">{f.spec}</span>
            </div>
          </article>
        ))}
      </div>
      <p className="horizontal-hint mono">
        {contentText['components_sections_RobotFeatures']['scroll_to_explore_the_design_questions']}
      </p>
    </div>
  );
}
