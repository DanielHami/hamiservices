import RegistrationForm from "components/forms/RegistrationForm";
import toast, { Toaster } from 'react-hot-toast';
import {connect} from 'react-redux'
import { register } from "actions";
import {useState} from 'react'
import {Navigate} from 'react-router-dom'
import onlyGuest from "components/hoc/onlyGuest";

 
const Register = (props) => {
    const [redirection, setRedirection] = useState(false)
    
    const registerUser = (userData) => {
        register(userData)
        .then(() => setRedirection(true), errorMessage => toast.error(errorMessage))

    }

    if(redirection) {
        return <Navigate to="/"></Navigate>
        
    }
    return(
    <>
       <RegistrationForm onRegister = {registerUser}/>
       <Toaster/>
    </>
    )
}

export default onlyGuest (connect()(Register))