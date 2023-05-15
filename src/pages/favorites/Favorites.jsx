import { useEffect, useState, useContext } from 'react';
import { api } from '../../global/services/api';
import { storage } from '../../global/services/storage';
import { IconFav, IconCart, Loader } from '../../global/components';
import { FavContext } from '../../global/contexts/FavContext';
import { CartContext } from '../../global/contexts/CartContext';
export function Favorites() {
  const [data, setData] = useState([]);
  const [pageState, setPageState] = useState(1);
  const { fav, addToFav } = useContext(FavContext);
  const { cart, addToCart } = useContext(CartContext);

  const checkNoResults = () =>{
    return (fav.length === 0 && (
      !storage.exists('favorites') || 
      storage.getJson('favorites').length === 0))
  }

  const toggleFav = (prID) => {
    setPageState(1)
    addToFav(prID);
  }
  useEffect(() => {
    if (fav.length > 0) {
      const fetchData = async () => {
        const apiData = await api._get('https://fakestoreapi.com/products');
        if (apiData.status === 200) {
          let filteredData = apiData.data.filter((item) => fav.includes(item.id))
          setData(filteredData)
          setPageState(2)
        }
      }
      fetchData()
    } else if (checkNoResults()) {
      setPageState(3)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fav])
  return (
    <div>
      <h1>Favorites</h1>
      <div id="products">
        {pageState === 1 && <Loader />}
        {pageState === 2 && 
          data.map((product, index) => (
            <div className="product-item" key={index}>
              <div className='product-actions'>
                <IconFav onClick={() => toggleFav(product.id)} active={'#4255ff'} />
                <IconCart active={false} />
              </div>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <span>{product.price}</span>
            </div>
          ))
        }
        {pageState === 3 &&
          <div>
            <h3>No Favorites</h3>
          </div>
        }
      </div>
    </div>
  )
}