'use client';
import { copy as contentText } from '@/data/copy';
/** Gallery opens a separately loaded lightbox. Planned versions remain explicitly labeled. */
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { robot } from '@/data/robot';
const Lightbox = dynamic(() => import('@/components/ui/Lightbox'), { ssr: false });
export default function EvolutionGallery() {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  return (
    <>
      <div className="evolution-grid">
        {robot.evolution.map((item, i) => (
          <button
            key={item.version}
            className="evolution-card"
            data-reveal
            data-cursor={contentText['components_sections_EvolutionGallery']['view']}
            onClick={() => setIndex(i)}
            aria-label={'Open ' + item.version + ' image placeholder'}
          >
            <div className="gallery-image">
              <img
                data-depth="10"
                src={item.image}
                alt={'Photo needed: ' + item.version + ' robot development view'}
                width="900"
                height="600"
                loading="lazy"
                decoding="async"
              />
              <span aria-hidden="true">↗</span>
            </div>
            <div className="evolution-caption">
              <h3>{item.version.toUpperCase()}</h3>
              <span className="mono">
                {contentText['components_sections_EvolutionGallery']['planned_image_slot']}
              </span>
            </div>
            <p>{item.caption}</p>
          </button>
        ))}
      </div>
      {index !== null && <Lightbox index={index} onChange={setIndex} onClose={close} />}
    </>
  );
}
