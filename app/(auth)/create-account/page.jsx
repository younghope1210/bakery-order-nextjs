"use client"
import React, { useEffect, useState } from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LoaderIcon } from 'lucide-react'
// import { setCookie } from 'cookies-next'

function CreateAccount() {

  const [username,setUsername]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [loader,setLoader]=useState(true);

  const router = useRouter();


  useEffect(()=>{
        
    // const jwt = setCookie('jwt');
    const jwt = typeof window !== 'undefined' ? sessionStorage.getItem('jwt') : null;

    if(jwt) {

          router.push('/sign-in')
      }

    },[])


  const onCreateAccount = () => {

    setLoader(true);
    
    GlobalApi.registerUser(username,email,password).then(res => {
      
      // console.log(res.data.user);
      // console.log(res.data.jwt);
      sessionStorage.setItem('user', JSON.stringify(res.data.user));
      sessionStorage.setItem('jwt', res.data.jwt);
    
      // setCookie('user', JSON.stringify(res.data.user));
      // setCookie('jwt', res.data.jwt);

      toast("Account Created Successfully");

      router.push('/sign-in');
      setLoader(true);
      
    }, (e) => {
      setLoader(false);
      toast(e?.response?.data?.error?.message);
      // toast("Error while creating account");
    })
  };


  return (
    <div className='flex items-baseline justify-center my-20'>
      <div className='flex flex-col items-center justify-center p-10 border-gray-200'>
        <h1 className='text-2xl text-primary font-bold'>BROWN BAKERY</h1>
        <h2 className='font-bold text-3xl'>Create an Account</h2>
      <h2 className='text-gray-500'>Enter your Email and Password to Create an account</h2>
     
      <div className='w-full flex flex-col gap-5 mt-7'>
        <Input placeholder = 'Username' 
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input type='password' placeholder='Password'
          onChange={(e)=>setPassword(e.target.value)}
        />
        <Button onClick={() => onCreateAccount()}
          disabled={!(username||email||password)} 
        >

          {loader? <LoaderIcon className='animate-spin'/>
           : 'Create an Account'}  
        </Button>
        <p>Already have an account  
            <Link href={'/sign-in'} className='text-red-500 mx-2'>
                  Click here to Sign In
            </Link>
        </p>
      </div>

      </div>
    </div>
  )
}

export default CreateAccount
