import { copy as contentText } from '@/data/copy'; /** Sponsors prioritizes donations and transparently labels proposed tiers, slots and costs. */
import PageHero from '@/components/ui/PageHero';
import SponsorLogo from '@/components/ui/SponsorLogo';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import CTABand from '@/components/sections/CTABand';
import { site } from '@/data/site';
import { tiers, sponsors, costs } from '@/data/sponsors';
import { pageMeta } from '@/lib/metadata';
export const metadata = pageMeta(
  contentText['app_sponsors_page']['sponsor_the_next_build'],
  contentText['app_sponsors_page']['support_parallax_robotics_at_edison_high'],
  '/sponsors',
);
export default function SponsorsPage() {
  return (
    <>
      <PageHero
        eyebrow={contentText['app_sponsors_page']['sponsors_put_possibility_on_the_field']}
        title={contentText['app_sponsors_page']['back_the_students']}
        accent={contentText['app_sponsors_page']['build_the_future']}
        description={contentText['app_sponsors_page']['we_come_from_a_title_i']}
      />
      <div className="container hero-donate" data-reveal>
        <Button href={site.gofundme}>
          {contentText['app_sponsors_page']['donate_on_gofundme']}
        </Button>
        <a className="text-link" href="#tiers">
          {contentText['app_sponsors_page']['explore_sponsorships_']}
        </a>
      </div>
      <Section id="tiers" label={contentText['app_sponsors_page']['01_choose_your_part_in_the']}>
        <div className="section-heading">
          <h2 data-reveal>
            {contentText['app_sponsors_page']['four_ways']}
            <br />
            <span className="text-muted">
              {contentText['app_sponsors_page']['to_move_us_forward']}
            </span>
          </h2>
          <p data-reveal>
            {contentText['app_sponsors_page']['these_are_proposed_sponsorship_packages_sample']}
          </p>
        </div>
        <div className="tier-grid">
          {tiers.map((tier, i) => (
            <article className={'tier-card tier-' + tier.id} key={tier.id} data-reveal data-tilt>
              <div className="tier-top">
                <span className="mono">
                  0{i + 1} {contentText['app_sponsors_page']['_sponsor']}
                </span>
                {tier.id === 'platinum' && (
                  <span className="mono">{contentText['app_sponsors_page']['build_bigger_']}</span>
                )}
              </div>
              <h3>{tier.name}</h3>
              <div className="tier-price">
                {'$'}
                {tier.amount.toLocaleString()}
                <span className="mono">
                  {contentText['app_sponsors_page']['illustrative_amount']}
                </span>
              </div>
              <ul>
                {tier.benefits.map((b) => (
                  <li key={b}>
                    <span aria-hidden="true">+</span>
                    {b}
                  </li>
                ))}
              </ul>
              <Button
                href={
                  'mailto:' +
                  site.email +
                  '?subject=' +
                  encodeURIComponent(tier.name + ' sponsorship inquiry')
                }
                secondary
              >
                {contentText['app_sponsors_page']['ask_about']}
                {tier.name}
              </Button>
            </article>
          ))}
        </div>
      </Section>
      <Section
        id="sponsor-wall"
        label={contentText['app_sponsors_page']['02_your_name_belongs_here']}
      >
        <div className="section-heading">
          <h2 data-reveal>
            {contentText['app_sponsors_page']['our_next']}
            <br />
            <span className="text-accent">
              {contentText['app_sponsors_page']['build_partners']}
            </span>
          </h2>
          <p data-reveal>
            {contentText['app_sponsors_page']['these_are_available_sponsor_placements_no']}
          </p>
        </div>
        {[...tiers].reverse().map((t) => (
          <div className="sponsor-tier-row" key={t.id} data-reveal>
            <h3 className="mono">{t.name}</h3>
            <div>
              {sponsors
                .filter((s) => s.tier === t.id)
                .map((s) => (
                  <div className="sponsor-tile" key={s.id}>
                    <SponsorLogo sponsor={s} caption />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </Section>
      <Section id="funding" label={contentText['app_sponsors_page']['03_what_your_support_buys']}>
        <div className="editorial-grid">
          <div>
            <h2 data-reveal>
              {contentText['app_sponsors_page']['real_parts']}
              <br />
              <span className="text-muted">
                {contentText['app_sponsors_page']['real_opportunities']}
              </span>
            </h2>
            <p data-reveal>{contentText['app_sponsors_page']['support_stays_close_to_the_work']}</p>
          </div>
          <div className="cost-list">
            {costs.map((c) => (
              <article key={c.item} data-reveal>
                <div>
                  <h3>{c.item}</h3>
                  <p>{c.purpose}</p>
                </div>
                <div className="cost-price">
                  {'$'}
                  {c.price}
                  <small className="mono">{contentText['app_sponsors_page']['sample_cost']}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>
      <Section
        id="packet"
        label={contentText['app_sponsors_page']['04_lets_make_it_concrete']}
        className="packet-section"
      >
        <div className="editorial-grid">
          <div>
            <span className="mono">
              {contentText['app_sponsors_page']['pdf_labeled_placeholder']}
            </span>
            <h2 data-reveal>
              {contentText['app_sponsors_page']['take_the_idea']}
              <br />
              {contentText['app_sponsors_page']['to_your_team']}
            </h2>
          </div>
          <div data-reveal>
            <p>{contentText['app_sponsors_page']['our_downloadable_draft_explains_what_the']}</p>
            <div className="button-row">
              <Button href="/docs/parallax-sponsorship-packet.pdf">
                {contentText['app_sponsors_page']['download_the_packet']}
              </Button>
              <Button href={'mailto:' + site.email + '?subject=Sponsorship%20inquiry'} secondary>
                {contentText['app_sponsors_page']['start_an_inquiry']}
              </Button>
            </div>
          </div>
        </div>
      </Section>
      <CTABand />
    </>
  );
}
