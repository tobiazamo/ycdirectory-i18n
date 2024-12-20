import { defineField, defineType } from '@sanity/types';

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'localizedName',
      type: 'internationalizedArrayString',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
});
