import React from 'react';
import { X } from 'lucide-react';
import { Link } from '@/i18n/routing';

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector('.search-form') as HTMLFormElement;

    if (form) form.reset();
  };

  return (
    <button type="reset" onClick={reset}>
      <Link href="/" className="search-btn text-white">
        <X />
      </Link>
    </button>
  );
};
export default SearchFormReset;
