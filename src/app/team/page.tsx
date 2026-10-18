import { copy as contentText } from '@/data/copy'; /** Team derives its roster from published entries only; cards animate with Flip on filtering. */
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import TeamGrid from '@/components/sections/TeamGrid';
import CTABand from '@/components/sections/CTABand';
import Button from '@/components/ui/Button';
import { pageMeta } from '@/lib/metadata';
export const metadata = pageMeta(
  contentText['app_team_page']['meet_the_team'],
  contentText['app_team_page']['meet_the_students_behind_parallax_robotics'],
  '/team',
);
export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow={contentText['app_team_page']['the_people_behind_the_parts']}
        title={contentText['app_team_page']['different_minds']}
        accent={contentText['app_team_page']['shared_ambition']}
        description={contentText['app_team_page']['builders_who_think_in_mechanisms_coders']}
      />
      <Section id="roster" label={contentText['app_team_page']['01_the_current_crew']}>
        <TeamGrid />
      </Section>
      <Section id="growing" label={contentText['app_team_page']['02_pull_up_a_chair']}>
        <div className="editorial-grid">
          <h2 data-reveal>
            {contentText['app_team_page']['we_are_a_small_team']}
            <br />
            {contentText['app_team_page']['on_purpose']}
            <br />
            <span className="text-accent">
              {contentText['app_team_page']['and_we_are_growing']}
            </span>
          </h2>
          <div data-reveal>
            <p>{contentText['app_team_page']['a_small_team_means_every_student']}</p>
            <p>{contentText['app_team_page']['more_students_are_joining_soon_there']}</p>
            <Button href="/contact" secondary>
              {contentText['app_team_page']['ask_about_joining']}
            </Button>
          </div>
        </div>
      </Section>
      <Section id="team-values" label={contentText['app_team_page']['03_how_we_show_up']}>
        <div className="values-grid">
          {[
            [
              contentText['app_team_page']['own_the_work'],
              contentText['app_team_page']['we_design_build_and_code_ourselves'],
            ],
            [
              contentText['app_team_page']['share_what_you_know'],
              contentText['app_team_page']['a_good_idea_gets_better_when'],
            ],
            ['Make room.', contentText['app_team_page']['a_team_grows_when_the_next']],
          ].map(([title, copy], i) => (
            <article key={title} data-reveal data-tilt>
              <span className="mono">
                0{i + 1} {contentText['app_team_page']['_our_standard']}
              </span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </Section>
      <CTABand />
    </>
  );
}
