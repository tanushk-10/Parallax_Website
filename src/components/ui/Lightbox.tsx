'use client';
import { copy as contentText } from '@/data/copy';
/** Accessible modal image viewer. Escape closes, arrows navigate, Tab stays inside, focus returns. */
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { trapFocus } from '@/lib/motion';
import { robot } from '@/data/robot';
export default function Lightbox({
  index,
  onChange,
  onClose,
}: {
  index: number;
  onChange: (n: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.dispatchEvent(new Event('parallax:menu-open'));
    ref.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange((index + 1) % robot.evolution.length);
      if (e.key === 'ArrowLeft')
        onChange((index + robot.evolution.length - 1) % robot.evolution.length);
      if (ref.current) trapFocus(e, ref.current);
    };
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('keydown', key);
      document.body.style.overflow = overflow;
      window.dispatchEvent(new Event('parallax:menu-close'));
      previous?.focus();
    };
  }, [index, onChange, onClose]);
  const item = robot.evolution[index];
  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={'Robot evolution ' + item.version}
      ref={ref}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="lightbox-close"
        aria-label={contentText['components_ui_Lightbox']['close_image_viewer']}
        onClick={onClose}
      >
        {contentText['components_ui_Lightbox']['close_']}
      </button>
      <div>
        <img
          src={item.image}
          width="1200"
          height="800"
          alt={'Photo needed: robot ' + item.version + ' development view'}
        />
        <div className="lightbox-bottom">
          <button
            aria-label={contentText['components_ui_Lightbox']['previous_image']}
            onClick={() => onChange((index + robot.evolution.length - 1) % robot.evolution.length)}
          >
            ←
          </button>
          <p aria-live="polite">{item.caption}</p>
          <button
            aria-label={contentText['components_ui_Lightbox']['next_image']}
            onClick={() => onChange((index + 1) % robot.evolution.length)}
          >
            →
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
