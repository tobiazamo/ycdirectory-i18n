'use client';

import { useActionState, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { routing, useRouter } from '@/i18n/routing';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_ALL_LOCALES } from '@/sanity/lib/queries';
import { CategoryType } from '@/types/StartupTypeCard';
import { createPitch } from '@/lib/actions';

const EditStartupForm = ({ startupId }: { startupId: string }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [startup, setStartup] = useState(null);
  const [pitches, setPitches] = useState<{ [key: string]: string }>({});

  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations('StartupForm');

  useEffect(() => {
    const fetchStartup = async () => {
      const data = await client.fetch(STARTUP_BY_ID_ALL_LOCALES, {
        id: startupId,
      });
      // const data = await fetchStartupById(startupId, locale);
      setStartup(data);
      setPitches(
        routing.locales.reduce(
          (acc, locale) => {
            acc[locale.toLowerCase()] = data[`pitch_${locale.toLowerCase()}`] || '';
            return acc;
          },
          {} as { [key: string]: string },
        ),
      );
    };

    fetchStartup();
  }, [startupId]);

  const handlePitchChange = (locale: string, value: string) => {
    setPitches({
      ...pitches,
      [locale.toLowerCase()]: value,
    });
  };

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get('title') as string,
        ...routing.locales.reduce(
          (acc, locale) => {
            acc[`description_${locale.toLowerCase()}`] = formData.get(
              `description_${locale.toLowerCase()}`,
            ) as string;
            return acc;
          },
          {} as { [key: string]: string },
        ),
        category: formData.get('category') as string,
        imageLink: formData.get('imageLink') as string,
        pitches,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitches, true, startupId);

      if (result.status === 'SUCCESS') {
        toast({
          title: t('success'),
          description: t('pitchUpdated'),
        });

        router.push(`/startup/${startupId}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        toast({
          title: t('error'),
          description: t('checkInputs'),
          variant: 'destructive',
        });
        setErrors(fieldErrors as unknown as Record<string, string>);
        return { ...prevState, error: t('validationFailed'), status: 'ERROR' };
      }

      toast({
        title: t('error'),
        description: t('unexpectedError'),
        variant: 'destructive',
      });

      return {
        ...prevState,
        error: t('unexpectedError'),
        status: 'ERROR',
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: '',
    status: 'INITIAL',
  });

  if (!startup) {
    return <p>Loading...</p>;
  }

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form__label">
          {t('title')}
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form__input"
          required
          defaultValue={startup.title}
          placeholder={t('titleInputPlaceholder')}
        ></Input>
        {errors.title && <p className="startup-form__error">{errors.title}</p>}
      </div>
      {routing.locales.map((locale, index) => (
        <div key={index}>
          <label htmlFor={`description_${locale}`} className="startup-form__label">
            {t('description')} - {locale.toUpperCase()}
          </label>
          <Textarea
            id={`description_${locale}`}
            name={`description_${locale}`}
            className="startup-form__textarea"
            required
            defaultValue={startup.description.find((desc) => desc._key === locale).value}
            placeholder={t('descriptionTextareaPlaceholder')}
          ></Textarea>
          {errors.description && <p className="startup-form__error">{errors.description}</p>}
        </div>
      ))}

      <div>
        <label htmlFor="category" className="startup-form__label">
          {t('category')}
        </label>
        <p>{t('categoryHelper')}</p>
        <Input
          id="category"
          name="category"
          className="startup-form__input"
          required
          defaultValue={startup.categories.map((category: CategoryType) => category.name)}
          placeholder={t('categoryInputPlaceholder')}
        ></Input>
        {errors.category && <p className="startup-form__error">{errors.category}</p>}
      </div>
      <div>
        <label htmlFor="imageLink" className="startup-form__label">
          {t('imageLink')}
        </label>
        <Input
          id="imageLink"
          name="imageLink"
          className="startup-form__input"
          required
          defaultValue={startup.image}
          placeholder={t('imageLinkInputPlaceholder')}
        ></Input>
        {errors.imageLink && <p className="startup-form__error">{errors.imageLink}</p>}
      </div>
      {routing.locales.map((locale, index) => (
        <div key={index} data-color-mode="light">
          <label htmlFor={`pitch_${locale}`} className="startup-form__label">
            {t('pitch')} - {locale.toUpperCase()}
          </label>
          <MDEditor
            id={`pitch_${locale}`}
            preview="edit"
            value={pitches[locale.toLowerCase()]}
            height={300}
            style={{ borderRadius: 20, overflow: 'hidden' }}
            textareaProps={{
              placeholder: t('pitchEditorPlaceholder'),
            }}
            previewOptions={{
              disallowedElements: ['style'],
            }}
            onChange={(value) => handlePitchChange(locale, value || '')}
          />
          {errors[`pitch_${locale}`] && (
            <p className="startup-form__error">{errors[`pitch_${locale}`]}</p>
          )}
        </div>
      ))}

      <Button type="submit" className="startup-form__btn text-white" disabled={isPending}>
        {isPending ? t('submitting') : t('updateYourPitch')}
        <Send className="ml-2 size-6" />
      </Button>
    </form>
  );
};

export default EditStartupForm;
