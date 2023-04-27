import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {routes} from './global/configs/routes';
import { LanguageProvider } from './global/contexts/LanguageContext';
import { Header, Footer } from './pages';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider >
        <Header/>
        <Routes>
          {routes.map((route, index) => (
            <Route 
              key={`routes-path-${index}`} 
              path={route.path} 
              element={route.element} 
            />
          ))}
        </Routes>
      <Footer />
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App;