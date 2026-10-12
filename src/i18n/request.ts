import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, Locale } from '@/types/database';
import esMessages from '../../messages/es.json';
import enMessages from '../../messages/en.json';

const messageMap: Record<Locale, any> = {
  es: esMessages,
  en: enMessages,
};

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  const selectedLocale = locale as Locale;

  return {
    locale: selectedLocale,
    messages: messageMap[selectedLocale] || esMessages,
  };
});
