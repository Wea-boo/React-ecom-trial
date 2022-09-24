import logo from './logo.svg';
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './component/Home';
import Profile from './component/Profile';
import Login from './component/Login';
import Register from './component/Register';
import axios from 'axios';
import { useState } from 'react';


function App() {

  const [Users, setUsers] = useState([{}]);
  const [Products, setProducts] = useState([{}]);
  const [UsersFetched, setUsersFetched] = useState(false);
  const [ProductsFetched, setProductsFetched] = useState(false);
  const [authenticatedUser, setauthenticatedUser] = useState(-1);


  function getUsers() {
    axios.get('https://fakestoreapi.com/users')
    .then(res => {setUsers(res.data)
                  setUsersFetched(true)

    })
    .catch(err => console.log(err))
  }


  
  function getProduct() {
    axios.get('https://fakestoreapi.com/products')
    .then(res => {setProducts(res.data)
                  setProductsFetched(true)
    })
    .catch(err => console.log(err))
  }



  return (
    <div className="App">
      <nav className='navigation'>
        
        <ul id='contents'>
          <li className='content'><Link to='/' >Home</Link></li> 
          {authenticatedUser>0 ? <li className='content'><Link to='/Profile'>Profile</Link></li> : ''}
          
          {authenticatedUser<0 ? <li className='content'><Link to='/Login'>Login</Link></li> : <li className='content'><button onClick={() => setauthenticatedUser(-1)}></button></li>}
          <li className='content'><Link to='/Register'>Register</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/Profile/:id' element={<Profile/>}/>
        <Route path='/Login' element={<Login UserList={Users} isFetched={UsersFetched} fetchUsers={getUsers} setCurrentUser={setauthenticatedUser} CurrentUser={authenticatedUser}/>}/>
        <Route path='/Register' element={<Register UserList={Users} isFetched={UsersFetched} fetchUsers={getUsers} updateUsers={setUsers}/>}/>
        
      </Routes>
      
    </div>
    
  );
}

export default App;
