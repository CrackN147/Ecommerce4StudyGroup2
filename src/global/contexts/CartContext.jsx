import {createContext, useState, useEffect} from 'react';
import { storage } from '../services/storage';
import { api } from '../services/api';
export const CartContext = createContext(null);

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const [firstCartSync, setFirstCartSync] = useState(false);
  const syncronizeCart = async () => {
    const apiData = await api._post('https://fakestoreapi.com/carts', {
      userId: '5',
      date: '2020-02-03',
      products: cart
    })
    if(apiData.status === 200) {
      console.log(apiData.data)
    }
  }
  const processCartStorage = (cart) => {
    storage.set('cart', JSON.stringify(cart));
  }
  const addToCart = (prID) => {
    let cloneCart = [...cart];
    let prIndex = cloneCart.findIndex((item) => item.productId === prID);
    if (prIndex > -1) {
      cloneCart.splice(prIndex, 1);
    } else {
      cloneCart.push({
        productId: prID,
        quantity: 1
      });
    }
    setCart(cloneCart)
    processCartStorage(cloneCart);
  }
  useEffect(() => {
    if (storage.exists('cart')) {
      setCart(storage.getJson('cart'));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if(!firstCartSync) {
        setFirstCartSync(true);
        return () => {};
      }
      syncronizeCart()
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart
    }}>
      {children}
    </CartContext.Provider>
  )
}