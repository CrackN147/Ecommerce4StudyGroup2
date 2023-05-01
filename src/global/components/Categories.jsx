import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {api} from '../services/api'
export function Categories (props) {
  const {query} = props;
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const apiData = await api._get('https://fakestoreapi.com/products/categories');
      if (apiData.status === 200) {
        setCategories(apiData.data)
      }
    }
    fetchData()
  }, [])
  return (
    <div id="categories">
      <h3>Categories</h3>
      {categories.length > 0 ?
        categories.map((category, index) => (
          <Link to={`/products/${category}${query}`} key={index}>
            {category}
          </Link>
        ))
      : null
      }
    </div>
  )
}