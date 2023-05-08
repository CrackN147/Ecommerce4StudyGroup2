import {createContext, useState, useEffect} from 'react';
import { storage } from '../services/storage';
export const FavContext = createContext(null);

export const FavProvider = ({children}) => {
  const [fav, setFav] = useState([]);
  const processFavStorage = (fav) => {
    storage.set('favorites', JSON.stringify(fav));
  }
  const addToFav = (prID) => {
    let cloneFav = [...fav];
    if (cloneFav.includes(prID)) {
      let prIndex = cloneFav.findIndex((item) => item === prID);
      cloneFav.splice(prIndex, 1);
    } else {
      cloneFav.push(prID);
    }
    setFav(cloneFav)
    processFavStorage(cloneFav);
  }
  useEffect(() => {
    if (storage.exists('favorites')) {
      setFav(storage.getJson('favorites'));
    }
  }, []);
  return (
    <FavContext.Provider value={{
      fav,
      addToFav
    }}>
      {children}
    </FavContext.Provider>
  )
}