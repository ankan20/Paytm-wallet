import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button';
import { InputBox } from '../components/InputBox';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import axios from 'axios';

const Profile = React.memo(() => {
  
  const [isEdite,setIsEdite] = useState(true);
  return (
    <>
    
      {
        isEdite ? ( <ProfileSection setIsEdite={setIsEdite}/>) : (
          <ProfileEditeForm setIsEdite={setIsEdite}/>
        ) 
      }
    
    </>
    
  )
})


function ProfileSection ({setIsEdite}){
  const navigate = useNavigate();
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [username,setUsername]=useState("");
  const [amount,setAmount]=useState(1000);
  const getInfo =async ()=>{
    const response = await axios.get("http://localhost:3000/api/v1/user/me", {
      headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
      }});
      if(!response.data.success){
        navigate("/signup");
      }
  setFirstName(response.data.firstName);
  setLastName(response.data.lastName);
  setUsername(response.data.username);
  const res = await axios.get("http://localhost:3000/api/v1/account/balance", {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }});
    setAmount(Math.floor(res.data.balance))
  }
  getInfo();
  return (
    <div className='flex flex-col items-center '>
          <div  className="shadow h-14 flex justify-between bg-blue-200 w-full">
            <button onClick={function (){navigate("/")}} className="flex flex-col justify-center h-full ml-4 font-bold text-2xl">
                PayTM App
            </button>
          
        </div>
        <div className='mt-4 flex flex-col w-[50%] items-center bg-green-300 gap-5 p-5 rounded-md'>
          <h3 className='font-bold text-2xl'>Profile</h3>
          <h3 ><b>Username</b> : {username}</h3>
          <h3><b>Full Name</b> : {firstName} {lastName}</h3>
          <h3><b>Total Amout</b> : {amount}</h3>
          <Button label={"Update Information"} onClick={function (){setIsEdite(prev=>!prev)}}/>
        </div>
        </div>
  )
}

function ProfileEditeForm ({setIsEdite}){
  const navigate = useNavigate();
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [password,setPassword] = useState("");
  useEffect( ()=>{
    async function getData (){
      const response = await axios.get("http://localhost:3000/api/v1/user/me", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }});
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
    }
    getData();
   
  },[])

  const onCancel =()=>{
    setIsEdite(prev=>!prev);
  }

  const onSubmit = async()=>{
    
    const response = await axios.put("http://localhost:3000/api/v1/user/update",{
      firstName,
      lastName,
      password
    }, {
      headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
      }});
      if(response.data.success){
        setIsEdite(prev=>!prev);
      }
  }

  return (
    <>
      <div className='flex flex-col items-center'>
      <div  className="shadow h-14 flex justify-between bg-blue-200 w-full">
            <button onClick={function (){navigate("/")}} className="flex flex-col justify-center h-full ml-4 font-bold text-2xl">
                PayTM App
            </button>
          
        </div>
        
      <div className="flex flex-col gap-2  items-center bg-white px-2 rounded-md">
        <Heading label={"Change Information"} />
        <SubHeading label={"Enter your informations"} />
        <InputBox
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          label={"First Name"}
          value={firstName}
        />
        <InputBox
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          label={"Last Name"}
          value={lastName}
        />
        
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label={"Password"}
          placeholder={"add your new password"}
        />
        <div className="mt-2 w-full">
          <Button  label={"Submit"} onClick={onSubmit}/>
          <Button  label={"Cancel"} onClick={onCancel}/>
        </div>

        
      </div>
    </div>
      
       
    </>
  )
}

export default Profile
