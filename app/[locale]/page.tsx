import { getTranslations } from 'next-intl/server';
import SearchForm from '@/components/SearchForm';
import StartupCard from '@/components/StartupCard';
import { client } from '@/sanity/lib/client';
import { STARTUP_QUERY } from '@/sanity/lib/queries';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const t = await getTranslations('HeroBanner');
  const posts = await client.fetch(STARTUP_QUERY);
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
