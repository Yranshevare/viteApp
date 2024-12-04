import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { authService } from '../appWrite/auth'
import { login  } from '../store/AuthSlice'
import {Button,Input,Logo}from "./index"
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'



function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register,handelSubmit} = useForm()
    const [error, setError] = useState(null);

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if(userData){
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(login(userData))
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                 to="/login"
                 className="font-medium text-primary transition-all duration-200 hover:underline"
                 >
                    Sign In
                </Link>
            </p>
            {
                error && <p className="text-red-600 mt-8 text-center">{error}</p>
            }

            <form onSubmit={handelSubmit(create)}>
                <div className='space-y-5'>
                    <Input 
                      label="Full Name: "
                      placeholder="Enter your full name"
                      {
                        ...register("name", {
                          required: true,
                        })
                      }
                    />

                    <Input 
                     label='Email:'
                     palaceholder = "enter your email"
                     type = "email"
                     {
                        ...register("email",{      //inbuilt feature of appWrite
                            required: true,
                            validate: {     //form validation code 
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||       //regex to test on the email(value)
                                "Email address must be a valid address",
                            }
                        })
                     }
                    />

                    <Input
                     label="Password: "
                     type="password"
                     placeholder="Enter your password"
                     {
                        ...register("password", {
                            required: true,
                        })
                     }
                    />  

                    <Button className='w-full'>create account</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup
