'use client';
import { copy as contentText } from '@/data/copy';
/** Four pinned narrative chapters cross over as the reader scrolls. Mobile and reduced-motion
 * expose every chapter in the document flow; no information depends on animation. */
import { useRef } from 'react';
import { chapters } from '@/data/story';
import { gsap, useGSAP } from '@/lib/motion';
export default function StoryNarrative() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('.story-chapter', ref.current);
        gsap.set(panels.slice(1), { autoAlpha: 0, y: 40 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 130px',
            end: '+=2400',
            pin: true,
            scrub: 0.7,
          },
        });
        panels.forEach((panel, i) => {
          if (i > 0) {
            tl.to(panels[i - 1], { autoAlpha: 0, y: -40, duration: 0.4 }).to(
              panel,
              { autoAlpha: 1, y: 0, duration: 0.6 },
              '<0.2',
            );
          }
          tl.to({}, { duration: 0.8 });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div className="story-narrative" ref={ref}>
      <div className="story-sticky-label">
        <span className="mono">
          {contentText['components_sections_StoryNarrative']['the_reason_we_build']}
        </span>
        <div className="story-graphic" aria-hidden="true">
          <div />
          <div />
          <div />
          <span>{contentText['components_sections_StoryNarrative']['prx']}</span>
        </div>
        <p className="mono">
          {contentText['components_sections_StoryNarrative']['founded_2025']}
          <br />
          {contentText['components_sections_StoryNarrative']['still_getting_started']}
        </p>
      </div>
      <div className="story-chapters">
        {chapters.map((c) => (
          <article className="story-chapter" key={c.number}>
            <span className="chapter-number mono">{c.number} / 04</span>
            <h2>{c.title}</h2>
            <p>{c.blurb}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
