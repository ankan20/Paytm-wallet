import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const onClick = async()=>{
    const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
      username,
      firstName,
      lastName,
      password
    });
    localStorage.setItem("token",response.data.token);
    navigate("/dashboard");
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
        <InputBox
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          label={"Last Name"}
          placeholder={"das"}
        />
        <InputBox
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          label={"Email"}
          placeholder={"ankan@gmail.com"}
        />
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label={"Password"}
          placeholder={"kuchvi"}
        />
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
