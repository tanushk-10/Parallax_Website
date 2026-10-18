import { copy as contentText } from '@/data/copy'; /** Home progresses from student identity to game, build and support, with layered section motion. */
import Link from 'next/link';
import SponsorLogo from '@/components/ui/SponsorLogo';
import HomeHero from '@/components/sections/HomeHero';
import CTABand from '@/components/sections/CTABand';
import Section from '@/components/ui/Section';
import Photo from '@/components/ui/Photo';
import { site } from '@/data/site';
import { stats } from '@/data/stats';
import { sponsors } from '@/data/sponsors';
import { pageMeta } from '@/lib/metadata';
export const metadata = pageMeta(
  contentText['app_page']['studentbuilt_communitybacked'],
  contentText['app_page']['meet_parallax_robotics_six_students_at'],
  '/',
);
const gameCards = [
  {
    title: contentText['app_page']['stack'],
    label: contentText['app_page']['01_build_it_up'],
    description: contentText['app_page']['stack_pins_and_cups_on_goals'],
    path: 'M12 48h48M20 44V32h32v12M25 28V16h22v12M31 12V4h10v8',
  },
  {
    title: contentText['app_page']['toggle'],
    label: contentText['app_page']['02_change_the_field'],
    description: contentText['app_page']['set_toggles_to_your_alliance_color'],
    path: 'M12 28h48M24 16h28v24H24zM12 21v14M60 21v14M24 28h20',
  },
  {
    title: contentText['app_page']['midfield'],
    label: contentText['app_page']['03_find_your_place'],
    description: contentText['app_page']['finish_the_match_with_your_robot'],
    path: 'M8 8h48v48H8zM8 32h48M32 8v48M21 21h22v22H21z',
  },
  {
    title: contentText['app_page']['endgame'],
    label: contentText['app_page']['04_make_it_count'],
    description: contentText['app_page']['the_last_10_seconds_bring_a'],
    path: 'M22 5h20M32 5v8M48 14l6-6M32 22v14l10 7M54 37a22 22 0 1 1-44 0 22 22 0 0 1 44 0',
  },
];
export default function Home() {
  return (
    <>
      <HomeHero />
      <Section
        id="who"
        label={contentText['app_page']['01_more_than_a_machine']}
        className="who-section"
      >
        <div className="who-grid">
          <div>
            <p className="overline" data-reveal>
              {contentText['app_page']['young_team_long_view']}
            </p>
            <h2 data-reveal>
              {contentText['app_page']['we_build_robots']}
              <br />
              {contentText['app_page']['and_a_way']}
              <br />
              <span className="text-muted">{contentText['app_page']['forward']}</span>
            </h2>
            <p className="section-copy" data-reveal>
              {contentText['app_page']['were_parallax_robotics_a_studentled_team']}
            </p>
            <Link href="/story" className="text-link" data-reveal>
              {contentText['app_page']['get_to_know_our_story']}
              <span>↗</span>
            </Link>
          </div>
          <div className="who-image-wrap">
            <Photo
              src="/images/placeholders/team-workbench.svg"
              alt={contentText['app_page']['photo_needed_parallax_students_collaborating_around']}
              caption={contentText['app_page']['the_workbench_edison_nj']}
            />
            <div className="quote-card" data-depth="30">
              <span className="mono">{contentText['app_page']['our_approach']}</span>
              <p>
                {contentText['app_page']['the_parts_are_shared']}
                <br />
                {contentText['app_page']['the_ideas_are_ours']}
              </p>
              <span className="quote-mark" aria-hidden="true">
                ↗
              </span>
            </div>
          </div>
        </div>
      </Section>
      <Section
        id="season"
        label={contentText['app_page']['02_a_new_field_of_possibility']}
        className="season-section"
      >
        <div className="section-heading">
          <h2 data-reveal>
            {contentText['app_page']['this_season']}
            <br />
            <span className="text-accent">{contentText['app_page']['we_override']}</span>
          </h2>
          <div data-reveal>
            <p>{contentText['app_page']['one_12_ft_12_ft_field']}</p>
            <a className="text-link" href={site.manual} target="_blank" rel="noopener noreferrer">
              {contentText['app_page']['read_the_official_manual_']}
            </a>
          </div>
        </div>
        <div className="game-grid">
          {gameCards.map((c) => (
            <article className="game-card" key={c.title} data-reveal data-tilt>
              <span className="mono">{c.label}</span>
              <svg viewBox="0 0 68 68" fill="none" aria-hidden="true">
                <path data-draw d={c.path} />
              </svg>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </article>
          ))}
        </div>
        <div className="season-facts mono" data-reveal>
          <span>{contentText['app_page']['9_goals']}</span>
          <span>{contentText['app_page']['4_toggles']}</span>
          <span>{contentText['app_page']['4_loaders']}</span>
          <span>{contentText['app_page']['56_cups']}</span>
          <span>{contentText['app_page']['63_pins']}</span>
          <span>{contentText['app_page']['override_202627']}</span>
        </div>
      </Section>
      <Section
        id="numbers"
        label={contentText['app_page']['03_small_numbers_real_intent']}
        className="stats-section"
      >
        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat" data-reveal key={s.label}>
              <div className="stat-value">
                <span data-count={s.value}>{s.value}</span>
                {s.suffix}
              </div>
              <h3>{s.label}</h3>
              <p>{s.note}</p>
              {s.placeholder && (
                <span className="placeholder-tag mono">
                  {contentText['app_page']['sample_value']}
                </span>
              )}
            </div>
          ))}
        </div>
      </Section>
      <Section
        id="build"
        label={contentText['app_page']['04_from_the_workbench']}
        className="robot-teaser-section"
      >
        <div className="section-heading">
          <h2 data-reveal>
            {contentText['app_page']['every_part_has']}
            <br />
            <span className="text-muted">{contentText['app_page']['a_reason']}</span>
          </h2>
          <Link className="text-link" href="/robot" data-reveal>
            {contentText['app_page']['see_the_full_build_']}
          </Link>
        </div>
        <div className="robot-teaser" data-reveal>
          <Photo
            src="/images/placeholders/robot-wide.svg"
            alt={contentText['app_page']['photo_needed_wide_threequarter_view_of']}
          />
          {[
            { x: 28, y: 65, label: contentText['app_page']['drivetrain'] },
            { x: 61, y: 34, label: contentText['app_page']['scoring'] },
            { x: 77, y: 58, label: contentText['app_page']['intake'] },
          ].map((h, i) => (
            <Link
              key={h.label}
              href="/robot#features"
              className="teaser-hotspot"
              style={{ left: h.x + '%', top: h.y + '%' }}
              aria-label={
                String(i + 1).padStart(2, '0') + ' / Explore ' + h.label + ' design notes'
              }
            >
              <span>{String(i + 1).padStart(2, '0')}</span>
              <small>{h.label} ↗</small>
            </Link>
          ))}
          <div className="teaser-bottom mono">
            <span>{contentText['app_page']['override_202627_build_in_progress']}</span>
            <span>{contentText['app_page']['studentdesigned_studentbuilt_studentcoded']}</span>
          </div>
        </div>
      </Section>
      <Section
        id="community"
        label={contentText['app_page']['05_built_with_a_little_help']}
        className="sponsor-strip-section"
      >
        <div className="section-heading">
          <h2 data-reveal>
            {contentText['app_page']['theres_space']}
            <br />
            {contentText['app_page']['for_your_name']}
          </h2>
          <p data-reveal>{contentText['app_page']['our_next_build_needs_parts_registration']}</p>
        </div>
        <div
          className="sponsor-marquee"
          tabIndex={0}
          aria-label={contentText['app_page']['available_sponsor_placements_animation_pauses_on']}
        >
          <div className="marquee-track">
            {[...sponsors, ...sponsors].map((s, i) => (
              <div
                key={i}
                className="marquee-logo"
                aria-hidden={i >= sponsors.length ? 'true' : undefined}
                inert={i >= sponsors.length}
              >
                <SponsorLogo sponsor={s} />
              </div>
            ))}
          </div>
        </div>
        <p className="mono sponsor-disclosure">
          {contentText['app_page']['open_sponsor_placements_no_sponsorships_announced']}
        </p>
      </Section>
      <CTABand />
    </>
  );
}
