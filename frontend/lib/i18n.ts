import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import enTranslations from '../assets/translations/en.json';
import esTranslations from '../assets/translations/es.json';

export const availableLanguages = {
  en: 'English',
  es: 'Español',
} as const;

export type LanguageCode = keyof typeof availableLanguages;

const getDeviceLocale = (): LanguageCode => {
  const deviceLocale = Localization.getLocales()[0]?.languageCode || 'en';
  
  return availableLanguages[deviceLocale as LanguageCode] ? deviceLocale as LanguageCode : 'en';
};

// Resources object
const resources = {
  en: {
    translation: enTranslations,
  },
  es: {
    translation: esTranslations,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLocale(), // Default language
    fallbackLng: 'en', // Fallback language
    compatibilityJSON: 'v4', // For React Native compatibility
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    react: {
      useSuspense: false, // Disable Suspense for React Native
    },
  });

export default i18n;
