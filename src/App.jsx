import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appWrite/auth"
import { login, logout } from "./store/AuthSlice"
import { Footer, Header } from "./components"
import { Outlet } from "react-router-dom"


function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{   
    authService.getCurrentUser()    //checking is there any user active or not 
    .then((userData)=>{   //if user exist then this will return the promise and the data of that user
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))   //this code will be executed in every case 
  },[])
  

  return !loading ?(
    <div className="min-h-screen flex content  bg-gray-400">
      <Header/>
      <main>
         <Outlet/>
      </main>
      <Footer/>
    </div>
  ) : null
}

export default App
 