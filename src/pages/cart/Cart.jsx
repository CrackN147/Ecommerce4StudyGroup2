import { useState, useEffect, useContext } from "react"
import { Loader } from "../../global/components"
import { api } from "../../global/services/api"
import { storage } from "../../global/services/storage"
import { CartContext } from "../../global/contexts/CartContext"
import { ProductCart } from "./components"
export function Cart() {
  const { cart, changeCartQuantity, removeProductFromCart } = useContext(CartContext)
  const [data, setData] = useState([]);
  const [pageState, setPageState] = useState(1);
  const checkNoResults = () =>{
    return (cart.length === 0 && (
      !storage.exists('cart') || 
      storage.getJson('cart').length === 0))
  }
  useEffect(() => {
    if (cart.length > 0) {
      const fetchData = async () => {
        const apiData = await api._get('https://fakestoreapi.com/products');
        if (apiData.status === 200) {
          let filteredData = apiData.data.filter((item) => {
            let found = cart.findIndex((cartItem) => cartItem.productId === item.id)
            return found > -1
          })
          setData(filteredData)
          setPageState(2)
        }
      }
      fetchData()
    } else if (checkNoResults()) {
      setPageState(3)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])
  return (
    <div>
      <h1>Cart</h1>
      <div id="products">
        {pageState === 1 && <Loader />}
        {pageState === 2 && 
          data.map((product, index) => (
            <ProductCart 
              key={index}
              product={product} 
              index={index}
              cart={cart}
              changeCartQuantity={changeCartQuantity}
              removeProductFromCart={removeProductFromCart}
            />
          ))
        }
        {pageState === 3 &&
          <div>
            <h3>Cart is empty</h3>
          </div>
        }
      </div>
    </div>
  )
}