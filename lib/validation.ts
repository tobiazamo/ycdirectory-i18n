import { z } from 'zod';

export const formSchema = z.object({
  imageLink: z.union([z.string().url(), z.string().length(0)]).refine(
    async (val) => {
      if (!val) return true;

      try {
        const res = await fetch(val, { method: 'HEAD' });
        const contentType = res.headers.get('content-type');
        return contentType?.startsWith('image/');
      } catch {
        return false;
      }
    },
    {
      message: 'Must be a valid image URL or empty.',
    },
  ),
});
