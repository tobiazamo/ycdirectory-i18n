import { getTranslations } from 'next-intl/server';
import StartupForm from '@/components/StartupForm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await auth();
  if (!session) redirect('/');
  const t = await getTranslations('StartupCreate');
  return (
    <>
      <section className="pink__container min-h-60">
        <h1 className="heading">{t('submitStartup')}</h1>
      </section>
      <StartupForm />
    </>
  );
};
export default Page;
