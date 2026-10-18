'use client';
import { copy as contentText } from '@/data/copy';
/** Glass header compacts after 80px, follows scroll direction and traps focus in the mobile menu. */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap, motionOK, trapFocus } from '@/lib/motion';
import { site } from '@/data/site';
export function Mark() {
  return (
    <svg className="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M5 30V11L20 3l15 8v10L20 29v8" stroke="currentColor" strokeWidth="3" />
      <path d="m5 11 15 8 15-8M20 19v10M11 33V15" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}
export default function Header() {
  const pathname = usePathname().replace(/\/$/, '') || '/';
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let previous = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      setCompact(y > 80);
      setHidden(y > previous && y > 400);
      previous = y;
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const returnFocus = toggle.current;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.dispatchEvent(new Event('parallax:menu-open'));
    const context = gsap.context(() => {
      gsap.fromTo(
        '.mobile-link',
        { y: motionOK() ? 25 : 0, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: motionOK() ? 0.055 : 0,
          duration: motionOK() ? 0.6 : 0.2,
          ease: 'power3.out',
        },
      );
    }, menu);
    menu.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (menu.current) trapFocus(e, menu.current);
    };
    document.addEventListener('keydown', key);
    return () => {
      window.dispatchEvent(new Event('parallax:menu-close'));
      document.body.style.overflow = oldOverflow;
      document.removeEventListener('keydown', key);
      context.revert();
      returnFocus?.focus();
    };
  }, [open]);
  useEffect(() => {
    const update = () => {
      const active = nav.current?.querySelector<HTMLElement>('[aria-current="page"]');
      gsap.to(indicator.current, {
        x: active?.offsetLeft || 0,
        width: active?.offsetWidth || 0,
        opacity: active ? 1 : 0,
        duration: motionOK() ? 0.45 : 0,
        ease: 'power3.out',
      });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [pathname]);
  return (
    <>
      <header
        className={
          'site-header ' + (compact ? 'is-compact ' : '') + (hidden && !open ? 'is-hidden' : '')
        }
      >
        <Link
          className="brand"
          href="/"
          aria-label={contentText['components_layout_Header']['parallax_robotics_home']}
        >
          <Mark />
          <span>
            {contentText['components_layout_Header']['parallax']}{' '}
            <small>{contentText['components_layout_Header']['robotics']}</small>
          </span>
        </Link>
        <nav
          ref={nav}
          className="desktop-nav"
          aria-label={contentText['components_layout_Header']['main_navigation']}
        >
          <span className="nav-indicator" ref={indicator} aria-hidden="true" />
          {site.nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? 'active' : ''}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link
            href={site.gofundme}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-donate"
          >
            {contentText['components_layout_Header']['support_us']}
            <span aria-hidden="true">↗</span>
          </Link>
          <button
            className="menu-toggle"
            ref={toggle}
            aria-label={contentText['components_layout_Header']['open_navigation_menu']}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      {open && (
        <div
          className="mobile-menu"
          id="mobile-menu"
          ref={menu}
          role="dialog"
          aria-modal="true"
          aria-label={contentText['components_layout_Header']['navigation']}
        >
          <div className="mobile-menu-top">
            <span className="mono">
              {contentText['components_layout_Header']['parallax_explore']}
            </span>
            <button
              aria-label={contentText['components_layout_Header']['close_navigation_menu']}
              onClick={() => setOpen(false)}
            >
              {contentText['components_layout_Header']['close_']}
            </button>
          </div>
          <nav aria-label={contentText['components_layout_Header']['mobile_navigation']}>
            {site.nav.map((item, i) => (
              <Link
                className="mobile-link"
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                <span className="mono">0{i + 1}</span>
                {item.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
          <a href={'mailto:' + site.email}>{site.email}</a>
        </div>
      )}
    </>
  );
}
