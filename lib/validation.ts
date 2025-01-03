import { z } from 'zod';

export const formSchema = z.object({
  imageLink: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: 'HEAD' });
        const contentType = res.headers.get('content-type');

        return contentType?.startsWith('image/');
      } catch {
        return false;
      }
    }),
});
