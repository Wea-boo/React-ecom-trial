import React, { useState } from 'react';
import { useEffect } from 'react';
import StarRatings from 'react-star-ratings';

export default function Home(props) {
  const { UserCart, UpdateCart, ProductList, UpdateProductList, FetchProducts, isFetched} = props;

  const [FilteredProducts, setFilteredProducts] = useState([{}]);



  const ProductCategories = [ ...new Set(ProductList.map( prod => prod.category ))]


  const handleSubmit = (e) => {
    e.preventDefault();
    const Category = e.target.category.value;

    setFilteredProducts(ProductList.filter(e => (e.category === Category || Category === 'blank')))

   
  }



  useEffect(() => {
    if(!isFetched) FetchProducts()
    else setFilteredProducts(ProductList)

  }, [isFetched]);

  const handlePurchase = (prod) => {
    const product_found = UserCart.find(e => e.id == prod.id)
    if(product_found){
      UpdateCart(UserCart.map(e =>  e.id == prod.id ? {...e, quantity: e.quantity+1} : e))
    }else UpdateCart([...UserCart,{...prod, quantity: 1}])
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
      {isFetched ? FilteredProducts?.map( (prod) => {
        return(
          <div className='product-card'>
           <img src={prod.image} alt="" />
           <h1>{prod.title}</h1>
           
           <StarRatings rating={prod?.rating?.rate} starRatedColor="blue" numberOfStars={5} name='rating' starDimension='20px' starSpacing='5px'/>
           {/* <p className='product-desc'>{prod.description}</p> */}
            <p>{prod.price}$</p>
           


           <div className='hover-description'>
           <p className='product-desc'>{prod.description}</p>
           <button onClick={() => handlePurchase(prod)}>Purchase</button>
           </div>
           
          </div>
        
        
        )
      } ): <img src="./Infinity-1s-510px.svg" alt="" className='product-loader'/>}

      </div>
    </div>

    
  )
}