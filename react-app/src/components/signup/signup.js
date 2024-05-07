import { Fragment, useState } from "react";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from 'react-toastify';
import validator from 'validator';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



export default function SignUp ({setFormState = () => {}}) {

    // added deault value to prop

    // use states to save the user inputs
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [isConsent, setIsConsent] = useState(false)

    const navigate = useNavigate();



    async function handleClickButton () {

        // this function will validate the user input
        // and call backend api to save user.

        try {
            if(!validator.isAlpha(name.replace(/\s/g, ''))){
                throw new Error('Please Enter valid name')
            }
            if(!validator.isEmail(email)){
                throw new Error('Please Enter valid email')
            }
            if(!validator.isMobilePhone(mobile, 'en-IN')){
                throw new Error('Please Enter valid indian mobile')
            }
            if(!password?.trim()){
                throw new Error('Please set password for account')
            }
            if(!isConsent){
                throw new Error('Please agree to terms and conditions')
            }
            // if exicution come till here mean no validation error
            // call api call to backend

            const userData = {
                name, email,
                password, mobile,
            }

            // api call to backend

            const data = await axios.post(
                'http://localhost:8000/signup', // backend address + endpoint
                userData
            )
            // saving the token in local storage. so that we could send this in authenticated apis
            // and pushing user to the posts page
            localStorage.setItem('user_auth_token', data?.data?.token)
            navigate('/posts')
        }
        catch(error){
            toast.error(
                error?.response?.data?.message || 
                error?.message || 
                'Something went wrong'
            )
        }
    }

    function handleSignIn () {
        // user requested for signIn, so changing form state to signIn
        setFormState('signIn')
    }

    return (
        <Fragment>
            {/* name input */}
            <div className="flex h-10 items-center bg-gray-200 p-2 rounded-lg w-60">
                <CiUser/>
                <input 
                    className="outline-none bg-transparent rounded-lg pl-2 text-sm 	w-full" 
                    placeholder="Name"
                    onChange={
                        (e)=> setName(e.target.value)
                    }
                />
            </div>

            {/* email input */}
            <div className="flex h-10 items-center bg-gray-200 p-2 rounded-lg w-60">
                <CiUser/>
                <input 
                    className="outline-none bg-transparent rounded-lg pl-2 text-sm	w-full" 
                    placeholder="Email"
                    onChange={
                        (e)=> setEmail(e.target.value)
                    }
                />
            </div>

            {/* mobile input */}
            <div className="flex h-10 items-center bg-gray-200 p-2 rounded-lg w-60">
                <CiUser/>
                <input 
                    className="outline-none bg-transparent rounded-lg pl-2 text-sm	w-full" 
                    placeholder="Mobile"
                    maxLength={10}
                    onChange={
                        (e)=> setMobile(e.target.value)
                    }
                />
            </div>

            {/* password input */}
            <div className="flex h-10 items-center bg-gray-200 p-2 rounded-lg w-60">
                <RiLockPasswordLine/>
                <input 
                    className="outline-none bg-transparent rounded-lg pl-2 text-sm w-full" 
                    type="password" 
                    placeholder="password"
                    onChange={
                        (e)=> setPassword(e.target.value)
                    }
                />
            </div>

            {/* checkbox input */}
            <div className="flex gap-1">
                <input 
                    type="checkbox" 
                    className="cursor-pointer"
                    onChange={
                        () => setIsConsent(!isConsent)
                    }
                />
                <p className="text-sm ">I agree to the Terms & Conditions</p>
            </div>

            <button 
                className="bg-black w-60 h-10 rounded-lg text-white"
                onClick={handleClickButton}
            >
                SignUp
            </button>

            <div className="text-sm">
                Already have an account ? 
                <span className="cursor-pointer font-bold pl-1" onClick={handleSignIn}>
                    SignIn here.
                </span>
            </div>
        </Fragment>
    )
}