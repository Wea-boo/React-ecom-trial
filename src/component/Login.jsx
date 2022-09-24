import React from 'react'
import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Profile from './Profile';

export default function Login(props) {
  const navigate = useNavigate()

  const { UserList, isFetched, fetchUsers, setCurrentUser, CurrentUser } = props
    
    useEffect(() => {
      if (!isFetched) fetchUsers()
      

    }, [isFetched])

    const handleSubmit = (e) => {
      e.preventDefault();
      let email = e.target.email.value;
      let password = e.target.password.value;

      let UserFound = UserList.find( (e) => e.email === email && e.password === password )

      if (UserFound){
      setCurrentUser(UserFound.id)
      

      }
      
      else console.log("USER NOT FOUND")
    }



    useEffect(() => {
      if(CurrentUser > 0) navigate(`/Profile/${CurrentUser}`)
    }, [CurrentUser]);
  return (



    
    <div className='login-page'>
      <div className='login-window'>
      <form onSubmit={handleSubmit}>            
            <label>E-mail</label>
            <input type="email" name='email'/>
            <label>Password</label>
            <input type="password" name="password"/>

            
            <button type='submit' >ENTER</button>
        </form>

      </div>

  <Routes>
    <Route path='/Profile/:id' element={<Profile/>}/>
  </Routes>
    </div>
  )
}
