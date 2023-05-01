import { useContext } from 'react';
import { LanguageContext } from '../../global/contexts/LanguageContext';
import { Navigation } from '../../global';
export function Header () {
  const { language, langs, changeLanguage } = useContext(LanguageContext);
  return (
    <header>
      <Navigation 
        customClass="headerNav" 
        language={language}
        langs={langs}
        changeLanguage={changeLanguage}
      />
    </header>
  )
}