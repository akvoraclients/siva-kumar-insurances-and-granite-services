import { SupportedLanguage } from '@/types';
import en from '@/dictionaries/en.json';
import ta from '@/dictionaries/ta.json';

const dictionaries = {
  en,
  ta,
};

export const getDictionary = (lang: SupportedLanguage) => {
  return dictionaries[lang] || dictionaries.en;
};

