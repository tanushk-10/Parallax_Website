/** Shared section frame supplies two independent depth layers and an animated engineering divider. */
export default function Section({
  id,
  label,
  children,
  className = '',
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={id + '-label'} className={'section ' + className}>
      <div className="section-glow" data-depth="30" aria-hidden="true" />
      <div className="section-index" data-depth="14" aria-hidden="true">
        {label.split(' / ')[0]}
      </div>
      <div className="container section-content">
        <h2 className="section-label mono" id={id + '-label'} data-reveal>
          <span className="tiny-cross">+</span>
          {label}
          <svg viewBox="0 0 400 2" preserveAspectRatio="none" aria-hidden="true">
            <path data-draw d="M0 1H400" />
          </svg>
        </h2>
        {children}
      </div>
    </section>
  );
}
