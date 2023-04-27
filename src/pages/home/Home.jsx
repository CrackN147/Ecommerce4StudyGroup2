import {useContext} from 'react';
import {LanguageContext} from '../../global/contexts/LanguageContext';
export function Home() {
  const {language, langs} = useContext(LanguageContext);
  return (
    <div>
      <h1>{langs[language].pages.home.title}</h1>
    </div>
  )
}