import { Fragment, useState } from "react";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from 'axios'
import validator from 'validator'
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";




export default function SignIn ({setFormState = () => {}}) {
    //  adding default value to props to avaoid error

    // use states to save the user inputs
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate();

    async function handleClickButton () {

        // this is signIn/login function
        // will validate the email and password
        // then will send the request backend

        try {
            if(!validator.isEmail(email)){
                throw new Error('Please Enter valid email')
            }
            if(!password?.trim()) {
                throw new Error('Please Enter the password')
            }
            
            // calling api
            const userData = {
                email, password
            }
            const data = await axios.post('http://localhost:8000/signin',userData)

             // saving the token in local storage. so that we could send this in authenticated apis
            // and pushing user to the posts page
            localStorage.setItem('user_auth_token', data?.data?.token)
            navigate("/posts");
        }
        catch(error){
            toast.error(
                error?.response?.data?.message ||
                error?.message
            )
        }
    }
    function handleSignUp () {
        // user has requested for signUp , so setting form state to signUp
        setFormState('signUp')
    }

    return (
        <Fragment>
            <div className="flex h-10 items-center bg-gray-200 p-2 rounded-lg w-60">
                <CiUser/>
                <input 
                    className="outline-none bg-transparent rounded-lg pl-2 text-sm" 
                    placeholder="Email"
                    onChange={
                        (e)=> setEmail(e.target.value)
                    }
                />
            </div>


            <div className="flex h-10 items-center bg-gray-200 p-2 rounded-lg w-60">
                <RiLockPasswordLine/>
                <input 
                    className="outline-none bg-transparent rounded-lg pl-2 text-sm" 
                    type="password" 
                    placeholder="password"
                    onChange={
                        (e)=> setPassword(e.target.value)
                    }
                />
            </div>

            <button 
                className="bg-black w-60 h-10 rounded-lg text-white"
                onClick={handleClickButton}
            >
                SignIn
            </button>
            
            <div className="text-sm">
                Don't have an account ? 
                <span className="cursor-pointer font-bold pl-1" onClick={handleSignUp}>
                    SignUp here.
                </span>
            </div>

            
        </Fragment>
    )
}