import { Home, About, Contact, Products, Product } from '../../pages';
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
  },
  {
    path: '/products',
    element: <Products />
  },
  {
    path: '/products/:catID',
    element: <Products />
  },
  {
    path: '/product-details/:prID',
    element: <Product />
  },
]