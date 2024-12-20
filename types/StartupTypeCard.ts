import { Author, Category, Startup } from '@/app/studio/sanity.types';

export type StartupTypeCard = Omit<Startup, 'author' | 'categories' | 'description'> & {
  author?: Author;
  categories?: CategoryType[];
  description: string;
};

export type CategoryType = Omit<Category, 'localizedName'> & { localizedName: string };
