'use client'

import { useFormik } from "formik"
import { LoginAction } from "../serverActions/LoginAction";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Link from "next/link";


const UserLogin = () => {

    const [error,setError]=useState("");

    const router=useRouter();
    const formik=useFormik({
        initialValues:{
            mail:'',
            password:''
        },
        onSubmit:async(detials)=>{
            console.log(detials);
            try {
               const response= await LoginAction(detials);
               if(response.success)
               {
                    router.push('/');
               }
               else{
                    setError(response.message || 'login failed');
               }
            } catch (error) {
                console.log(error)
                setError(error.message);
            }
        }
    })
  return (
    <div  className='container p-4 w-50 bg-light border-5 rounded-3xl'>
      <form className='rounded-b-lg' onSubmit={formik.handleSubmit}>
        
        <dl>
        {error && <p style={{color:'red'}}>{error}</p>}
            <dt>Mail</dt>
            <dd><input className='form-control' type='text' onChange={formik.handleChange} name='mail' /></dd>
            <dt>Password</dt>
            <dd><input className='form-control' type='text'onChange={formik.handleChange}  name='password' /></dd>
        </dl>
        <button className='btn btn-danger' type='submit'>Login</button>
      </form>
      <Link href="/register" className="text-center font-bold">If not registered ? register</Link>
    </div>
  )
}

export default UserLogin
