/** Data-driven sponsor logo; slots remain labeled, confirmed supporters use their URLs. */
import { sponsors } from '@/data/sponsors';
export default function SponsorLogo({
  sponsor,
  caption = false,
}: {
  sponsor: (typeof sponsors)[number];
  caption?: boolean;
}) {
  const logo = (
    <img
      src={sponsor.logo}
      alt={
        sponsor.placeholder
          ? 'Available sponsor placement: ' + sponsor.name
          : sponsor.name + ' logo'
      }
      width="260"
      height="120"
      loading="lazy"
      decoding="async"
    />
  );
  return (
    <>
      {sponsor.url !== '#' ? (
        <a
          href={sponsor.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={'Visit ' + sponsor.name}
        >
          {logo}
        </a>
      ) : (
        logo
      )}
      {caption && (
        <span className="mono">
          {sponsor.placeholder ? 'OPEN PLACEMENT' : sponsor.tier.toUpperCase() + ' SUPPORTER'}
        </span>
      )}
    </>
  );
}
