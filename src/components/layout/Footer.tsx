'use client';
import { copy as contentText } from '@/data/copy';
/** Footer wordmark reveals through shared scroll motion; the top control tracks page progress. */
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { site } from '@/data/site';
import { Mark } from './Header';
import { scrollToTarget, gsap, motionOK } from '@/lib/motion';
export default function Footer() {
  const ring = useRef<SVGCircleElement>(null);
  const top = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      if (ring.current) ring.current.style.strokeDashoffset = String(151 * (1 - progress));
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Link href="/" className="brand">
            <Mark />
            <span>
              {contentText['components_layout_Footer']['parallax']}
              <small>
                {contentText['components_layout_Footer']['robotics']}
                {site.teamNumber && ' · ' + site.teamNumber}
              </small>
            </span>
          </Link>
          <p>{site.tagline}</p>
          <button
            className="back-top"
            ref={top}
            aria-label={contentText['components_layout_Footer']['back_to_top']}
            onClick={() => {
              scrollToTarget(0);
              if (motionOK())
                gsap.fromTo(
                  top.current,
                  { y: 0 },
                  { y: -6, yoyo: true, repeat: 1, duration: 0.3, delay: 1.2, ease: 'back.out' },
                );
            }}
          >
            <svg viewBox="0 0 56 56" aria-hidden="true">
              <circle cx="28" cy="28" r="24" />
              <circle ref={ring} className="progress-ring" cx="28" cy="28" r="24" />
            </svg>
            <span aria-hidden="true">↑</span>
          </button>
        </div>
        <div className="footer-links">
          <div>
            <span className="mono">{contentText['components_layout_Footer']['explore']}</span>
            <nav aria-label={contentText['components_layout_Footer']['footer_navigation']}>
              {site.nav.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <span className="mono">{contentText['components_layout_Footer']['say_hello']}</span>
            <div>
              {site.socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  {...(s.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>
          <div className="footer-location">
            <span className="mono">
              {contentText['components_layout_Footer']['built_in_edison']}
            </span>
            <p>
              {contentText['components_layout_Footer']['edison_high_school']}
              <br />
              {site.city}
              <br />
              <small>
                {contentText['components_layout_Footer']['studentled_since']}
                {site.foundingYear}.
              </small>
            </p>
          </div>
        </div>
        <div className="footer-wordmark" data-reveal aria-hidden="true">
          {contentText['components_layout_Footer']['parallax']}
          <span>26/27</span>
        </div>
        <div className="footer-bottom mono">
          <span>
            © {new Date().getFullYear()}{' '}
            {contentText['components_layout_Footer']['parallax_robotics']}
          </span>
          <span>{contentText['components_layout_Footer']['small_team_big_field_of_view']}</span>
          <span>{contentText['components_layout_Footer']['vex_v5rc_override_202627']}</span>
        </div>
      </div>
    </footer>
  );
}
