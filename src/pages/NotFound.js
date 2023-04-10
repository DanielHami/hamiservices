import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
          navigate(-1)
        },3000) 
    })
    return <p>Not found!</p>
}

