'use client';
import { copy as contentText } from '@/data/copy';
/** Roster filters are generated from published groups. GSAP Flip preserves each card's visual position. */
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Link from 'next/link';
import { publishedMembers, groupLabels } from '@/data/team';
import { Flip, gsap, motionOK } from '@/lib/motion';
export default function TeamGrid() {
  const [filter, setFilter] = useState('all');
  const ref = useRef<HTMLDivElement>(null);
  const priority = ['build', 'code', 'outreach', 'media', 'notebook', 'tbd'];
  const groups = [...new Set(publishedMembers.map((m) => m.group))].sort(
    (a, b) => priority.indexOf(a) - priority.indexOf(b),
  );
  const choose = (group: string) => {
    const state = Flip.getState(ref.current?.querySelectorAll('.member-card') || []);
    flushSync(() => setFilter(group));
    if (motionOK())
      Flip.from(state, {
        duration: 0.65,
        ease: 'power3.inOut',
        absolute: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.4 },
          ),
      });
  };
  return (
    <>
      <div
        className="filter-bar"
        role="group"
        aria-label={contentText['components_sections_TeamGrid']['filter_members_by_group']}
      >
        <button aria-pressed={filter === 'all'} onClick={() => choose('all')}>
          {contentText['components_sections_TeamGrid']['all']}
          <span>{publishedMembers.length}</span>
        </button>
        {groups.map((g) => (
          <button key={g} aria-pressed={filter === g} onClick={() => choose(g)}>
            {groupLabels[g]} <span>{publishedMembers.filter((m) => m.group === g).length}</span>
          </button>
        ))}
      </div>
      <div className="team-grid" ref={ref}>
        {publishedMembers
          .filter((m) => filter === 'all' || m.group === filter)
          .map((m, i) => (
            <article className="member-card" data-flip-id={m.id} key={m.id} data-reveal data-tilt>
              <div className="member-image">
                {m.photo ? (
                  <img
                    data-depth="12"
                    src={m.photo}
                    alt={'Portrait of ' + m.name}
                    width="600"
                    height="680"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div
                    className="initials-avatar"
                    role="img"
                    aria-label={'Initials avatar for ' + m.name}
                  >
                    <div className="avatar-orbit" />
                    <span>
                      {m.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </span>
                    <small className="mono">
                      {contentText['components_sections_TeamGrid']['portrait_to_come']}
                    </small>
                  </div>
                )}
                <span className="member-number mono">
                  {String(i + 1).padStart(2, '0')}{' '}
                  {contentText['components_sections_TeamGrid']['_prx']}
                </span>
                {m.founder && (
                  <span className="founder-badge mono">
                    {contentText['components_sections_TeamGrid']['founder']}
                  </span>
                )}
              </div>
              <div className="member-info">
                <span className="mono role-label">{m.role}</span>
                <h3>{m.name}</h3>
                <p>{m.bio}</p>
              </div>
            </article>
          ))}
        <Link className="join-card" href="/contact" data-reveal>
          <span className="join-plus" aria-hidden="true">
            +
          </span>
          <div>
            <span className="mono">
              {contentText['components_sections_TeamGrid']['theres_room_at_the_bench']}
            </span>
            <h3>
              {contentText['components_sections_TeamGrid']['this_could']}
              <br />
              {contentText['components_sections_TeamGrid']['be_you']}
            </h3>
            <span className="text-link">
              {contentText['components_sections_TeamGrid']['start_a_conversation_']}
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}
