import React from 'react';
import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';

const StartupCard = async ({ post }: { post: StartupTypeCard }) => {
  const t = await getTranslations('StartupCard');

  const {
    _createdAt,
    views,
    author: { id: authorId, name },
    title,
    category,
    _id,
    image,
    description,
  } = post;
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between nt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${authorId}`}>
            <p className="text-16-medium line-clamp-1">{name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${authorId}`}>
          <Image
            alt={'placeholder'}
            src={'https://placehold.co/48x48'}
            width={'48'}
            height={'48'}
            className={'rounded-full'}
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className={'startup-card__desc'}>{description}</p>
        <img src={image} alt={'placeholder'} className={'startup-card__img'} />
      </Link>
      <div className="flex-between mt-5 gap-3">
        <Link href={`/?query=${category.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card__btn" asChild>
          <Link href={`/startup/${_id}`}>{t('details')}</Link>
        </Button>
      </div>
    </li>
  );
};
export default StartupCard;