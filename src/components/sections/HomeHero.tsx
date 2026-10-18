'use client';
import { copy as contentText } from '@/data/copy';
/** Home's headline, graphic, reticle and mesh use separate scroll and inertial pointer layers. */
import { useRef } from 'react';
import { gsap, useGSAP, pointerOK } from '@/lib/motion';
import Button from '@/components/ui/Button';
import HeroObject from './HeroObject';
import { site } from '@/data/site';
import { publishedMembers } from '@/data/team';
export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (!pointerOK()) return;
      const layers = gsap.utils.toArray<HTMLElement>('[data-pointer]', ref.current);
      const movers = layers.map((el) => ({
        x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'yPercent', { duration: 1.2, ease: 'power3.out' }),
        rate: Number(el.dataset.pointer),
      }));
      const move = (e: PointerEvent) => {
        const r = ref.current!.getBoundingClientRect();
        movers.forEach((m) => {
          m.x((e.clientX / r.width - 0.5) * m.rate);
          m.y(((e.clientY - r.top) / r.height - 0.5) * m.rate * 0.08);
        });
      };
      const leave = () =>
        movers.forEach((m) => {
          m.x(0);
          m.y(0);
        });
      const el = ref.current!;
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      return () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      };
    },
    { scope: ref },
  );
  return (
    <section ref={ref} className="home-hero" aria-labelledby="home-title">
      <div className="hero-grid" data-depth="55" data-pointer="12" aria-hidden="true" />
      <div className="hero-glow" data-depth="90" data-pointer="40" aria-hidden="true" />
      <div className="hero-orbit" data-depth="35" aria-hidden="true">
        <svg viewBox="0 0 900 900">
          <circle cx="450" cy="450" r="370" />
          <circle cx="450" cy="450" r="420" strokeDasharray="2 12" />
          <path d="M0 450h900M450 0v900" />
        </svg>
      </div>
      <div className="container hero-layout">
        <div className="hero-copy" data-depth="22">
          <p className="eyebrow mono">
            <span className="status-dot" />
            {contentText['components_sections_HomeHero']['edison_high_school_vex_v5rc']}
            <br className="mobile-only" />{' '}
            {contentText['components_sections_HomeHero']['_override_202627']}
            {site.teamNumber && ' · ' + site.teamNumber}
          </p>
          <h1 id="home-title">
            <span className="hero-word">
              {contentText['components_sections_HomeHero']['small']}
            </span>{' '}
            <span className="hero-word">{contentText['components_sections_HomeHero']['team']}</span>
            <br />
            <span className="hero-word">
              {contentText['components_sections_HomeHero']['bigger']}
            </span>
            <br />
            <span className="hero-word text-accent">
              {contentText['components_sections_HomeHero']['possibilities']}
            </span>
          </h1>
          <div className="hero-sub">
            <span className="hero-mini-cross" aria-hidden="true">
              +
            </span>
            <p>
              {contentText['components_sections_HomeHero'][
                'were_six_students_turning_shared_parts'
              ].replace('{memberCount}', String(publishedMembers.length))}
              <br className="desktop-only" />{' '}
              {contentText['components_sections_HomeHero']['and_big_ideas_into_our_next']}
            </p>
          </div>
          <div className="button-row">
            <Button href={site.gofundme}>
              {contentText['components_sections_HomeHero']['support_the_team']}
            </Button>
            <Button href="/robot" secondary>
              {contentText['components_sections_HomeHero']['meet_the_robot']}
            </Button>
          </div>
        </div>
        <div className="hero-visual" data-pointer="28" data-depth="65">
          <HeroObject />
          <div className="season-tab mono">
            <span>02</span>
            <div>
              {contentText['components_sections_HomeHero']['second_season']}
              <br />
              <strong>
                {contentText['components_sections_HomeHero']['firstprinciples_thinking']}
              </strong>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-bottom container">
        <a className="scroll-cue mono" href="#who">
          <span>↓</span>
          {contentText['components_sections_HomeHero']['scroll_to_explore']}
        </a>
        <p className="mono">{site.tagline}</p>
        <span className="mono">{contentText['components_sections_HomeHero']['4052_n_7441_w']}</span>
      </div>
    </section>
  );
}
