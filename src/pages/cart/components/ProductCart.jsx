import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
export function ProductCart(props) {
  const { product, index, cart, changeCartQuantity, removeProductFromCart } = props;
  const [firstLoad, setFirstLoad] = useState(true);
  const [quantity, setQuantity] = useState(cart[index]?.quantity || 1);
  const changeQuantity = (e) => {
    let newQuantity = e.target.value;
    if (newQuantity === '' || !parseInt(newQuantity) || parseInt(newQuantity) > 1000) {return;}
    setQuantity(newQuantity);
  }
  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return () => {};
    }
    const timer = setTimeout(() => {
      changeCartQuantity(index, parseInt(quantity));
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);
  useEffect(() => {
    setQuantity(cart[index]?.quantity || 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);
  return (
    <div className="product-item table">
      <Link to={`/product-details/${product.id}`}>
        <img src={product.image} alt={product.title} />
      </Link>
      <h3>{product.title}</h3>
      <div className="custom-actions">
        <span>Quantity: </span>
        <input type="number"
          onChange={changeQuantity}
          value={quantity}
        />
      </div>
      <span>{product.price}</span>
      <button className="btn btn-danger"
        onClick={() => removeProductFromCart(index)}
      >
        Remove
      </button>
    </div>
  )
}