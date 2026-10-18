import { copy as contentText } from '@/data/copy'; /** Resources use genuine references and working PDFs; unknown links render as non-interactive cards. */
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import CTABand from '@/components/sections/CTABand';
import { resources, faqs } from '@/data/resources';
import { site } from '@/data/site';
import { pageMeta } from '@/lib/metadata';
export const metadata = pageMeta(
  contentText['app_resources_page']['resources_documents'],
  contentText['app_resources_page']['find_the_official_override_manual_vex'],
  '/resources',
);
export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow={contentText['app_resources_page']['resources_open_the_notebook']}
        title={contentText['app_resources_page']['start_with']}
        accent={contentText['app_resources_page']['a_good_question']}
        description={contentText['app_resources_page']['the_official_game_the_documents_and']}
      />
      <Section id="library" label={contentText['app_resources_page']['01_the_reference_shelf']}>
        <div className="resource-grid">
          {resources.map((r, i) => {
            const content = (
              <>
                <span className="mono">
                  0{i + 1} / {r.type === 'pdf' ? 'PDF DOCUMENT' : 'REFERENCE'}
                </span>
                <span className="resource-arrow" aria-hidden="true">
                  {r.href === '#' ? '+' : '↗'}
                </span>
                <h2>{r.title}</h2>
                <p>{r.description}</p>
                <span className="text-link">
                  {r.href === '#'
                    ? 'Coming soon'
                    : r.type === 'pdf'
                      ? 'Open the placeholder PDF'
                      : 'Open the resource'}
                </span>
              </>
            );
            return r.href === '#' ? (
              <article className="resource-card is-pending" key={r.id} data-reveal>
                {content}
              </article>
            ) : (
              <a
                className="resource-card"
                key={r.id}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                data-tilt
              >
                {content}
              </a>
            );
          })}
        </div>
      </Section>
      <Section id="faq" label={contentText['app_resources_page']['02_a_few_useful_answers']}>
        <div className="editorial-grid">
          <h2 data-reveal>
            {contentText['app_resources_page']['glad']}
            <br />
            <span className="text-accent">{contentText['app_resources_page']['you_asked']}</span>
          </h2>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <details key={f.question} data-reveal>
                <summary>
                  <span className="mono">0{i + 1}</span>
                  {f.question}
                  <span className="faq-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>
      <Section id="official" label={contentText['app_resources_page']['03_go_to_the_source']}>
        <div className="section-heading">
          <h2 data-reveal>
            {contentText['app_resources_page']['the_manual']}
            <br />
            {contentText['app_resources_page']['has_the_final_word']}
          </h2>
          <div data-reveal>
            <p>{contentText['app_resources_page']['our_game_descriptions_are_a_highlevel']}</p>
            <a className="text-link" href={site.manual} target="_blank" rel="noopener noreferrer">
              {contentText['app_resources_page']['read_the_official_override_manual_']}
            </a>
          </div>
        </div>
      </Section>
      <CTABand />
    </>
  );
}
