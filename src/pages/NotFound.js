import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
          navigate(-1)
        },3000) 
    })
    return <p>Not found!</p>
}

export default NotFound