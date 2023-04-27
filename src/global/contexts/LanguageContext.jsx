import {createContext, useState} from 'react';
import {langs} from '../langs/langs';
export const LanguageContext = createContext(null);

export const LanguageProvider = ({children}) => {
  const [language, setLanguage] = useState('ka');
  function changeLanguage(lang) {
    setLanguage(lang);
  }
  return (
    <LanguageContext.Provider value={{
      langs,
      language,
      changeLanguage
    }}>
      {children}
    </LanguageContext.Provider>
  )
}