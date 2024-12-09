'use client';

import React from 'react';
import Form from 'next/form';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import SearchFormReset from '@/components/SearchFormReset';
import { Button } from '@/components/ui/button';

const SearchForm = ({ query }: { query?: string }) => {
  const t = useTranslations('SearchForm');

  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        type="search"
        defaultValue={query}
        className="search-input"
        placeholder={t('placeholder')}
      />

      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <Button type="submit" className="search-btn text-white">
          <Search />
        </Button>
      </div>
    </Form>
  );
};
export default SearchForm;
