/* eslint no-useless-escape: 0 */

import { useForm } from "react-hook-form";
import { login } from "actions";
import { Navigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import onlyGuest from "components/hoc/onlyGuest";


const Login = () => {

    const { register, handleSubmit } = useForm()
    const [redirection, setRedirection] = useState(false)

    const loginHandle = (data) => {
        login(data)
            .then(() => setRedirection(true), errorMessage => toast.error(errorMessage))
    }

    if (redirection) {
        return <Navigate to="/"></Navigate>

    }

    return (
        <div className="flex flex-col gap-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Login</h1>
                <p>Please login to proceed</p>
            </div>
            <form
                onSubmit={handleSubmit(loginHandle)}
                className="flex flex-col gap-4 w-1/3 mx-auto p-8 border-2">
                <div>
                    <div>
                        <label className="mb-2 block"> Add your email</label>
                    </div>
                    <input type="email"
                           {...register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })} 
                           className="border-gray-300 bg-gray-50 rounded-lg w-full"></input>
                </div>
                <div>
                    <div>
                <label className="mb-2 block">Password</label>
                   </div>
                <input type="password" 
                       autoComplete="password"  
                       {...register('password', { required: true, minLength: 8, pattern: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i })} 
                       className="border-gray-300 bg-gray-50 rounded-lg w-full"></input>
                </div >
                 <button type="submit" className="border-2 mt-5 bg-blue-600 p-2 rounded-lg font-semibold tracking-wide text-sm text-white">Submit</button>

            </form >
    <div>
        <Toaster />
    </div>
        </div >
    )
}

export default onlyGuest(Login)