import React, { useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { IconContext } from 'react-icons/lib';
import StarRatings from 'react-star-ratings';
import ReactCardFlip from 'react-card-flip';

export default function Home(props) {
  const { UserCart, UpdateCart, ProductList, UpdateProductList, FetchProducts, isFetched} = props;
  const [quantity, setquantity] = useState([]);
  const [FilteredProducts, setFilteredProducts] = useState([{}]);
  const [isFlipped, setisFlipped] = useState([]);



  const ProductCategories = [ ...new Set(ProductList.map( prod => prod.category ))]


  const handleSubmit = (e) => {
    e.preventDefault();
    const Category = e.target.category.value;

    setFilteredProducts(ProductList.filter(e => (e.category === Category || Category === 'blank')))

   
  }




  

  useEffect(() => {
    if(!isFetched) FetchProducts()
    else{
      setFilteredProducts(ProductList)
      setisFlipped(new Array(ProductList.length).fill(false))
      setquantity(new Array(ProductList.length).fill(1))
    } 

  }, [isFetched]);

  const handlePurchase = (prod, qte) => {
    const product_found = UserCart.find(e => e.id == prod.id)
    if(product_found){
      UpdateCart(UserCart.map(e =>  e.id == prod.id ? {...e, quantity: e.quantity+qte} : e))
    }else UpdateCart([...UserCart,{...prod, quantity: qte}])
  }

  
  return (

    <div className='main-page'>
      <form onSubmit={handleSubmit}>
      <select name="category" id="">
        <option value="blank">Everything</option>
        {ProductCategories.map((elt) =>{
          return(
            <option value={elt}>{elt}</option>
          )
        }
        )}
      </select>
      <button type='submit'>Filter</button>
      </form>
     <div className='product-cards'>
      {isFetched ? FilteredProducts?.map( (prod,id) => {
        return(
          <ReactCardFlip isFlipped={isFlipped[id]}>

            <div className='product-card' onMouseEnter={() => setisFlipped(isFlipped.map( (e,i) => i==id ? e = true : e = false))}>
           <img src={prod.image} alt="" />
           <h1>{prod.title}</h1>
           
           <StarRatings rating={prod?.rating?.rate} starRatedColor="blue" numberOfStars={5} name='rating' starDimension='20px' starSpacing='5px'/>
            <p>{prod.price}$</p>
            </div>

            <div className="flip-side" onMouseLeave={() => setisFlipped(isFlipped.map( (e,i) => i==id ? e = false : e))}>
            <p>{prod.description}</p>
            <button onClick={() => handlePurchase(prod, quantity[id])}>Purchase</button>
            <div className='qty-container'>
              
              {quantity[id] < 2 ?  <AiOutlineMinusCircle style={{visibility: 'hidden'}}>-</AiOutlineMinusCircle> : <AiOutlineMinusCircle className='qty-icon' onClick={() => setquantity(quantity.map((e,i) => i==id ? e = e-1 : e))}>-</AiOutlineMinusCircle>}
              <input value={quantity[id] || ''} onChange={(event) => setquantity(quantity.map((e,i) => i==id ? e = event.target.value : e))} />
              <AiOutlinePlusCircle className='qty-icon' onClick={() => setquantity(quantity.map((e,i) => i==id ? e = e+1 : e))}>+</AiOutlinePlusCircle>
              
            </div>
           </div>
          </ReactCardFlip>
          
           


           
           
          
        
        
        )
      } ): <img src="./Infinity-1s-510px.svg" alt="" className='product-loader'/>}

      </div>
    </div>

    
  )
}
