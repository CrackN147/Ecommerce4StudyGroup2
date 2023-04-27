import { useContext } from 'react';
import { LanguageContext } from '../../global/contexts/LanguageContext';
import { Navigation } from '../../global';
export function Header () {
  const { language, langs, changeLanguage } = useContext(LanguageContext);
  return (
    <header>
      <div>
        <button onClick={() => changeLanguage('ka')}>Geo</button>
        <button onClick={() => changeLanguage('en')}>Eng</button>
      </div>
      <Navigation 
        customClass="headerNav" 
        language={language}
        langs={langs}
      />
    </header>
  )
}