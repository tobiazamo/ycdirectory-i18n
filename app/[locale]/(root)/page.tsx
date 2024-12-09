import { getTranslations } from 'next-intl/server';
import SearchForm from '@/components/SearchForm';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const t = await getTranslations('HeroBanner');
  return (
    <>
      <section className={'pink__container'}>
        <h1 className="heading">{t('title')}</h1>
        <p className="sub-heading">{t('description')}</p>
        <SearchForm query={query} />
      </section>
    </>
  );
}
