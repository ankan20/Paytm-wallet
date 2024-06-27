import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({component}) => {
    const navigate = useNavigate();
    useEffect(()=>{
        async function getAuthdetails (){
            let token = localStorage.getItem('token') || "";
            const response = await axios.get("http://localhost:3000/api/v1/user/me",{
                headers: {
                    Authorization: "Bearer " + token 
                }
            });
            if(!response.data.username){
                navigate("/signin");
            }
        }

        getAuthdetails();
    })
  return (
    <div>
      {component}
    </div>
  )
}

export default ProtectedRoute
