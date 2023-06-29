import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Profile from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setAuthUser } from '../store/store';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.users.userList);
  const isFetched = useSelector((state) => state.users.isFetched);
  const AuthUser = useSelector((state) => state.users.AuthUser);
  
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    if (!isFetched) dispatch(fetchUsers());
  }, [dispatch, isFetched]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    let userFound = userList.find((user) => user.email === email && user.password === password);

    if (userFound) {
      dispatch(setAuthUser(userFound.id));
    } else {
      console.log("USER NOT FOUND");
    }
  };

  useEffect(() => {
    if(AuthUser > 0) navigate(`/Profile/${AuthUser}`);
  }, [AuthUser, navigate]);

  return (
    <div className='login-page'>
      <div className='login-window'>
      <h1 className='title'>SIGN IN TO YOUR ACCOUNT:</h1>
      <form onSubmit={handleSubmit} className='form'>                     
            <input type="email" name='email' placeholder='Email' className='input'/> 
            <div className='input-container'>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                placeholder='Password' 
                className='input'
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility} 
                className='toggle-password'
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
            <button type='submit' className='button'>ENTER</button>
        </form>
      </div>
  <Routes>
    <Route path='/Profile/:id' element={<Profile/>}/>
  </Routes>
    </div>
  );
}
