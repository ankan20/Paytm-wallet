import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HistoryCard from '../components/HistoryCard';
import axios from 'axios';

const History = React.memo(() => {
    const navigate = useNavigate();
    //user, receiver, amount
    const [user,setUser]= useState({});
    
    const[history,setHistory]=useState([]);
    useEffect(()=>{
        async function getHistory(){
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/history", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }});
                    console.log(response.data);
                    setHistory(response.data.history); 
                    setUser(response.data.user);
            }
            catch (error){
                console.log("Error in history : ",error);
            }
        }
        getHistory();
    },[])

  return (
    <div>
        <div  className="shadow h-14 flex justify-between bg-blue-200 w-full">
            <button onClick={function (){navigate("/")}} className="flex flex-col justify-center h-full ml-4 font-bold text-2xl">
                PayTM App
            </button>
          
        </div>
        {
            history.map((item)=>{
                return (
                    <HistoryCard key={item._id} user={user} receiver={item.receiverId} sender={item.senderId}  amount={item.amount}/>
                )
            })
        }
      
    </div>
  )
})

export default History
