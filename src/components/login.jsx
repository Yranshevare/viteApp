import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/AuthSlice'
import {Button,Input,Logo}from "./index"
import { useDispatch } from 'react-redux'
import { authService } from '../appWrite/auth'
import { useForm } from 'react-hook-form'

function login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register,handelSubmit} = useForm()
    const [error, setError] = useState(null);

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)   
            if(session){        //checking is there any user with the  given id password
                const userdata = await authService.getCurrentUser()     //if user exist get its detail
                if(userdata) {
                    dispatch(authLogin(userdata))
                }
                navigate("/")       //navigate to root after the login
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='flex item-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign Up
                </Link>
            </p>
            {
                error && <p className="text-red-600 mt-8 text-center">{error}</p>
            }

            <form onSubmit={handelSubmit(login)} className='mt-8'>
                <div className='space-y-s'>
                    <Input 
                     label='Email:'
                     palaceholder = "enter your email"
                     type = "email"
                     {
                        ...register("email",{      //inbuilt feature of appWrite
                        required: true,
                        validate: {
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
                        ...register("password",{
                            required: true
                        })
                      }
                    />
                    <Button
                     type='submit'
                     className='w-full'
                    >signIn</Button>
                </div>
            </form>
        </div>
      
    </div>
  )
}

export default login
