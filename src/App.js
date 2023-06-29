import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './component/Home';
import Profile from './component/Profile';
import Login from './component/Login';
import Register from './component/Register';
import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import store, { addToCart, setAuthUser, resetCart } from './store/store';
import Modal from 'react-modal';

const customStyles = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      height: '80%',
      overflow: 'scroll'
  }
};

function App() {
  const dispatch = useDispatch();
  const [OpenCart, setOpenCart] = useState(false);
  const { authenticatedUser, PurchasedProducts } = useSelector(state => ({
    authenticatedUser: state.authUser.id,
    PurchasedProducts: state.cart,
  }));

  const logout = () => dispatch(setAuthUser(-1));
  const reset = () => dispatch(resetCart());

  

  return (
    <div className="App">
      <nav className='navigation'>
        <ul id='contents'>
          <li className='content'><img src='./icons8-favorites.svg' alt="" id='nav-logo'/></li>
          <li className='content'><Link to='/' >Home</Link></li> 
          {authenticatedUser > 0 ? <li className='content'><Link to='/Profile'>Profile</Link></li> : ''}          
          {authenticatedUser < 0 ? <li className='content'><Link to='/Login'>Login</Link></li> : <li className='content'><button onClick={logout}>Logout</button></li>}
          <li className='content'><Link to='/Register'>Register</Link></li>
        </ul>
        <div id='shopping-cart'>
          <FaShoppingCart className='cart-icon' onClick={() => setOpenCart(!OpenCart) }/>
          <p>{PurchasedProducts.length - 1}</p> 
        </div>
      </nav>

      <Modal 
        isOpen={OpenCart}
        onRequestClose={() => setOpenCart(false)}
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>Your Shopping Cart</h2>
            <button onClick={() => setOpenCart(false)} className="close-modal-btn">x</button>
          </div>
          <div className="modal-body">
            <table className='cart-list'>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {PurchasedProducts.slice(1, PurchasedProducts.length).map((prod,i) => {
                  return(
                    <tr key={`product-${i}`}>
                      <td>{prod.title}</td>
                      <td>x{prod.quantity}</td>
                      <td>{prod.price}$</td>
                      <td>{(prod.quantity*prod.price).toFixed(2)}$</td>
                    </tr> 
                  )
                })}
              </tbody>
            </table>
            <div className="total-price">
              <h5>Total: <span>{PurchasedProducts.slice(1, PurchasedProducts.length).reduce( (p,c) => p + c.quantity*c.price, 0).toFixed(2)}$</span></h5>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={() => setOpenCart(false)} className="close-button">Close</button>
            <button onClick={() => reset} className="checkout-button">Checkout</button>
          </div>
        </div>
      </Modal>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/Profile/:id' element={<Profile />}/>
        <Route path='/Login' element={<Login />}/>
        <Route path='/Register' element={<Register />}/>
      </Routes>
    </div>
  );
}

export default App;
