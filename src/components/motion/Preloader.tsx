'use client';
import { copy as contentText } from '@/data/copy';
/** One-session branded intro. Change the timeline for timing; reduced motion is a 250ms fade. */
import { useRef } from 'react';
import { gsap, useGSAP, motionOK } from '@/lib/motion';
export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      let seen = false;
      try {
        seen = sessionStorage.getItem('parallax-intro') === '1';
      } catch {}
      const finish = () => {
        try {
          sessionStorage.setItem('parallax-intro', '1');
        } catch {}
        gsap.set(ref.current, { display: 'none' });
      };
      if (seen) {
        gsap.set(ref.current, { display: 'none' });
        return;
      }
      gsap.set(ref.current, { visibility: 'visible' });
      if (!motionOK()) {
        gsap.to(ref.current, { opacity: 0, duration: 0.25, onComplete: finish });
        return;
      }
      const counter = { value: 0 };
      const tl = gsap.timeline({ onComplete: finish });
      tl.from('.loader-letter', {
        y: 65,
        rotation: 8,
        opacity: 0,
        stagger: 0.05,
        duration: 0.65,
        ease: 'power3.out',
      })
        .to(
          counter,
          {
            value: 100,
            duration: 1.3,
            ease: 'power3.inOut',
            onUpdate: () => {
              if (count.current)
                count.current.textContent = String(Math.round(counter.value)).padStart(3, '0');
            },
          },
          0,
        )
        .to(
          '.loader-panel',
          { clipPath: 'inset(0 0 100% 0)', stagger: 0.08, duration: 0.55, ease: 'power3.inOut' },
          1.4,
        )
        .to('.loader-content', { opacity: 0, y: -25, duration: 0.35 }, 1.35);
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className="preloader" aria-hidden="true">
      <div className="loader-panel" />
      <div className="loader-panel" />
      <div className="loader-content">
        <div>
          {'PARALLAX'.split('').map((c, i) => (
            <span className="loader-letter" key={i}>
              {c}
            </span>
          ))}
        </div>
        <p className="mono">
          {contentText['components_motion_Preloader']['building_what_comes_next']}
          <span ref={count}>000</span> / 100
        </p>
      </div>
    </div>
  );
}
