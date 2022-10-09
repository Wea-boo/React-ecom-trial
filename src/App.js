import logo from './logo.svg';
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './component/Home';
import Profile from './component/Profile';
import Login from './component/Login';
import Register from './component/Register';
import axios from 'axios';
import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';


function App() {

  const [Users, setUsers] = useState([{}]);
  const [Products, setProducts] = useState([{}]);
  const [UsersFetched, setUsersFetched] = useState(false);
  const [ProductsFetched, setProductsFetched] = useState(false);
  const [authenticatedUser, setauthenticatedUser] = useState(-1);
  const [PurchasedProducts, setPurchasedProducts] = useState([{}]);
  const [OpenCart, setOpenCart] = useState(true);



  function getUsers() {
    axios.get('https://fakestoreapi.com/users')
    .then(res => {setUsers(res.data)
                  setUsersFetched(true)

    })
    .catch(err => console.log(err))
  }


  
  function getProduct() {
    axios.get('https://fakestoreapi.com/products')
    .then(res => { 
                  setProducts(res.data)
                  setProductsFetched(true)
    })
    .catch(err => console.log(err))
  }



  return (
    <div className="App">
      <nav className='navigation'>
        
        
        
        <ul id='contents'>
          <li className='content'><img src='./icons8-favorites.svg' alt="" id='nav-logo'/></li>
          <li className='content'><Link to='/' >Home</Link></li> 
          {authenticatedUser>0 ? <li className='content'><Link to='/Profile'>Profile</Link></li> : ''}
          
          {authenticatedUser<0 ? <li className='content'><Link to='/Login'>Login</Link></li> : <li className='content'><button onClick={() => setauthenticatedUser(-1)}></button></li>}
          <li className='content'><Link to='/Register'>Register</Link></li>

        </ul>

        <div id='shopping-cart'>
         <FaShoppingCart className='cart-icon' onClick={() => setOpenCart(!OpenCart) }/>
         <p>{PurchasedProducts.slice(1, PurchasedProducts.length).reduce( (p,c) => p + c.quantity, 0)}</p>  
        </div>
        



      </nav>

      <div className='modal-cart' style={!OpenCart ? {display: 'flex'} : {display: 'none'}}>
        <div className='modal-cart-content' >
          <AiOutlineClose onClick={() => setOpenCart(true)} className='close-modal-btn'/>
          <table className='cart-list'>
            <tr>
              <th>product</th>
              <th>quantity</th>
              <th>price</th>
            </tr>
            {PurchasedProducts.slice(1, PurchasedProducts.length).map( (prod,i) => {
              return(
               <tr key={`product-${i}`}>
                <td>{prod.title}</td>
                <td>x{prod.quantity}</td>
                <td>{prod.price}$</td>
              </tr> 
              )
              
            })}
            <tr key="total">
              <td></td>
              <td></td>
              <td>{PurchasedProducts.slice(1, PurchasedProducts.length).reduce( (p,c) => p + c.quantity*c.price, 0).toFixed(2)}$</td>
            </tr>

            
           </table>  
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home UserCart={PurchasedProducts} UpdateCart={setPurchasedProducts} ProductList={Products} UpdateProductList={setProducts} FetchProducts={getProduct} isFetched={ProductsFetched}/>}/>
        <Route path='/Profile/:id' element={<Profile/>}/>
        <Route path='/Login' element={<Login UserList={Users} isFetched={UsersFetched} fetchUsers={getUsers} setCurrentUser={setauthenticatedUser} CurrentUser={authenticatedUser}/>}/>
        <Route path='/Register' element={<Register UserList={Users} isFetched={UsersFetched} fetchUsers={getUsers} updateUsers={setUsers}/>}/>
        
      </Routes>
      
    </div>
    
  );
}

export default App;
