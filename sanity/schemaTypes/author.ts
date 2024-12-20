import { defineField, defineType } from '@sanity/types';
import { UserIcon } from '@sanity/icons';

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'id',
      type: 'number',
    }),
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'username',
      type: 'string',
    }),
    defineField({
      name: 'email',
      type: 'email',
    }),
    defineField({
      name: 'image',
      type: 'url',
    }),
    defineField({
      name: 'bio',
      type: 'internationalizedArrayString',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
});
