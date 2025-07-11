'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from "react-hot-toast";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignupPage = () => {

    const [user, setUser] = useState({
            name: "",
            email: "",
            password:""
    })

    const [disablebutton, setDisablebutton] = useState(true);

    const [loading, setLoading] = useState(false);

    const router = useRouter()




    const SignUp = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
      

     try {
        setLoading(true)
        const response = await axios.post("api/auth/signup" , user)
        
        
       const res =console.log( "Signup success" , response.data);
       
       setUser({
           name:"",
            email: "",
            password:""
       })
       
       if (response) {
        router.push('/login')
        setLoading(false)
        
       }
       setLoading(false)
       return res;

     } catch (error:any) {
        console.log("something went wrong in SignUp :" , error.message);
        toast.error(error.message)
        
     }

    }

    useEffect(() => {
           if(user.email.length > 0 && user.password.length > 0 && user.name.length > 0) {
            setDisablebutton(false);
        } else {
            setDisablebutton(true);
        }
    
     
    }, [user])
    

  return (
<div className='flex p-4 w-screen h-screen justify-center items-center'  >
    <form onSubmit={SignUp} >
        <div className="flex flex-col border px-20 border-violet-600 rounded-2xl items-center justify-center w-full py-8">
          
    
              {loading? "Processing...":" Sign Up"}
            <hr />
        <label htmlFor="username">name:</label>
        <input
        value={user.name}
        onChange={(e)=>setUser({...user , name:e.target.value})}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        placeholder='username'
        
        type="text" />

          <label htmlFor="email">email:</label>
        <input
        value={user.email}
        onChange={(e)=>setUser({...user , email:e.target.value})}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        placeholder='email'
        
        type="email" />

          <label htmlFor="password">password:</label>
        <input
        value={user.password}
        onChange={(e)=>setUser({...user , password:e.target.value})}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        placeholder='password'
        
        type="password" />
    
    <button
    disabled={disablebutton}
    type='submit'
    
    //   className="p-2 border border-violet-500 rounded-lg mb-4 focus:outline-none "
    >

       {disablebutton? <div 
       className="p-2 border  border-violet-600 rounded-lg mb-4 focus:outline-none"
       >
        No Signup
       </div>: <div
       className="p-2 text-xl cursor-grab border border-violet-600 rounded-lg mb-4 focus:outline-none  hover:bg-violet-800"
       >
       
        Signup
       </div> }

    </button>
    

   
    

    <Link href="/login" >
    visit login page
    </Link>



      
    </div>
    </form>
    <br />
     
</div>
  )
}

export default SignupPage
