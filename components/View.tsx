import React from 'react';
import { client } from '@/sanity/lib/client';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { getTranslations } from 'next-intl/server';

const View = async ({ id }: { id: string }) => {
  const t = await getTranslations('StartupDetail');

  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  return (
    <div className="view-container">
      <p className="view-text">
        <span className="font-black">{t('views', { count: parseInt(totalViews) })}</span>
      </p>
    </div>
  );
};
export default View;
