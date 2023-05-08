import { useState, useEffect, useContext } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { CartContext } from "../../global/contexts/CartContext"
import { FavContext } from "../../global/contexts/FavContext"
import {api} from '../../global/services/api'
import {Loader, Categories} from '../../global'
import { Product, Filters } from "./components"
export function Products () {
  const { catID } = useParams();
  let location = useLocation();
  const navigate = useNavigate();

  const { fav, addToFav } = useContext(FavContext);
  const { cart, addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(2);
  const [sort, setSort] = useState('asc');

  function changeLimit() {
    let newLimit = limit + 1;
    setLimit(newLimit)
    navigate(`?limit=${newLimit}&sort=${sort}`);
  }
  function changeSort() {
    let newSort = (sort === 'asc') ? 'desc' : 'asc';
    setSort(newSort)
    navigate(`?limit=${limit}&sort=${newSort}`)
  }

  function isInCart(prID) {
    let prIndex = cart.findIndex((item) => item.productId === prID);
    return prIndex > -1;
  }

  useEffect(() => {
    const fetchData = async () => {
      let queryResult = '';
      let query = location.search.replace('?', '');
      query = query.split('&');
      query = query.filter((item) => item.includes('sort') || item.includes('limit'));
      let limitIndex = query.findIndex((item) => item.includes('limit'));
      if(limitIndex > -1) {
        let limitVal = query[limitIndex].replace('limit=', '');
        if(parseInt(limitVal) > 0) {
          queryResult += `&limit=${limitVal}`
        } else {
          queryResult += `&limit=${limit}`
        }
      } else {
        queryResult += `&limit=${limit}`
      }
      let sortIndex = query.findIndex((item) => item.includes('sort'));
      if(sortIndex > -1) {
        let sortVal = query[sortIndex].replace('sort=', '');
        if(sortVal === 'asc' || sortVal === 'desc') {
          queryResult += `&sort=${sortVal}`
        } else {
          queryResult += `&sort=${sort}`
        }
      } else {
        queryResult += `&sort=${sort}`
      }
      queryResult = queryResult.replace(/&/, '?');
      let apiLink = `https://fakestoreapi.com/products${queryResult}`;
      if (catID) {
        apiLink = `https://fakestoreapi.com/products/category/${catID}${queryResult}`
      }
      const apiData = await api._get(apiLink);
      if (apiData.status === 200) {
        setProducts(apiData.data)
      }
    }
    fetchData()
  }, [catID, location.search])
  
  return (
    <div className="wrapper">
      <Categories query={location.search} />
      <div>
        <Filters 
          limit={limit} 
          sort={sort}
          changeLimit={changeLimit}
          changeSort={changeSort}
        />
        <div id="products">
          {products.length > 0 ? 
            products.map((product) => (
              <Product 
                key={product.id}
                product={product}
                addToFav={
                  () => addToFav(product.id)
                }
                isFavActive={fav.includes(product.id)}
                addToCart={
                  () => addToCart(product.id)
                }
                isCartActive={isInCart(product.id)}
              />
            ))
          : <Loader />
          }
        </div>
      </div>
    </div>
  )
}