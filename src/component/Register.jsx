import React, { useEffect } from 'react'
import axios from 'axios';

export default function Register(props) {
    const { UserList, isFetched, fetchUsers, updateUsers } = props;


    const handleSubmit = (e) => {
        e.preventDefault();

        let new_user = {
            "id": UserList.length+1,
            "username": e.target.username.value,
            "password": e.target.password.value,
            "email": e.target.email.value,
            "name": {
                "firstname": e.target.firstname.value,
                "lastname": e.target.lastname.value
            },
            
            "phone": e.target.phone.value
        }

        
        
        if (UserList.find((e) => (e.username === new_user.username) || (e.email === new_user.email) || (e.phone === new_user.phone) ) ){
            console.log("try again")
        }else {updateUsers([...UserList, new_user]);
               console.log("new user registered")}

    }

    useEffect(() => {
        if (!isFetched) fetchUsers()
        
    }, [isFetched]);


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" name='username' />
            <label>Password</label>
            <input type="password" name="password"/>
            <label>E-mail</label>
            <input type="email" name='email'/>
            <label>Firstname</label>
            <input type="text" name='firstname'/>
            <label>Lastname</label>
            <input type="text" name="lastname"/>
            <label>Phone Number</label>
            <input type="tel" name="phone"/>
            
            <button type='submit' >ENTER</button>
        </form>
    </div>
  )
}
