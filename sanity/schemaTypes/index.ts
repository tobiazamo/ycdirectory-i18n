import { type SchemaTypeDefinition } from 'sanity';
import { author } from '@/sanity/schemaTypes/author';
import { category } from '@/sanity/schemaTypes/category';
import { startup } from '@/sanity/schemaTypes/startup';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup, category],
};
