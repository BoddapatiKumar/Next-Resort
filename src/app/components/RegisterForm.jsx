'use client'

import { useFormik } from 'formik'
import React from 'react'
import { RegisterAction } from '../serverActions/RegisterAction'
import Link from 'next/link'

const RegisterForm = () => {
    const formik=useFormik({
        initialValues:{
            username:'',
            mail:'',
            password:''
        },
        onSubmit:async(values)=>{
            console.log(values);
            try {
              const response=await RegisterAction(values);
              if(response.success){
                alert("Registration Successfull");
              }

            } catch (error) {
              console.log(error);
            }
        }
    })
  return (
    <div  className='container p-4 w-50 bg-light border-5 rounded-3xl'>
      <form className='rounded-b-lg' onSubmit={formik.handleSubmit}>
        <dl>
            <dt>UserName</dt>
            <dd><input className='form-control' type='text' onChange={formik.handleChange} name='username' /></dd>
            <dt>Mail</dt>
            <dd><input className='form-control' type='text' onChange={formik.handleChange} name='mail' /></dd>
            <dt>Password</dt>
            <dd><input className='form-control' type='text'onChange={formik.handleChange}  name='password' /></dd>
        </dl>
        <button className='btn btn-danger' type='submit'>register</button>
      </form>
      <Link href="/login" className='text-center font-bold'>If already registered ? login</Link>
    </div>
  )
}

export default RegisterForm
