"use client"

import React, { useState } from 'react'
import { productAction } from '../serverActions/productAction';


const AddProduct = () => {
    const [title,setTitle]=useState('');
    const [price,setPrice]=useState('');
    const [offer,setOffer]=useState('');
    const [amen,setAmen]=useState('');
    const [description,setDescription]=useState('');
    const[image,setImage]=useState('');

    const handleSubmitRecord=async(e)=>{
        e.preventDefault();
        const recordDetails={title,price,offer,amen,description,image};
        console.log(recordDetails);
        try {
            await productAction(recordDetails);
        } catch (error) {
            console.log(error);
        }

        const data=new FormData();
        data.append('title',title);
        data.append('price',price);
        data.append('offer',offer);
        data.append('amen',amen);
        data.append('description',description);
        data.append('image',image);

        try {
            const response= await fetch('http://localhost:3000/api/admin/add-product',{
                method:'POST',
                body:data
            })
            const result=await response.json();
            if(result.success)
            {
                alert("Record added successfully");
                setTitle("");
                setPrice("");
                setOffer("");
                setAmen("");
                setDescription("");
                setImage("");

            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div  className='container p-4 w-50 bg-light border-5 rounded-3xl mt-5'>
        <h1>Add Record</h1>
        <form onSubmit={handleSubmitRecord} encType='multipart/form-data'>
            <div>
                <dl>
                    <dt>Title</dt>
                    <dd><input className='form-control' type="text" name="title" onChange={(e)=>setTitle(e.target.value)} /></dd>
                    <dt>price</dt>
                    <dd><input className='form-control' type='number' name='price' onChange={(e)=>setPrice(e.target.value)}/></dd>
                    <dt>Offer</dt>
                    <dd><input className='form-control' type='number' name='offer' onChange={(e)=>setOffer(e.target.value)}/></dd>
                    <dt>Amenities</dt>
                    <dd><input className='form-control' type='text' name='amenities' onChange={(e)=>setAmen(e.target.value)}/></dd>
                    <dt>Description</dt>
                    <dd><input className='form-control' type="text" name="description" onChange={(e)=>setDescription(e.target.value)} /></dd>
                    <dt>image</dt>
                    <dd><input className='form-control' type='file' accept='image/*' name='image' onChange={(e)=>setImage(e.target.files[0])} /></dd>
                </dl>
                <button  className='btn btn-warning mx-auto d-block w-2xs mt-2'type='submit'>Submit</button>
            </div>

        </form>
      
    </div>
  )
}

export default AddProduct
