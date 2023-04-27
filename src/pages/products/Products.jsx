import { useState, useEffect } from "react"
import {Link} from 'react-router-dom'
import {api} from '../../global/services/api'
import {Loader} from '../../global/components/Loader'
export function Products () {
  const [products, setProducts] = useState([])
  const [backUp, setBackUp] = useState([])
  const [limit, setLimit] = useState(5)
  const action = () => {
    if (products.length > 0) {
      let newProducts = [...products]
      newProducts.shift()
      setProducts(newProducts)
    }
  }
  const reset = () => {
    setProducts(backUp)
  }
  const addLimit = () => {
    setLimit(limit + 5)
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const apiData = await api._get(`https://fakestoreapi.com/products?limit=${limit}`)
      if (apiData.status === 200) {
        setProducts(apiData.data)
        setBackUp(apiData.data)
      }
    }
    fetchData()
  }, [limit])
  return (
    <div>
      <div>
        <button onClick={action}>Action</button>
        <button onClick={reset}>Reset</button>
        <button onClick={addLimit}>Click Count {limit}</button>
      </div>
      {products.length > 0 ? 
        products.map((product) => (
          <div className="product-item" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <span>{product.price}</span>
            <Link to={`/products/${product.id}`}>Details</Link>
          </div>
        ))
      : <Loader />
      }
    </div>
  )
}