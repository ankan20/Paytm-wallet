import React from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import {InputBox} from '../components/InputBox'
import {Button} from '../components/Button'
import {BottomWarning} from '../components/BottomWarning'

const Signin = () => {
  return (
    <div className='flex justify-center items-center bg-sky-300 h-[100vh] '>
      <div className='flex flex-col gap-2  items-center bg-white px-2 rounded-md'>
        <Heading label ={"Sign in"} />
        <SubHeading label = {"Enter your credentials to aceess your account"} />
        <InputBox label={"Enail"} placeholder={"ankan@gmail.com"}/>
        <InputBox label={"Password"} placeholder={"kuchvi"}/>
        <div className='mt-2 w-full'><Button  label={'Sign in'} /></div>
        
        <BottomWarning label={"Don't have  an account?"} buttonText={"Sign up"} to={"/signup"}/>
      </div>
    </div>
  )
}

export default Signin
