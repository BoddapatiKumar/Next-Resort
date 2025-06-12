import DBconnection from "@/app/utils/config/db";
import productModel from "@/app/utils/models/product";
import { NextResponse } from "next/server";


export async function GET(request,{params}){
    await DBconnection();
    const {id}=params;
    console.log("dynamic id",id);

    try {
        if(!id)
        {
            return NextResponse.json({success:false,messsage:"no product found"},{status:404});
        }

        const product=await productModel.findById(id);
        
        return NextResponse.json({success:true,data:product});
    } catch (error) {
        console.log(error);
        return NextResponse.json({success:false,message:"Invalid id"},{status:500});
    }
}