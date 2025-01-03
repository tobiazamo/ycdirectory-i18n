import { getLocale, getTranslations } from 'next-intl/server';
import SearchForm from '@/components/SearchForm';
import StartupCard from '@/components/StartupCard';
import { STARTUP_QUERY } from '@/sanity/lib/queries';
import { StartupTypeCard } from '@/types/StartupTypeCard';
import { sanityFetch } from '@/sanity/lib/live';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const t = await getTranslations('HeroBanner');
  const locale = await getLocale(); // Get locale first
  // const posts = await client.fetch(STARTUP_QUERY, { locale });
  // const session = await auth();
  const { data: posts } = await sanityFetch({
    query: STARTUP_QUERY,
    params: { locale, search: query || null },
  });
  return (
    <>
      <section className="pink__container">
        <h1 className="heading">{t('title')}</h1>
        <p className="sub-heading">{t('description')}</p>
        <SearchForm query={query} />
      </section>

      <section className="section__container">
        <p className="text-30-semibold">
          {query ? t('searchResult', { query }) : t('allStartups')}
        </p>
        <ul className="card__grid mt-7">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => <StartupCard key={post?._id} post={post} />)
          ) : (
            <p className="no-results">{t('noResults')}</p>
          )}
        </ul>
      </section>
    </>
  );
}
