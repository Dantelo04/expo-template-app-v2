import { useI18n } from '@/context/I18nContext';

// Type for translation keys
export type TranslationKey = 
  | 'common.loading'
  | 'common.save'
  | 'common.cancel'
  | 'common.delete'
  | 'common.edit'
  | 'common.add'
  | 'common.close'
  | 'common.back'
  | 'common.next'
  | 'common.previous'
  | 'common.done'
  | 'common.error'
  | 'common.success'
  | 'common.warning'
  | 'common.info'
  | 'navigation.home'
  | 'navigation.profile'
  | 'navigation.reports'
  | 'navigation.records'
  | 'navigation.categories'
  | 'navigation.settings'
  | 'auth.signIn'
  | 'auth.signUp'
  | 'auth.signOut'
  | 'auth.email'
  | 'auth.password'
  | 'auth.confirmPassword'
  | 'auth.forgotPassword'
  | 'auth.dontHaveAccount'
  | 'auth.alreadyHaveAccount'
  | 'auth.createAccount'
  | 'auth.loginWithGoogle'
  | 'finance.income'
  | 'finance.expense'
  | 'finance.addIncome'
  | 'finance.addExpense'
  | 'finance.amount'
  | 'finance.description'
  | 'finance.category'
  | 'finance.date'
  | 'finance.currency'
  | 'finance.mainCurrency'
  | 'finance.selectMainCurrency'
  | 'finance.changeCurrency'
  | 'finance.addCurrency'
  | 'finance.total'
  | 'finance.balance'
  | 'finance.programmedRecords'
  | 'finance.appInfo'
  | 'categories.food'
  | 'categories.transport'
  | 'categories.entertainment'
  | 'categories.shopping'
  | 'categories.health'
  | 'categories.education'
  | 'categories.bills'
  | 'categories.salary'
  | 'categories.freelance'
  | 'categories.investment'
  | 'categories.other'
  | 'reports.monthly'
  | 'reports.weekly'
  | 'reports.yearly'
  | 'reports.expensesByCategory'
  | 'reports.incomeVsExpenses'
  | 'reports.trends'
  | 'reports.mostUsedCurrencies'
  | 'profile.personalInfo'
  | 'profile.name'
  | 'profile.email'
  | 'profile.language'
  | 'profile.theme'
  | 'profile.darkMode'
  | 'profile.lightMode'
  | 'profile.system'
  | 'profile.notifications'
  | 'profile.privacy'
  | 'profile.about'
  | 'profile.version'
  | 'onboarding.welcome'
  | 'onboarding.selectCurrency'
  | 'onboarding.getStarted'
  | 'onboarding.skip';

// Hook for typed translations
export const useTypedTranslation = () => {
  const { t, ...rest } = useI18n();
  
  const typedT = (key: TranslationKey, options?: any) => {
    return t(key, options);
  };
  
  return {
    t: typedT,
    ...rest,
  };
};

// Utility function to get all translation keys
export const getTranslationKeys = (): TranslationKey[] => {
  return [
    'common.loading',
    'common.save',
    'common.cancel',
    'common.delete',
    'common.edit',
    'common.add',
    'common.close',
    'common.back',
    'common.next',
    'common.previous',
    'common.done',
    'common.error',
    'common.success',
    'common.warning',
    'common.info',
    'navigation.home',
    'navigation.profile',
    'navigation.reports',
    'navigation.records',
    'navigation.categories',
    'navigation.settings',
    'auth.signIn',
    'auth.signUp',
    'auth.signOut',
    'auth.email',
    'auth.password',
    'auth.confirmPassword',
    'auth.forgotPassword',
    'auth.dontHaveAccount',
    'auth.alreadyHaveAccount',
    'auth.createAccount',
    'auth.loginWithGoogle',
    'finance.income',
    'finance.expense',
    'finance.addIncome',
    'finance.addExpense',
    'finance.amount',
    'finance.description',
    'finance.category',
    'finance.date',
    'finance.currency',
    'finance.mainCurrency',
    'finance.selectMainCurrency',
    'finance.changeCurrency',
    'finance.addCurrency',
    'finance.total',
    'finance.balance',
    'finance.programmedRecords',
    'finance.appInfo',
    'categories.food',
    'categories.transport',
    'categories.entertainment',
    'categories.shopping',
    'categories.health',
    'categories.education',
    'categories.bills',
    'categories.salary',
    'categories.freelance',
    'categories.investment',
    'categories.other',
    'reports.monthly',
    'reports.weekly',
    'reports.yearly',
    'reports.expensesByCategory',
    'reports.incomeVsExpenses',
    'reports.trends',
    'reports.mostUsedCurrencies',
    'profile.personalInfo',
    'profile.name',
    'profile.email',
    'profile.language',
    'profile.theme',
    'profile.darkMode',
    'profile.lightMode',
    'profile.system',
    'profile.notifications',
    'profile.privacy',
    'profile.about',
    'profile.version',
    'onboarding.welcome',
    'onboarding.selectCurrency',
    'onboarding.getStarted',
    'onboarding.skip',
  ];
};
