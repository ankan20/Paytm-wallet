import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors,setErrors] = useState({});
  const navigate = useNavigate()

  const onClick = async()=>{
    
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
        username,
        firstName,
        lastName,
        password
      });    
        localStorage.setItem("token",response.data.token);
        navigate("/dashboard");      

    }
    catch (error){
      
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
    <div className="flex justify-center items-center bg-sky-300 h-[100vh] ">
      <div className="flex flex-col gap-2  items-center bg-white px-2 rounded-md">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your information to create an account"} />
        <InputBox
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          label={"First Name"}
          placeholder={"ankan"}
        />
        {errors.firstName && <ErrorMessage  message={errors.firstName}/> }
        <InputBox
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          label={"Last Name"}
          placeholder={"das"}
        />
        {errors.lastName && <ErrorMessage  message={errors.lastName}/> }
        <InputBox
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          label={"Email"}
          placeholder={"ankan@gmail.com"}
        />
        {errors.username && <ErrorMessage  message={errors.username}/> }
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label={"Password"}
          placeholder={"kuchvi"}
        />
        {errors.password && <ErrorMessage  message={errors.password}/> }
        <div className="mt-2 w-full">
          <Button onClick={onClick} label={"Sign up"} />
        </div>

        <BottomWarning
          label={"Already have an account ?"}
          buttonText={"Sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
};

export default Signup;
