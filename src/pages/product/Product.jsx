import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {api} from '../../global/services/api'
import { SimilarProducts } from './components'
export function Product() {
  const [product, setProduct] = useState({})
  const [similarProducts, setSimilarProducts] = useState([])
  const { prID } = useParams();
  useEffect(() => {
    async function fetchData() {
      const apiData = await api._get(`https://fakestoreapi.com/products/${prID}`)
      if (apiData.status === 200) {
        setProduct(apiData.data)
      }
    }
    // async function fetchData() {
    //   fetch(`https://fakestoreapi.com/products/${prID}`)
    //     .then((res)=>res.json())
    //       .then((json) => {
    //         setProduct(json)
    //       })
    // }
    fetchData()
  }, [prID])
  useEffect(() => {
    async function fetchData() {
      const apiData = await api._get(`https://fakestoreapi.com/products?limit=4`)
      if (apiData.status === 200) {
        setSimilarProducts(apiData.data)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>Product Details</h1>
      <div className="product-item">
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <span>{product.price}</span>
      </div>
      <div className="similar-products">
        {similarProducts.length > 0 ?
          similarProducts.map((product) => (
            <SimilarProducts key={product.id} product={product} />
          ))
        : <p>Loading...</p>
        }
      </div>
    </div>
  )
} 