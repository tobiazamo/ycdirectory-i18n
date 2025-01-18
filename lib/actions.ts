'use server';

import { auth } from '@/auth';
import { parseServerActionResponse } from '@/lib/utils';
import { getLocale, getTranslations } from 'next-intl/server';
import slugify from 'slugify';
import { writeClient } from '@/sanity/lib/write-client';
import { client } from '@/sanity/lib/client';
import { CATEGORY_BY_NAME_QUERY } from '@/sanity/lib/queries';
import { routing } from '@/i18n/routing';

export const createPitch = async (
  state: Record<string, unknown>,
  formData: FormData,
  pitches: { [key: string]: string },
  isUpdate?: boolean,
  startupId?: string,
) => {
  const session = await auth();
  const t = await getTranslations('StartupForm');
  const locale = getLocale();
  if (!session) {
    return parseServerActionResponse({
      error: t('notSignedIn'),
      status: 'ERROR',
    });
  }

  const data = Object.fromEntries(Array.from(formData).filter(([key]) => key !== 'pitch'));

  const slug = slugify(data.title as string, { lower: true, strict: true });

  let categoryRefs;
  if (typeof data.category === 'string') {
    categoryRefs = await Promise.all(
      data.category.split(',').map(async (cat: string) => {
        const existingCategory = await client.fetch(CATEGORY_BY_NAME_QUERY, {
          name: cat.trim(),
          locale,
        });
        if (existingCategory) {
          return { _type: 'reference', _ref: existingCategory._id, _key: existingCategory._id };
        } else {
          const newCategory = await writeClient.create({
            _type: 'category',
            name: cat.trim(),
            localizedName: routing.locales.map((locale) => ({
              _key: locale,
              value: cat.trim(),
            })),
          });
          return { _type: 'reference', _ref: newCategory._id };
        }
      }),
    );
  }

  try {
    const startup = {
      title: data.title,
      description: routing.locales.map((locale) => ({
        _key: locale,
        value: data[`description_${locale}`] || '',
      })),
      categories: categoryRefs,
      image: data.imageLink,
      slug: {
        _type: 'slug',
        current: slug,
      },
      author: {
        _type: 'reference',
        _ref: session?.id,
      },
      ...routing.locales.reduce(
        (acc, locale) => {
          acc[`pitch_${locale.toLowerCase()}`] = pitches[locale.toLowerCase()];
          return acc;
        },
        {} as { [key: string]: string },
      ),
    };

    let result;
    if (isUpdate && startupId) {
      result = writeClient
        .patch(startupId)
        .set({ ...startup })
        .commit();
    } else {
      result = await writeClient.create({ _type: 'startup', ...startup });
    }

    return parseServerActionResponse({
      ...result,
      error: '',
      status: 'SUCCESS',
    });
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: 'ERROR',
    });
  }
};
