/** Image frame is masked on reveal; the inner image gets independent scroll depth and hover zoom. */
export default function Photo({
  src,
  alt,
  caption,
  className = '',
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={'photo-frame ' + className} data-reveal>
      <div className="photo-inner" data-depth="22">
        <img
          src={src}
          alt={alt}
          width="1200"
          height="800"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
      {caption && <figcaption className="mono">{caption}</figcaption>}
      <span className="frame-corner" aria-hidden="true" />
    </figure>
  );
}
