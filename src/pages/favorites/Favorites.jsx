import { useEffect, useState, useContext } from "react"
import { FavContext } from "../../global/contexts/FavContext"
import { api } from "../../global/services/api"
import { IconFav, IconCart } from "../../global/components"
export function Favorites() {
  const [data, setData] = useState([]);
  const { fav, addToFav } = useContext(FavContext);
  useEffect(() => {
    if (fav.length > 0) {
      const fetchData = async () => {
        const apiData = await api._get('https://fakestoreapi.com/products');
        if (apiData.status === 200) {
          let filteredData = apiData.data.filter((item) => fav.includes(item.id))
          setData(filteredData)
        }
      }
      fetchData()
    } else {
      setData([]);
    }
  }, [fav])
  return (
    <div>
      <h1>Favorites</h1>
      <div id="products">
        {data.length > 0 ?
          data.map((product, index) => (
            <div className="product-item" key={index}>
              <div className='product-actions'>
                <IconFav onClick={() => addToFav(product.id)} active={'#4255ff'} />
                <IconCart active={false} />
              </div>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <span>{product.price}</span>
            </div>
          ))
          :
          <div>
            <h3>No Favorites</h3>
          </div>
        }
      </div>
    </div>
  )
}