import { getLocale, getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries';
import { StartupTypeCard } from '@/types/StartupTypeCard';
import StartupCard from '@/components/StartupCard';

const UserStartups = async ({ id }: { id: string }) => {
  const locale = await getLocale();
  const t = await getTranslations('UserStartups');
  const startupsByAuthor = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id, locale });
  return (
    <>
      {startupsByAuthor.length > 0 ? (
        startupsByAuthor.map((startup: StartupTypeCard) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="no-result">{t('noPostsYet')}</p>
      )}
    </>
  );
};
export default UserStartups;
