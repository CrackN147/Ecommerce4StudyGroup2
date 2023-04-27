import { useContext } from 'react';
import { LanguageContext } from '../../global/contexts/LanguageContext';
import { Navigation } from '../../global';
export function Footer (props) {
  const { language, langs } = useContext(LanguageContext);
  // const {pageName} = props;
  return (
    <footer>
      <p>© 2021 - My Company</p>
      <Navigation 
        customClass="footerNav"
        language={language}
        langs={langs} 
      />
    </footer>
  )
}