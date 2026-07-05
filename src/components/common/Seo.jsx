import { Helmet } from 'react-helmet-async';
import { pageMeta } from '../../utils/seo';

const SITE_URL = 'https://esperancee.vercel.app';
const SITE_NAME = 'Esperance FC Academy';
const TWITTER_HANDLE = '@EsperanceFC';

const defaultMeta = {
  title: 'Esperance FC Academy | Premier Sports Training',
  description:
    'Esperance FC is a youth sports academy in Rwanda training children ages 6 to 20 in Football, Women’s Football, Basketball, Volleyball, Table Tennis and German language classes.',
  image: `${SITE_URL}/logo.PNG`,
  type: 'website',
  robots: 'index, follow',
};

const canonicalUrl = (path) => `${SITE_URL}${path === '/' ? '' : path}`;

const Seo = ({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  noindex = false,
}) => {
  const meta = pageMeta[path] || {};
  const metaTitle = title ? `${title} | ${SITE_NAME}` : meta.title ? `${meta.title} | ${SITE_NAME}` : defaultMeta.title;
  const metaDescription = description || meta.description || defaultMeta.description;
  const metaUrl = canonicalUrl(path);
  const metaImage = image || meta.image || defaultMeta.image;
  const robotsContent = noindex ? 'noindex, nofollow' : defaultMeta.robots;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
      <meta name="author" content={SITE_NAME} />
      <meta property="og:site_name" content={SITE_NAME} />
      <link rel="canonical" href={metaUrl} />

      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      <meta name="robots" content={robotsContent} />

      <script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Esperance FC',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.PNG`,
        description:
          'Esperance FC is a youth sports academy in Rwanda training children from ages 6 to 20 in Football, Women\'s Football, Basketball, Volleyball, Table Tennis and German Language classes.',
        sameAs: [
          'https://www.facebook.com/',
          'https://www.instagram.com/',
          'https://www.youtube.com/',
        ],
      })}</script>
    </Helmet>
  );
};

export default Seo;
