import { copy as contentText } from '@/data/copy'; /** Robot route documents design questions, planned phases, version slots and unconfirmed specs. */
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Photo from '@/components/ui/Photo';
import RobotFeatures from '@/components/sections/RobotFeatures';
import BuildTimeline from '@/components/sections/BuildTimeline';
import EvolutionGallery from '@/components/sections/EvolutionGallery';
import CTABand from '@/components/sections/CTABand';
import { robot } from '@/data/robot';
import { site } from '@/data/site';
import { pageMeta } from '@/lib/metadata';
export const metadata = pageMeta(
  contentText['app_robot_page']['our_robot'],
  contentText['app_robot_page']['explore_our_studentbuilt_override_robot_design'],
  '/robot',
);
export default function RobotPage() {
  return (
    <>
      <PageHero
        eyebrow={contentText['app_robot_page']['the_robot_override_202627']}
        title={contentText['app_robot_page']['ideas_take']}
        accent={contentText['app_robot_page']['physical_form']}
        description={contentText['app_robot_page']['every_bracket_every_line_of_code']}
      />
      <Section id="robot-intro" label={contentText['app_robot_page']['01_meet_the_build']}>
        <Photo
          priority
          src={robot.image}
          alt={contentText['app_robot_page']['photo_needed_full_threequarter_view_of']}
          caption={robot.name}
        />
        <p className="caption-note" data-reveal>
          {contentText['app_robot_page']['build_details_and_photography_are_being']}
        </p>
      </Section>
      <Section
        id="features"
        label={contentText['app_robot_page']['02_six_design_questions']}
        className="feature-section"
      >
        <div className="section-heading">
          <h2 data-reveal>{contentText['app_robot_page']['look_closer']}</h2>
          <p data-reveal>
            {contentText['app_robot_page']['from_movement_to_feedback_the_questions']}
          </p>
        </div>
        <RobotFeatures />
      </Section>
      <Section id="process" label={contentText['app_robot_page']['03_the_build_process']}>
        <div className="section-heading">
          <h2 data-reveal>
            {contentText['app_robot_page']['think_test']}
            <br />
            <span className="text-muted">{contentText['app_robot_page']['build_repeat']}</span>
          </h2>
          <p data-reveal>
            {contentText['app_robot_page']['our_planned_process_for_override_dates']}
          </p>
        </div>
        <BuildTimeline />
      </Section>
      <Section id="evolution" label={contentText['app_robot_page']['04_room_for_the_next_version']}>
        <div className="section-heading">
          <h2 data-reveal>
            {contentText['app_robot_page']['no_version']}
            <br />
            {contentText['app_robot_page']['is_the_last_word']}
          </h2>
          <p data-reveal>{contentText['app_robot_page']['three_spaces_for_the_builds_tests']}</p>
        </div>
        <EvolutionGallery />
      </Section>
      <Section id="specs" label={contentText['app_robot_page']['05_under_the_surface']}>
        <div className="specs-grid">
          <div>
            <h2 data-reveal>
              {contentText['app_robot_page']['the_details']}
              <br />
              <span className="text-accent">{contentText['app_robot_page']['do_the_work']}</span>
            </h2>
            <p data-reveal>{robot.codeStack}</p>
            <a href={site.manual} className="text-link" target="_blank" rel="noopener noreferrer">
              {contentText['app_robot_page']['explore_the_override_manual_']}
            </a>
          </div>
          <dl className="specs-panel" data-reveal>
            {Object.entries(robot.specs).map(([k, v]) => (
              <div key={k}>
                <dt className="mono">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
      <CTABand />
    </>
  );
}
