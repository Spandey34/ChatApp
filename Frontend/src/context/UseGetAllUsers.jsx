import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';

function UseGetAllUsers() {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUsers =  async() => {
            setLoading(true);
        try {
            const token = Cookies.get("jwt");
            console.log("jwt token is", token);
            const response = await axios.get("https://chatapp-if9x.onrender.com/api/user/allusers", {
                withCredentials: true//to receive cookies in the response
            })
            setAllUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.log("Error in useGetAllUsers: " + error.message);
        }
        }
        getUsers();
        
    },[])
  return (
    [allUsers, loading]
  )
}

export default UseGetAllUsers
