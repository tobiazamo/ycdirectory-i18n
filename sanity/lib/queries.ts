import { defineQuery } from 'groq';
import { routing } from '@/i18n/routing';
import { QueryMap } from '@/types/QueryMap';

const locales = routing.locales;

// Define the main query
export const STARTUP_QUERY = defineQuery(`
  *[_type=="startup" && defined(slug.current) && (!defined($search) || title match $search || author->name match $search || categories[]->localizedName[_key == $locale][0].value match $search)] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id, 
      name, 
      image, 
      "bio": bio[_key == $locale][0].value,
    },
    views,
    "description": description[_key == $locale][0].value,
    categories[]->{
        _id,
        "localizedName": localizedName[_key == $locale][0].value,
    },
    image
}`);

export const QUERIES: QueryMap = {};
locales.forEach((locale) => {
  const queryKey = `STARTUP_QUERY_BY_ID_PITCH_${locale.toUpperCase()}`;
  QUERIES[queryKey] = defineQuery(`
    *[_type=="startup" && _id==$id][0] {
      _id,
      title,
      slug,
      _createdAt,
      author -> {
        _id, 
        name, 
        username,
        image, 
        "bio": bio[_key == $locale][0].value,
      },
      views,
      "description": description[_key == $locale][0].value,
      categories[]->{
          _id,
          "localizedName": localizedName[_key == $locale][0].value,
      },
      image,
      pitch_${locale.toLowerCase()}
  }`);
});

export const STARTUP_VIEWS_QUERY = defineQuery(
  `*[_type=="startup" && _id==$id][0] {
      _id, views
    }`,
);
