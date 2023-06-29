
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUserList, addUser } from '../store/store';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

export default function Register(props) {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const users = useSelector(state => state.users.list);
    const isFetched = useSelector((state) => state.users.isFetched);
    const AuthUser = useSelector((state) => state.users.AuthUser);
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        let new_user = {
            "id": users.length + 1,
            "username": e.target.username.value,
            "password": e.target.password.value,
            "email": e.target.email.value,
            "name": {
                "firstname": e.target.firstname.value,
                "lastname": e.target.lastname.value
            },
            "phone": e.target.phone.value
        }
        
        if (users.find((user) => (user.username === new_user.username) || (user.email === new_user.email) || (user.phone === new_user.phone))){
            console.log("User already exists");
        } else {
            dispatch(addUser(new_user));
            console.log("new user registered");
        }
    }

    useEffect(() => {
        if (!isFetched) dispatch(fetchUsers());
      }, [dispatch, isFetched]);
    

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
        <div className='register-page'>
          <div className='register-window'>
            <h1 className='title'>CREATE YOUR ACCOUNT:</h1>
            <form onSubmit={handleSubmit} className='form'>                     
                <input type="text" name='username' placeholder='Username' className='input'/>
                <div className='input-group'>
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
                <input type="email" name='email' placeholder='E-mail' className='input'/>
                <input type="text" name='firstname' placeholder='Firstname' className='input'/>
                <input type="text" name="lastname" placeholder='Lastname' className='input'/>
                <input type="tel" name="phone" placeholder='Phone Number' className='input'/>
                
                <button type='submit' className='button'>CREATE</button>
            </form>
          </div>
        </div>
    );
}
