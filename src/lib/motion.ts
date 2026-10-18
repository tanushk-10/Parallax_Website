/** Shared GSAP defaults and a single motion preference gate. Scroll effects are scoped by useGSAP. */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);
export { gsap, ScrollTrigger, Flip, useGSAP };
export const ease = 'power3.out';
export const duration = 0.85;
gsap.defaults({ ease, duration });
export const motionOK = () =>
  typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const pointerOK = () =>
  motionOK() && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
export function scrollToTarget(target: number | string | HTMLElement) {
  const event = new CustomEvent('parallax:scroll', { detail: target });
  window.dispatchEvent(event);
}
export function trapFocus(event: KeyboardEvent, container: HTMLElement) {
  if (event.key !== 'Tab') return;
  const elements = Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),input,textarea,select,[tabindex="0"]',
    ),
  ).filter((el) => el.getClientRects().length > 0);
  const first = elements[0],
    last = elements[elements.length - 1];
  if (!first) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
