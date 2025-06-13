"use client"

import UserNavigation from "@/app/components/UserNavigation";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

const DynamicProduct = () => {

    const[record,setRecord]=useState("");

    const params=useParams();
    const {id}=params
    console.log("Dynamic id",id);

    const fetchSingleRecord=async()=>{
        const response=await fetch(`http://localhost:3000/api/admin/product/${id}`);
        const newData=await response.json();
        console.log("record deatils: ",newData);
        setRecord(newData.data);
    }

    useEffect(()=>{
        fetchSingleRecord();
    },[])
  return (
    <div>
        <UserNavigation />
       <div className="border border-black p-5 m-2 bg-amber-100 min-vh-100 d-flex">
            <div>
                <img className="img-fluid rounded m-2"src={record.image} alt="Resort" width={800} height={600} />
            </div>
            <div className="m-2 p-3 align-items-center">
                <h1 className="">{record.title}</h1>
                <h2></h2>
                <p>{record.description}</p>
            </div>
        </div>
    </div>
  )
}

export default DynamicProduct
