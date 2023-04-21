import { Home, About, Contact } from '../../pages';
export const routes = [
  {
    path: '/', 
    element: <Home />
  },
  {
    path: '/home', 
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/contact',
    element: <Contact />
  }
]