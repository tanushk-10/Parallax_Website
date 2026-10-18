import { copy as contentText } from '@/data/copy'; /** Closing sponsorship invitation; oversized copy and background move at different scroll rates. */
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { site } from '@/data/site';
export default function CTABand() {
  return (
    <Section
      id="support"
      label={contentText['components_sections_CTABand']['next_build_with_us']}
      className="cta-band"
    >
      <div className="cta-top" data-reveal>
        <p>
          {contentText['components_sections_CTABand']['a_little_support']}
          <br />
          {contentText['components_sections_CTABand']['a_lot_of_possibility']}
        </p>
        <span className="mono">
          {contentText['components_sections_CTABand']['parts_registration_travel']}
        </span>
      </div>
      <h2 data-reveal>
        {contentText['components_sections_CTABand']['help_us_build']}
        <br />
        <span>{contentText['components_sections_CTABand']['what_comes_next']}</span>
      </h2>
      <div className="cta-bottom" data-reveal>
        <div className="button-row">
          <Button href={site.gofundme}>
            {contentText['components_sections_CTABand']['support_the_team']}
          </Button>
          <Button href="/sponsors" secondary>
            {contentText['components_sections_CTABand']['become_a_sponsor']}
          </Button>
        </div>
        <p>
          {contentText['components_sections_CTABand']['studentled_communitybacked']}
          <br />
          {contentText['components_sections_CTABand']['every_contribution_moves_us_forward']}
        </p>
      </div>
    </Section>
  );
}
