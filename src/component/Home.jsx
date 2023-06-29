import React, { useEffect, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addToCart } from '../store/store';
import ReactCardFlip from 'react-card-flip';
import StarRatings from 'react-star-ratings';

export default function Home() {
  const [quantity, setQuantity] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFlipped, setIsFlipped] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  
  const dispatch = useDispatch();
  const productList = useSelector(state => state.products.productList);
  const isFetched = useSelector(state => state.products.isFetched);
  const userCart = useSelector(state => state.cart);
  
  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchProducts());
    } else {
      setFilteredProducts(productList);
      setIsFlipped(new Array(productList.length).fill(false));
      setQuantity(new Array(productList.length).fill(1));
    }
  }, [isFetched]);

  const handlePurchase = (product, qty) => {
    dispatch(addToCart({...product, quantity: qty}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const category = e.target.category.value;

    setFilteredProducts(productList.filter(e => (e.category === category || category === 'blank')))
  };

  const productCategories = [...new Set(productList.map(prod => prod.category))];

  return (
    <div className='main-page' style={darkMode ? {backgroundColor: '#121212'} : {backgroundColor: 'white'}}>
      <form onSubmit={handleSubmit}>
        <select name="category">
          <option value="blank">Everything</option>
          {productCategories.map((elt) => (
            <option value={elt}>{elt}</option>
          ))}
        </select>
        <button type='submit'>Filter</button>
      </form>
      <p onClick={() => setDarkMode(!darkMode)}>a</p>
      <div className='product-cards'>
        {isFetched ? filteredProducts.map((product, id) => (
          <ReactCardFlip isFlipped={isFlipped[id]}>
            <div className='product-card' 
              style={darkMode ? {backgroundColor: '#1e1e1e'} : {backgroundColor: 'white'}}
              onMouseEnter={() => setIsFlipped(isFlipped.map((_, i) => i === id))}
            >
              <img src={product.image} alt="" />
              <h1>{product.title}</h1>
              <StarRatings rating={product?.rating?.rate} starRatedColor="blue" numberOfStars={5} name='rating' starDimension='20px' starSpacing='5px'/>
              <p>{product.price}$</p>
            </div>

            <div className="flip-side" 
              style={darkMode ? {backgroundColor: '#1e1e1e', color: 'white'} : {backgroundColor: 'white'}}
              onMouseLeave={() => setIsFlipped(isFlipped.map( (e,i) => i===id ? e = false : e))}
            >
              <p>{product.description}</p>
              <button onClick={() => handlePurchase(product, quantity[id])}>Purchase</button>
              <div className='qty-container'>
                {quantity[id] < 2 ? 
                  <AiOutlineMinusCircle style={{visibility: 'hidden'}}>-</AiOutlineMinusCircle> : 
                  <AiOutlineMinusCircle className='qty-icon' onClick={() => setQuantity(quantity.map((e,i) => i===id ? e-1 : e))}>-</AiOutlineMinusCircle>}
                <input value={ Math.round(quantity[id])  || ''} onChange={(event) => setQuantity(quantity.map((e,i) => i===id ? event.target.value : e))} />
                <AiOutlinePlusCircle className='qty-icon' onClick={() => setQuantity(quantity.map((e,i) => i===id ? e+1 : e))}>+</AiOutlinePlusCircle>
              </div>
            </div>
          </ReactCardFlip>
        )) : <img src="./Infinity-1s-510px.svg" alt="" className='product-loader'/>}
      </div>
    </div>
  )
}
