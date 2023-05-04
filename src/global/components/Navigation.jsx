
import { Link, useLocation } from 'react-router-dom'
export function Navigation(props) {
  const { customClass, langs, language, changeLanguage } = props;
  let location = useLocation();
  return (
    <nav className={customClass}>
      <ul>
        <li>
          <Link to="/" className={(!location.pathname || location.pathname === '/') ? 'active' : ''}>
            {langs[language].pages.home.title}
          </Link>
        </li>
        <li>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            {langs[language].pages.about.title}
          </Link>
        </li>
        <li>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
            {langs[language].pages.contact.title}
          </Link>
        </li>
        <li>
          <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>
            {langs[language].pages.products.title}
          </Link>
        </li>
        <li>
          <Link to="/product-add" className={location.pathname === '/product-add' ? 'active' : ''}>
            {langs[language].pages.productAdd.title}
          </Link>
        </li>
        <li>
          <button onClick={() => changeLanguage('ka')}>Geo</button>
        </li>
        <li>
          <button onClick={() => changeLanguage('en')}>Eng</button>
        </li>
    </ul>
    </nav >
  )
}