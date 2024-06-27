import { useNavigate } from "react-router-dom"
import { Button } from "./Button"

export const Balance = ({ value }) => {
    const navigate = useNavigate();
    const handleClick =()=>{
        navigate("/history");
    }
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {value}
        </div>
        <div className="flex justify-start items-center ml-10">
        <Button label={"History"} onClick={handleClick}/>
        </div>
    </div>
}