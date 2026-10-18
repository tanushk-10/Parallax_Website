import { copy as contentText } from '@/data/copy'; /** Outreach cards are data-driven planned formats. Unknown dates and impact are never invented. */
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Photo from '@/components/ui/Photo';
import Button from '@/components/ui/Button';
import CTABand from '@/components/sections/CTABand';
import { outreach } from '@/data/outreach';
import { pageMeta } from '@/lib/metadata';
export const metadata = pageMeta(
  contentText['app_outreach_page']['outreach_community'],
  contentText['app_outreach_page']['help_parallax_robotics_bring_handson_stem'],
  '/outreach',
);
export default function OutreachPage() {
  return (
    <>
      <PageHero
        eyebrow={contentText['app_outreach_page']['outreach_the_circle_gets_wider']}
        title={contentText['app_outreach_page']['good_ideas']}
        accent={contentText['app_outreach_page']['travel_further']}
        description={contentText['app_outreach_page']['we_want_younger_edison_students_to']}
      />
      <Section
        id="outreach-plans"
        label={contentText['app_outreach_page']['01_what_we_want_to_share']}
      >
        <div className="section-heading">
          <h2 data-reveal>
            {contentText['app_outreach_page']['from_our_bench']}
            <br />
            <span className="text-muted">
              {contentText['app_outreach_page']['to_your_classroom']}
            </span>
          </h2>
          <p data-reveal>
            {contentText['app_outreach_page']['these_are_planned_outreach_formats_event']}
          </p>
        </div>
        <div className="outreach-list">
          {outreach.map((e, i) => (
            <article className="outreach-card" key={e.id}>
              <Photo
                src={e.image}
                alt={
                  'Photo needed: students participating in a ' +
                  (i === 0
                    ? 'robot demonstration'
                    : i === 1
                      ? 'hands-on robotics workshop'
                      : 'STEM mentoring session')
                }
              />
              <div data-reveal>
                <span className="placeholder-tag mono">{e.status}</span>
                <h3>{e.title}</h3>
                <p>{e.blurb}</p>
                <dl className="event-meta">
                  <div>
                    <dt className="mono">{contentText['app_outreach_page']['when']}</dt>
                    <dd>{e.date}</dd>
                  </div>
                  <div>
                    <dt className="mono">{contentText['app_outreach_page']['where']}</dt>
                    <dd>{e.place}</dd>
                  </div>
                </dl>
                {e.impact !== null && (
                  <p className="impact">
                    <span data-count={e.impact}>{e.impact}</span>{' '}
                    {contentText['app_outreach_page']['students_reached']}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section
        id="invitation"
        label={contentText['app_outreach_page']['02_bring_us_along']}
        className="invite-section"
      >
        <div className="editorial-grid">
          <h2 data-reveal>
            {contentText['app_outreach_page']['a_room_full']}
            <br />
            {contentText['app_outreach_page']['of_questions']}
            <br />
            <span className="text-accent">{contentText['app_outreach_page']['were_in']}</span>
          </h2>
          <div data-reveal>
            <p>{contentText['app_outreach_page']['bring_us_to_your_school_or']}</p>
            <Button href="/contact">
              {contentText['app_outreach_page']['plan_a_visit_with_us']}
            </Button>
          </div>
        </div>
      </Section>
      <Section
        id="community-intent"
        label={contentText['app_outreach_page']['03_beyond_the_field']}
      >
        <div className="values-grid">
          {[
            [
              contentText['app_outreach_page']['show_the_work'],
              contentText['app_outreach_page']['a_robot_becomes_less_mysterious_when'],
            ],
            [
              contentText['app_outreach_page']['make_it_handson'],
              contentText['app_outreach_page']['we_want_students_to_ask_try'],
            ],
            [
              contentText['app_outreach_page']['keep_the_door_open'],
              contentText['app_outreach_page']['a_first_demo_should_be_an'],
            ],
          ].map(([t, p], i) => (
            <article data-reveal data-tilt key={t}>
              <span className="mono">
                0{i + 1} {contentText['app_outreach_page']['_our_intent']}
              </span>
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </Section>
      <CTABand />
    </>
  );
}
