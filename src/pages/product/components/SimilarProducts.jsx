import { Link } from "react-router-dom";
export function SimilarProducts(props) {
  const { product } = props;
  return (
    <div className="product-item">
      <img src={product.image} alt={product.title} />
      <p>{product.title}</p>
      <p>{product.price}</p>
      <Link to={`/products/${product.id}`}>Details</Link>
    </div>
  )
}