import { defineQuery } from 'groq';

export type QueryMap = {
  [key: string]: ReturnType<typeof defineQuery>;
};
