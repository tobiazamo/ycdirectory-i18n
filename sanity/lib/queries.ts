import { defineQuery } from 'groq';

export const STARTUP_QUERY =
  defineQuery(`*[_type=="startup" && defined(slug.current)] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id, name, image, bio
    },
    views,
    description,
    categories[]->{
        _id,
        name
    },
    image
}`);
