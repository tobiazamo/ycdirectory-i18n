import { getTranslations } from 'next-intl/server';
import SearchForm from '@/components/SearchForm';
import StartupCard from '@/components/StartupCard';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const t = await getTranslations('HeroBanner');
  const posts = [
    {
      _id: 1,
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: 'Adrian' },
      description: 'A description',
      image:
        'https://img.rolandberger.com/content_assets/content_images/captions/Roland_Berger-24_2195_Humanoid_robots-IT_image_caption_w768.jpg',
      category: 'A category sample',
      title: 'A sample title',
    },
  ];
  return (
    <>
      <section className={'pink__container'}>
        <h1 className="heading">{t('title')}</h1>
        <p className="sub-heading">{t('description')}</p>
        <SearchForm query={query} />
      </section>

      <section className="section__container">
        <p className="text-30-semibold">
          {query ? t('searchResult', { query }) : t('allStartups')}
        </p>
        <ul className="card_grid mt-7">
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
