import { createContext, useContext } from 'react';
import type { TypeLanguage } from './types';

export interface LanguageContextType {
  language: TypeLanguage;
  setLanguage: (language: TypeLanguage) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en-US',
  setLanguage: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}
