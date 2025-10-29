import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession } from './SessionProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FilterType = 'weekly' | 'monthly' | 'yearly';

type FilterContextType = {
  currentFilter: FilterType;
  setCurrentFilter: (filter: FilterType) => void;
  isDaily: boolean;
  isMonthly: boolean;
  isYearly: boolean;
  isLoading: boolean;
  filters: string[];
  resetCarousel: () => void;
  shouldResetCarousel: boolean;
  shouldUpdateData: boolean;
  setShouldUpdateDataFunction: (shouldUpdate: boolean) => void;
  translatedFilters: (filter: FilterType) => string;
  selectedReportCategories: string[];
  setSelectedReportCategories: (categories: string[]) => void;
  toggleReportCategory: (category: string) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentFilter, setCurrentFilterState] = useState<FilterType>('monthly');
  const { user } = useSession();
  const [shouldResetCarousel, setShouldResetCarousel] = useState<boolean>(false);
  const [shouldUpdateData, setShouldUpdateData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedReportCategories, setSelectedReportCategoriesState] = useState<string[]>([]);

  const saveReportCategoriesToStorage = async (categories: string[]) => {
    try {
      await AsyncStorage.setItem('selectedReportCategories', JSON.stringify(categories));
    } catch (error) {
      console.error('Error saving report categories to storage:', error);
    }
  };

  const loadReportCategoriesFromStorage = async () => {
    try {
      const stored = await AsyncStorage.getItem('selectedReportCategories');
      if (stored) {
        const parsedCategories = JSON.parse(stored);
        setSelectedReportCategoriesState(parsedCategories);
        return parsedCategories;
      }
    } catch (error) {
      console.error('Error loading report categories from storage:', error);
    }
    return null;
  };

  useEffect(() => {
    loadReportCategoriesFromStorage();
  }, []);

  useEffect(() => {
    if (user?.categories && user.categories.length > 0) {
      if (selectedReportCategories.length === 0) {
        setSelectedReportCategoriesState(user.categories);
        saveReportCategoriesToStorage(user.categories);
      }
    }
  }, [user?.categories]);

  const { t } = useTranslation();

  const setCurrentFilter = (filter: FilterType) => {
    setIsLoading(true);
    setCurrentFilterState(filter);
    setShouldResetCarousel(true);
    setShouldUpdateData(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const setShouldUpdateDataFunction = (shouldUpdate: boolean) => {
    setShouldUpdateData(shouldUpdate);
  };

  const resetCarousel = () => {
    setShouldResetCarousel(false);
  };

  const setSelectedReportCategories = (categories: string[]) => {
    setSelectedReportCategoriesState(categories);
    saveReportCategoriesToStorage(categories);
  };

  const toggleReportCategory = (category: string) => {
    setSelectedReportCategoriesState(prev => {
      const newCategories = prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category];
      
      saveReportCategoriesToStorage(newCategories);
      return newCategories;
    });
  };

  const isDaily = currentFilter === 'weekly';
  const isMonthly = currentFilter === 'monthly';
  const isYearly = currentFilter === 'yearly';
  const filters = ['Weekly', 'Monthly', 'Yearly'];

  const translatedFilters = (filter: string) => {
    switch (filter) {
      case 'Weekly':
        return t('filterOption.weekly');
      case 'Monthly':
        return t('filterOption.monthly');
      case 'Yearly':
        return t('filterOption.yearly');
    }
  };

  return (
    <FilterContext.Provider value={{
      currentFilter,
      setCurrentFilter,
      isDaily,
      isMonthly,
      isYearly,
      isLoading,
      filters,
      resetCarousel,
      shouldResetCarousel,
      translatedFilters: translatedFilters as (filter: FilterType) => string,
      shouldUpdateData,
      setShouldUpdateDataFunction,
      selectedReportCategories,
      setSelectedReportCategories,
      toggleReportCategory,
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
