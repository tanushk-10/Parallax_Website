'use client';
import { copy as contentText } from '@/data/copy';
/** Lightweight concept drawing remains visible until WebGL is ready, and is the no-WebGL fallback.
 * Three.js loads only after idle time. This is abstract concept art, never a claimed robot design. */
import dynamic from 'next/dynamic';
import { Component, useEffect, useRef, useState } from 'react';
import { pointerOK } from '@/lib/motion';
const Scene = dynamic(() => import('./RobotScene'), { ssr: false, loading: () => null });
class SceneBoundary extends Component<
  { children: React.ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
function ConceptFallback() {
  return (
    <div className="concept-fallback" aria-hidden="true">
      <svg viewBox="0 0 720 650" fill="none">
        <defs>
          <linearGradient
            id="plate"
            x1="100"
            y1="150"
            x2="600"
            y2="500"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6b706e" />
            <stop offset=".45" stopColor="#252c2d" />
            <stop offset="1" stopColor="#121717" />
          </linearGradient>
          <linearGradient id="copper">
            <stop stopColor="#ffbb78" />
            <stop offset=".4" stopColor="#ff6b2c" />
            <stop offset="1" stopColor="#7e2c12" />
          </linearGradient>
        </defs>
        <ellipse cx="370" cy="520" rx="220" ry="45" fill="#ff6b2c" opacity=".07" />
        <g transform="translate(65 70) rotate(-15 300 250)">
          <path d="m100 320 220-120 230 130-220 120z" fill="url(#plate)" stroke="#626a68" />
          <path
            d="m100 320 0 35 230 130v-35zm230 130 220-120v35L330 485"
            fill="#141b1d"
            stroke="#505a58"
          />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={'translate(' + i * 98 + ' ' + -i * 52 + ')'}>
              <ellipse
                cx="130"
                cy="383"
                rx="38"
                ry="52"
                fill="#111718"
                stroke="#525955"
                strokeWidth="9"
              />
              <ellipse cx="130" cy="383" rx="23" ry="34" stroke="url(#copper)" strokeWidth="11" />
              <path d="m130 350 0 66m-20-50 40 35" stroke="#a9b0a5" strokeWidth="3" />
            </g>
          ))}
          <path d="m140 250 180-100 200 115-180 102z" fill="url(#plate)" stroke="#a2a89d" />
          <path
            d="M140 250v22l200 116v-21zm200 117 180-102v22L340 388"
            fill="#313b37"
            stroke="#69736b"
          />
          <path d="m180 225 142-78 150 87-140 80z" stroke="#ff854a" strokeWidth="3" />
          <path d="m220 202 100-55 110 63-100 56z" stroke="#ff854a" opacity=".4" />
          <path
            d="m225 145 100-56 115 67-101 57z"
            fill="#272e29"
            fillOpacity=".65"
            stroke="#ff9d60"
          />
          <path
            d="m225 145 0 35 114 67v-34zm114 68 101-57v35l-101 56"
            fill="#1b211e"
            stroke="#9b693e"
          />
          <ellipse cx="330" cy="150" rx="35" ry="20" fill="url(#copper)" />
          <ellipse cx="330" cy="150" rx="17" ry="9" fill="#101819" />
          <path
            d="M180 225v-60m285 68v-60M225 145V90m215 65V95"
            stroke="#929e90"
            strokeDasharray="4 7"
          />
          <path
            d="m140 250 200 117 180-102M100 320l230 130 220-120"
            stroke="#ff9a5a"
            opacity=".25"
          />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={175 + i * 29} cy={275 + i * 17} r="3" fill="#c9d1bd" />
          ))}
        </g>
      </svg>
    </div>
  );
}
export default function HeroObject() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    try {
      const canvas = document.createElement('canvas');
      if (pointerOK() && (canvas.getContext('webgl2') || canvas.getContext('webgl')))
        timer = setTimeout(() => setLoad(true), 2200);
    } catch {}
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (ref.current) observer.observe(ref.current);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
  return (
    <div
      className={'hero-object ' + (ready ? 'scene-ready' : '')}
      ref={ref}
      role="img"
      aria-label={
        contentText['components_sections_HeroObject'][
          'abstract_exploded_drivetrain_concept_in_orange'
        ]
      }
    >
      <ConceptFallback />
      {load && (
        <SceneBoundary onFailure={() => setReady(false)}>
          <Scene active={visible} onReady={() => setReady(true)} />
        </SceneBoundary>
      )}
      <span className="object-coordinate mono coordinate-top">
        {contentText['components_sections_HeroObject']['fig_01_exploded_view']}
      </span>
      <span className="object-coordinate mono coordinate-bottom">
        {contentText['components_sections_HeroObject']['concept_study']}
        <br />
        {contentText['components_sections_HeroObject']['actual_robot_photos_to_come']}
      </span>
      <svg className="object-cross" viewBox="0 0 30 30" aria-hidden="true">
        <path d="M15 0v30M0 15h30" />
      </svg>
    </div>
  );
}
