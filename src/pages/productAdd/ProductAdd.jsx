import { useState } from 'react';
import {api} from '../../global/services/api';
export function ProductAdd() {
  // title: 'test product',
  // price: 13.5,
  // description: 'lorem ipsum set',
  // image: 'https://i.pravatar.cc',
  // category: 'electronic'
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const apiData = await api._post('https://fakestoreapi.com/products',  {
      title: title,
      price: price,
      description: description,
      image: '',
      category: ''
    });
    if (apiData.statusCode === 200) {
      setTitle('');
      setPrice('');
      setDescription('');
    }
  }
  function changeTitle(e) {
    let value = e.target.value;
    if (value.length > 15) {
      return;
    }
    setTitle(value);
  }
  function changePrice(e) {
    let value = e.target.value;
    value = value.replace(/[^\d.]/g,'');
    let splitValue = value.split('.');
    let countDigitsAfterDot = (splitValue[1] || '').length;
    if (
      countDigitsAfterDot > 2 || 
      splitValue.length > 2 || 
      (splitValue[0] && parseInt(splitValue[0]) >= 10000)
    ) {
      return;
    }
    setPrice(value);
  }
  return (
    <div id="productAdd">
      <h1>Product Add</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text"
            value={title} 
            onChange={changeTitle} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="text" 
            placeholder='0.00'
            value={price}
            onChange={changePrice}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}