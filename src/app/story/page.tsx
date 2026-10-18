import { copy as contentText } from '@/data/copy'; /** Story pairs a pinned student narrative with confirmed history and an oversized mission. */
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import StoryNarrative from '@/components/sections/StoryNarrative';
import CTABand from '@/components/sections/CTABand';
import { storyTimeline } from '@/data/story';
import { pageMeta } from '@/lib/metadata';
export const metadata = pageMeta(
  contentText['app_story_page']['our_story'],
  contentText['app_story_page']['founded_in_2025_at_edison_high'],
  '/story',
);
export default function StoryPage() {
  return (
    <>
      <PageHero
        eyebrow={contentText['app_story_page']['our_story_edison_nj']}
        title={contentText['app_story_page']['the_next_chapter']}
        accent={contentText['app_story_page']['is_ours_to_build']}
        description={contentText['app_story_page']['a_team_founded_in_2025_a']}
      />
      <Section id="narrative" label={contentText['app_story_page']['01_why_we_keep_building']}>
        <StoryNarrative />
      </Section>
      <Section id="history" label={contentText['app_story_page']['02_from_then_to_next']}>
        <div className="section-heading">
          <h2 data-reveal>
            {contentText['app_story_page']['a_short_history']}
            <br />
            <span className="text-muted">{contentText['app_story_page']['a_long_view']}</span>
          </h2>
          <p data-reveal>{contentText['app_story_page']['we_are_in_our_second_season']}</p>
        </div>
        <div className="history-timeline">
          {storyTimeline.map((t, i) => (
            <article key={t.year} data-reveal>
              <span className="history-year">{t.year}</span>
              <svg viewBox="0 0 400 20" aria-hidden="true">
                <path data-draw d="M0 10H400" />
                <circle cx="9" cy="10" r="6" />
              </svg>
              <span className="mono">
                0{i + 1} {contentText['app_story_page']['_parallax']}
              </span>
              <h3>{t.title}</h3>
              <p>{t.blurb}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section
        id="mission"
        label={contentText['app_story_page']['03_what_were_here_for']}
        className="mission-section"
      >
        <h2 data-reveal>
          {contentText['app_story_page']['build_a_robot']}
          <br />
          {contentText['app_story_page']['grow_a_team']}
          <br />
          <span className="text-accent">{contentText['app_story_page']['open_a_door']}</span>
        </h2>
        <div className="mission-bottom">
          <p data-reveal>{contentText['app_story_page']['we_want_our_work_to_make']}</p>
          <span className="mono" data-reveal>
            {contentText['app_story_page']['where_genius']}
            <br />
            {contentText['app_story_page']['meets_innovation']}
          </span>
        </div>
      </Section>
      <CTABand />
    </>
  );
}
