import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageCode, availableLanguages } from '@/lib/i18n';
import i18n from '@/lib/i18n';

type I18nContextType = {
  currentLanguage: LanguageCode;
  availableLanguages: typeof availableLanguages;
  changeLanguage: (language: LanguageCode) => Promise<void>;
  t: (key: string, options?: any) => string;
  isRTL: boolean;
  isInitialized: boolean;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = '@finance_tracker_language';

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(t('common.language') as LanguageCode);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage && availableLanguages[savedLanguage as LanguageCode]) {
          const language = savedLanguage as LanguageCode;
          setCurrentLanguage(language);
          await i18n.changeLanguage(language);
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Error loading saved language:', error);
        setIsInitialized(true);
      }
    };

    loadSavedLanguage();
  }, []);

  const changeLanguage = async (language: LanguageCode) => {
    try {
      await i18n.changeLanguage(language);
      setCurrentLanguage(language);
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const isRTL = false;

  return (
    <I18nContext.Provider value={{
      currentLanguage,
      availableLanguages,
      changeLanguage,
      t,
      isRTL,
      isInitialized,
    }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
