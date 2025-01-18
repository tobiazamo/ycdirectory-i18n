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
    "description": coalesce(
        description[_key == $locale][0].value,
        description[_key == "en"][0].value
      ),
    categories[]->{
        _id,
        "localizedName": coalesce(
          localizedName[_key == $locale][0].value,
          localizedName[_key == "en"][0].value
        )
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
        bio,
      },
      views,
      "description": coalesce(
        description[_key == $locale][0].value,
        description[_key == "en"][0].value
      ),
      categories[]->{
        _id,
        "localizedName": coalesce(
          localizedName[_key == $locale][0].value,
          localizedName[_key == "en"][0].value
        )
      },
      image,
      "pitch_${locale.toLowerCase()}": coalesce(
        pitch_${locale.toLowerCase()},
        pitch_en
      )
    }
  `);
});

export const CATEGORY_BY_NAME_QUERY = `
  *[_type == "category" && name == $name][0] {
    _id,
    name,
    "localizedName": coalesce(
          localizedName[_key == $locale][0].value,
          localizedName[_key == "en"][0].value
        )
  }
`;

export const STARTUP_VIEWS_QUERY = defineQuery(
  `*[_type=="startup" && _id==$id][0] {
      _id, views
    }`,
);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
  *[_type=="author" && id==$id][0] {
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }
`);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
  *[_type=="author" && _id==$id][0] {
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }
`);

export const STARTUPS_BY_AUTHOR_QUERY = defineQuery(`
  *[_type=="startup" && author._ref == $id] | order(_createdAt desc) {
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
    "description": coalesce(
        description[_key == $locale][0].value,
        description[_key == "en"][0].value
      ),
    categories[]->{
        _id,
        "localizedName": coalesce(
          localizedName[_key == $locale][0].value,
          localizedName[_key == "en"][0].value
        )
    },
    image
}`);

export const OTHER_STARTUPS_BY_AUTHOR_QUERY = defineQuery(`
  *[_type=="startup" && author._ref == $id && _id != $postToExclude] | order(_createdAt desc) {
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
    "description": coalesce(
        description[_key == $locale][0].value,
        description[_key == "en"][0].value
      ),
    categories[]->{
        _id,
        "localizedName": coalesce(
          localizedName[_key == $locale][0].value,
          localizedName[_key == "en"][0].value
        )
    },
    image
}`);

export const OTHER_STARTUPS_BY_SAME_CATEGORY_QUERY = defineQuery(`
  *[_type == "startup" && _id != $postToExclude && count((categories[]._ref)[@ in $categoryIds]) > 0] | order(_createdAt desc) {
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
    "description": coalesce(
        description[_key == $locale][0].value,
        description[_key == "en"][0].value
      ),
    categories[]->{
      _id,
      "localizedName": coalesce(
          localizedName[_key == $locale][0].value,
          localizedName[_key == "en"][0].value
        )
    },
    image
  }
`);

export const STARTUP_BY_ID_ALL_LOCALES = defineQuery(`
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
        bio,
      },
      views,
      description,
      categories[]->{
          name,
          _id,
          "localizedName": localizedName[_key == 'en'][0].value,
      },
      image,
      pitch_en,
      pitch_it,
      pitch_fi
  }`);
