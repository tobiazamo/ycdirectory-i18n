import React from 'react';
import { client } from '@/sanity/lib/client';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { getTranslations } from 'next-intl/server';
import { writeClient } from '@/sanity/lib/write-client';
import { after } from 'next/server';

const View = async ({ id }: { id: string }) => {
  const t = await getTranslations('StartupDetail');

  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  after(async () => {
    // Execute after the layout is rendered and sent to the user
    await writeClient
      .patch(id)
      .set({ views: totalViews + 1 })
      .commit();
  });

  return (
    <div className="view-container">
      <p className="view-text">
        <span className="font-black">{t('views', { count: totalViews })}</span>
      </p>
    </div>
  );
};
export default View;
