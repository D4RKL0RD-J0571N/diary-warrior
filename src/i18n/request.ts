import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, Locale } from '@/types/database';
import esMessages from '../../messages/es.json';
import enMessages from '../../messages/en.json';

const messageMap: Record<Locale, any> = {
  es: esMessages,
  en: enMessages,
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: messageMap[locale as Locale] || esMessages,
  };
});
