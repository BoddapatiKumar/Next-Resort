import DBconnection from "@/app/utils/config/db";
import userModel from "@/app/utils/models/User";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    await DBconnection();
    const {id}=params;
    console.log("dynamic id",id);

    try {
        if(!id)
        {
            return NextResponse.json({success:false,messsage:"no user found"},{status:404});
        }

        const user=await userModel.findById(id);
        
        return NextResponse.json({success:true,data:user});
    } catch (error) {
        console.log(error);
        return NextResponse.json({success:false,message:"Invalid id"},{status:500});
    }
}