import {Link} from 'react-router-dom'
import { IconCart, IconFav } from '../../../global/components'
export function Product(props) {
  const { product, addToFav, isFavActive, addToCart, isCartActive } = props
  return (
    <div className="product-item">
      <div className='product-actions'>
        <IconFav onClick={addToFav} active={isFavActive ? '#4255ff' : false} />
        <IconCart onClick={addToCart} active={isCartActive ? '#4255ff' : false} />
      </div>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <span>{product.price}</span>
      <Link to={`/product-details/${product.id}`}>Details</Link>
      <Link to={`/product-edit/${product.id}`}>Edit</Link>
    </div>
  )
}