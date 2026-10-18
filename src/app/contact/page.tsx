import { copy as contentText } from '@/data/copy'; /** Contact combines a static-friendly form, shared public details and a map-free location study. */
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import ContactForm from '@/components/sections/ContactForm';
import CTABand from '@/components/sections/CTABand';
import { site } from '@/data/site';
import { pageMeta } from '@/lib/metadata';
export const metadata = pageMeta(
  contentText['app_contact_page']['contact'],
  contentText['app_contact_page']['talk_to_parallax_robotics_about_sponsorship'],
  '/contact',
);
export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={contentText['app_contact_page']['contact_open_the_conversation']}
        title={contentText['app_contact_page']['big_things_start']}
        accent={contentText['app_contact_page']['with_hello']}
        description={contentText['app_contact_page']['want_to_support_the_team_join']}
      />
      <Section id="message" label={contentText['app_contact_page']['01_your_move']}>
        <div className="contact-grid">
          <ContactForm />
          <aside className="contact-details" data-reveal>
            <span className="mono">{contentText['app_contact_page']['the_direct_route']}</span>
            <h2>
              {contentText['app_contact_page']['a_small_team']}
              <br />
              {contentText['app_contact_page']['an_open_inbox']}
            </h2>
            <dl>
              <div>
                <dt className="mono">{contentText['app_contact_page']['email_us']}</dt>
                <dd>
                  <a href={'mailto:' + site.email}>{site.email}</a>
                </dd>
              </div>
              <div>
                <dt className="mono">{contentText['app_contact_page']['follow_the_build']}</dt>
                <dd>
                  <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                    {site.instagram.handle} ↗
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mono">{contentText['app_contact_page']['support_the_work']}</dt>
                <dd>
                  <a href={site.gofundme} target="_blank" rel="noopener noreferrer">
                    {contentText['app_contact_page']['find_us_on_gofundme_']}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mono">{contentText['app_contact_page']['the_team']}</dt>
                <dd>
                  {site.name}
                  {site.teamNumber && ' · ' + site.teamNumber}
                  <br />
                  {site.school} · {site.city}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </Section>
      <Section id="location" label={contentText['app_contact_page']['02_made_here']}>
        <div className="location-block" data-reveal>
          <div className="location-grid" aria-hidden="true" />
          <div className="location-target" aria-hidden="true">
            <span />
            <span />
            <i />
          </div>
          <div>
            <span className="mono">
              {contentText['app_contact_page']['new_jersey_united_states']}
            </span>
            <h2>
              {contentText['app_contact_page']['edison']}
              <br />
              <span className="text-accent">{contentText['app_contact_page']['nj']}</span>
            </h2>
            <p>
              {contentText['app_contact_page']['edison_high_school']}
              <br />
              {contentText['app_contact_page']['a_title_i_public_school']}
              <br />
              {contentText['app_contact_page']['a_place_to_build_what_comes']}
            </p>
          </div>
          <span className="mono location-coordinates">
            {contentText['app_contact_page']['4052_n']}
            <br />
            {contentText['app_contact_page']['7441_w']}
            <br />
            <br />
            {contentText['app_contact_page']['prx_home_base']}
          </span>
        </div>
      </Section>
      <Section
        id="conversation"
        label={contentText['app_contact_page']['03_pick_a_starting_point']}
      >
        <div className="values-grid">
          {[
            [
              contentText['app_contact_page']['support_the_next_build'],
              contentText['app_contact_page']['ask_about_sponsorship_inkind_parts_or'],
            ],
            [
              contentText['app_contact_page']['find_your_place'],
              contentText['app_contact_page']['interested_in_joining_tell_us_what'],
            ],
            [
              contentText['app_contact_page']['bring_us_to_your_community'],
              contentText['app_contact_page']['share_your_school_or_event_idea'],
            ],
          ].map(([t, p], i) => (
            <article key={t} data-reveal data-tilt>
              <span className="mono">
                0{i + 1} {contentText['app_contact_page']['_lets_talk']}
              </span>
              <h3>{t}</h3>
              <p>{p}</p>
              <a className="text-link" href="#message">
                {contentText['app_contact_page']['write_to_us_']}
              </a>
            </article>
          ))}
        </div>
      </Section>
      <CTABand />
    </>
  );
}
