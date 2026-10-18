/** Per-route metadata keeps canonical, OG and Twitter previews consistent. */
import type { Metadata } from 'next';
import { site } from '@/data/site';
export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: site.url + path },
    openGraph: {
      title: title + ' | ' + site.name,
      description,
      url: site.url + path,
      images: [{ url: '/og.png', width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og.png'] },
  };
}
