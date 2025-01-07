import { getTranslations } from 'next-intl/server';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import EditStartupForm from '@/components/EditStartupForm';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  if (!session) redirect('/');
  const id = (await params).id;

  const t = await getTranslations('StartupCreate');
  return (
    <>
      <section className="pink__container">
        <h1 className="heading">{t('editStartup')}</h1>
      </section>
      <EditStartupForm startupId={id} />
    </>
  );
};
export default Page;
