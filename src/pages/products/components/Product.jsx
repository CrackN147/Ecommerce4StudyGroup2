import {Link} from 'react-router-dom'
export function Product(props) {
  const { product } = props
  return (
    <div className="product-item" key={product.id}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <span>{product.price}</span>
      <Link to={`/product-details/${product.id}`}>Details</Link>
    </div>
  )
}