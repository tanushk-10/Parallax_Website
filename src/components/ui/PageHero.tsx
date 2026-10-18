import { copy as contentText } from '@/data/copy'; /** Reusable page opener; words reveal in 3D from the shared route motion owner. */
export default function PageHero({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <div className="page-hero-grid" data-depth="35" aria-hidden="true" />
      <div className="container">
        <p className="eyebrow mono" data-reveal>
          <span className="status-dot" />
          {eyebrow}
        </p>
        <h1 id="page-title">
          {title.split(' ').map((word, i) => (
            <span className="hero-word" key={i}>
              {word}{' '}
            </span>
          ))}
          <br />
          <span className="text-accent hero-word">{accent}</span>
        </h1>
        <div className="page-hero-bottom">
          <p data-reveal>{description}</p>
          <span className="mono" aria-hidden="true">
            {contentText['components_ui_PageHero']['prx_2627']}
            <br />
            {contentText['components_ui_PageHero']['designed_by_students']}
          </span>
        </div>
      </div>
    </section>
  );
}
