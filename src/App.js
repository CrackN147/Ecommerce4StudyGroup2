import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {routes} from './global/configs/routes';
import { Header, Footer } from './pages';

function App() {
  return (
    <BrowserRouter>
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
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App;