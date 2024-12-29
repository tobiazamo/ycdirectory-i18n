import React, { Suspense } from 'react';
import { client } from '@/sanity/lib/client';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { QUERIES } from '@/sanity/lib/queries';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { CategoryType } from '@/types/StartupTypeCard';
import markdownIt from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';

const md = markdownIt();

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const locale = await getLocale();

  const queryKey = `STARTUP_QUERY_BY_ID_PITCH_${locale.toUpperCase()}`;

  const post = await client.fetch(QUERIES[queryKey], {
    id,
    locale,
  });

  if (!post) return notFound();

  const t = await getTranslations('StartupDetail');

  const parsedContent = md.render(post[`pitch_${locale.toLowerCase()}`] || '');

  return (
    <>
      <section className="pink__container min-h-56">
        <p className="tag">{await formatDate(post._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading max-w-5xl">{post.description}</p>
      </section>
      <section className="section__container">
        <Image
          src={post.image}
          alt={post.title}
          width={1110}
          height={583}
          className="h-auto w-full rounded-xl"
        />
        <div className="mx-auto mt-10 max-w-4xl space-y-5">
          <div className="flex-between gap-5">
            <Link href={`/user/${post.author._id}`} className="mb-3 flex items-center gap-2">
              <Image
                src={post.author.image}
                width={64}
                height={64}
                alt={post.author.name}
                className="aspect-square rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium text-black-300">@{post.author.username}</p>
              </div>
            </Link>

            <div className="flex gap-1">
              {post.categories?.map((category: CategoryType) => (
                <p key={category._id} className="category-tag">
                  {category.localizedName}
                </p>
              ))}
            </div>
          </div>
          <h3 className="text-30-bold">{t('pitchDetails')}</h3>
          {parsedContent ? (
            <article
              className="font-work-sand prose max-w-4xl break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">{t('noPitch')}</p>
          )}
        </div>

        <hr className="divider" />

        <Suspense fallback={<Skeleton className="view__skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};
export default Page;
