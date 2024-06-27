import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import {InputBox} from '../components/InputBox'
import {Button} from '../components/Button'
import {BottomWarning} from '../components/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'


const Signin = () => {
  const [username,setUsername] = useState("");
  const [password,setPassword]=useState("");
  const [errors,setErrors] = useState({});
  const navigate = useNavigate()

  const onClick = async()=>{
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
        username,password
      });
      localStorage.setItem("token",response.data.token);
      navigate("/dashboard");
    }
    catch (error){
      console.log("Error : ",error.response.data.errorMessage);
      setErrors(error.response.data.errorMessage.reduce((acc, error) => {
        if (error.path && error.path.length > 0) {
          const field = error.path[0];
          acc[field] = error.message;
        }
        return acc;
      }, {}));
    }
  }
  return (
    <div className='flex justify-center items-center bg-sky-300 h-[100vh] '>
      <div className='flex flex-col gap-2  items-center bg-white px-2 rounded-md'>
        <Heading label ={"Sign in"} />
        <SubHeading label = {"Enter your credentials to aceess your account"} />
        <InputBox label={"Enail"} placeholder={"ankan@gmail.com"} onChange={function (e){setUsername(e.target.value)}}/>
        {errors.username && <ErrorMessage  message={errors.username}/> }
        <InputBox label={"Password"} placeholder={"kuchvi"} onChange={function (e){setPassword(e.target.value)}}/>
        {errors.password && <ErrorMessage  message={errors.password}/> }
        <div className='mt-2 w-full'><Button  label={'Sign in'} onClick={onClick}/></div>
        
        <BottomWarning label={"Don't have  an account?"} buttonText={"Sign up"} to={"/signup"}/>
      </div>
    </div>
  )
}

export default Signin
