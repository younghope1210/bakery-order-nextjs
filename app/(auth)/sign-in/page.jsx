"use client"
import React, { useEffect, useState } from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LoaderIcon } from 'lucide-react'
// import { getCookie, setCookie } from 'cookies-next'


function  SignIn(){

  const [password,setPassword]=useState();
  const [email,setEmail]=useState();
  const [loader,setLoader]=useState(true);


  const router = useRouter();

  useEffect(() => {

     // const jwt = setCookie('jwt');
     const jwt = typeof window !== 'undefined' ? sessionStorage.getItem('jwt') : null;
    
    if(jwt){
       
      router.push('/')
    }

   },[])

  const onSignIn = () => {
    setLoader(true);
    GlobalApi.SignIn(email,password).then(res => {

      console.log(res.data.user);
      console.log(res.data.jwt);
      
      sessionStorage.setItem('user', JSON.stringify(res.data.user));
      sessionStorage.setItem('jwt', res.data.jwt);
      // setCookie('user',JSON.stringify(res.data.user));
      // setCookie('jwt', res.data.jwt);

      toast("Login Successfully")
      
      router.push('/');
      
      setLoader(false)

    },(e)=>{
        console.log(e);
        toast(e?.response?.data?.error?.message);
        setLoader(false);
    })
}

  return (
    <div className='flex items-baseline justify-center my-20'>
      <div className='flex flex-col items-center justify-center p-10 border-gray-200'>
        <h1 className='text-2xl text-primary font-bold'>BROWN BAKERY</h1>
        <h2 className='font-bold text-3xl'>Sign In to Account</h2>
      <h2 className='text-gray-500'>Enter your Email and Password to Sign In </h2>
     
      <div className='w-full flex flex-col gap-5 mt-7'>
    
        <Input placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input type='password' placeholder='Password'
          onChange={(e)=>setPassword(e.target.value)}
        />
        <Button onClick={()=> onSignIn()}
          disabled={!(email||password)} 
        >
          {loader?<LoaderIcon className='animate-spin'/>:'Sign In'} 
        </Button>
        <p>Don&apos;t have an account  ?
            <Link href={'/create-account'} className='text-red-500 mx-2'>
            Click here to create new account
            </Link>
        </p>
      </div>

      </div>
    </div>
  )
}

export default SignIn
