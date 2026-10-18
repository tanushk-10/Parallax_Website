'use client';
/** Magnetic links/buttons spring to the pointer and release a click ripple. Native focus remains. */
import Link from 'next/link';
import { useRef } from 'react';
import { gsap, pointerOK } from '@/lib/motion';
type Props = {
  href?: string;
  children: React.ReactNode;
  secondary?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
};
export default function Button({
  href,
  children,
  secondary,
  className = '',
  type = 'button',
  disabled,
  onClick,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const move = (e: React.PointerEvent) => {
    if (!pointerOK() || !ref.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - r.left - r.width / 2) * 0.18,
      y: (e.clientY - r.top - r.height / 2) * 0.25,
      duration: 0.35,
      ease: 'power3.out',
    });
  };
  const leave = () =>
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1,0.5)' });
  const click = (e: React.MouseEvent) => {
    if (pointerOK()) {
      const ripple = document.createElement('i');
      ripple.className = 'button-ripple';
      e.currentTarget.appendChild(ripple);
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 0.3 },
        { scale: 1, opacity: 0, duration: 0.65, onComplete: () => ripple.remove() },
      );
    }
    onClick?.();
  };
  const common = {
    className: 'button ' + (secondary ? 'button-secondary ' : '') + className,
    onPointerMove: move,
    onPointerLeave: leave,
    onClick: click,
  };
  const content = (
    <span ref={ref} className="button-label">
      {children}
      <span className="button-arrow" aria-hidden="true">
        ↗
      </span>
    </span>
  );
  if (href && (href.startsWith('http') || href.startsWith('mailto:') || href.endsWith('.pdf'))) {
    const newTab = href.startsWith('http') || href.endsWith('.pdf');
    return (
      <a
        href={href}
        {...common}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }
  if (href)
    return (
      <Link href={href} {...common}>
        {content}
      </Link>
    );
  return (
    <button {...common} type={type} disabled={disabled}>
      {content}
    </button>
  );
}
