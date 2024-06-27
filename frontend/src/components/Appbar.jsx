import axios from "axios";
import { memo, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const Appbar = memo(() => {

    const [firstName,setFirstName] = useState("Hello");
    const [avatar,setAvatar]=useState("U");
    const navigate = useNavigate();
    const getMyInfo = async ()=>{
        const response = await axios.get("http://localhost:3000/api/v1/user/me", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }});
            
            
        setFirstName(response.data.firstName);
        setAvatar(response.data.firstName[0].toUpperCase());
    }
    getMyInfo();

    const navigateToProfile =()=>{
        navigate("/profile");
    }

    return <div className="shadow h-14 flex justify-between bg-blue-200">
        <div className="flex flex-col justify-center h-full ml-4 font-bold text-2xl">
            PayTM App
        </div>
        
        <div className="flex">
            
            <div className="flex flex-col justify-center h-full mr-4">
                {firstName}
            </div>
            
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <button onClick={navigateToProfile} className="flex flex-col justify-center h-full text-xl">
                    {avatar}
                </button>
            </div>
        </div>
    </div>
})