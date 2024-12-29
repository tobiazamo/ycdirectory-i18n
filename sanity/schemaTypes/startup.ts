import { defineField, defineType } from '@sanity/types';
import { routing } from '@/i18n/routing';

const locales = routing.locales;

export const startup = defineType({
  name: 'startup',
  title: 'Startup',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'views',
      type: 'number',
    }),
    defineField({
      name: 'description',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
    }),
    defineField({
      name: 'image',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    ...locales.map((locale) =>
      defineField({
        name: `pitch_${locale}`,
        type: 'markdown',
      }),
    ),
  ],
});
