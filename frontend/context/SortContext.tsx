import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Record } from '@/lib/actions/createRecord';
import { useRecords } from './RecordsContext';

export type SortType = 'Date (Ascending)' | 'Date (Descending)' | 'Amount (Ascending)' | 'Amount (Descending)' | 'Default';

type SortContextType = {
  currentSort: SortType;
  setCurrentSort: (sort: SortType) => void;
  isLoading: boolean;
  sorts: string[];
  resetCarousel: () => void;
  shouldResetCarousel: boolean;
  translatedSorts: (sort: SortType) => string;
  sortedRecords: Record[];
  setSortedRecords: (records: Record[]) => void;
};

const SortContext = createContext<SortContextType | undefined>(undefined);

export const SortProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSort, setCurrentSortState] = useState<SortType>('Default');
  const [shouldResetCarousel, setShouldResetCarousel] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { records } = useRecords();
  const [sortedRecords, setSortedRecords] = useState<Record[]>(records || []);
  const { t } = useTranslation();
  
  const setCurrentSort = (sort: SortType) => {
    setIsLoading(true);
    setCurrentSortState(sort);
    setShouldResetCarousel(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const resetCarousel = () => {
    setShouldResetCarousel(false);
  };

  const sorts = ['Date (Ascending)', 'Date (Descending)', 'Amount (Ascending)', 'Amount (Descending)', 'Default'];

  const translatedSorts = (sort: SortType) => {
    switch (sort) {
      case 'Date (Ascending)':
        return t('sortOption.dateAscending');
      case 'Date (Descending)':
        return t('sortOption.dateDescending');
      case 'Amount (Ascending)':
        return t('sortOption.amountAscending');
      case 'Amount (Descending)':
        return t('sortOption.amountDescending');
      case 'Default':
        return t('sortOption.default');
    }
  };

  return (
    <SortContext.Provider value={{
      currentSort,
      setCurrentSort,
      isLoading,
      sortedRecords,
      setSortedRecords,
      sorts,
      resetCarousel,
      shouldResetCarousel,
      translatedSorts: translatedSorts as (sort: SortType) => string,
    }}>
      {children}
    </SortContext.Provider>
  );
};

export const useSort = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error('useSort must be used within a SortProvider');
  }
  return context;
};
