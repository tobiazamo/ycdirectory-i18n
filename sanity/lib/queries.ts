import { defineQuery } from 'groq';

export const STARTUP_QUERY =
  defineQuery(`*[_type=="startup" && defined(slug.current)] | order(_createdAt desc) {
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
