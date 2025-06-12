import DBconnection from "@/app/utils/config/db";
import productModel from "@/app/utils/models/product";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from 'path';

export async function GET(){
    await DBconnection();
    const records=await productModel.find({});

    return NextResponse.json({data:records});
}


export async function POST(request){
    await DBconnection();
    const data=await request.formData();
    const title=data.get('title');
    const price=data.get('price');
    const offer=data.get('offer');
    const amen=data.get('amen');
    const description=data.get('description');
    const image=data.get('image');

    const bufferData=await image.arrayBuffer();
    const buffer=Buffer.from(bufferData);
    const imagePath=path.join(process.cwd(),'public','uploads',image.name);

    try {
        await writeFile(imagePath,buffer);
        const newProduct=new productModel({
            title:title,
            price:price,
            offer:offer,
            amen:amen,
            description:description,
            image:`/uploads/${image.name}`
        })

        await newProduct.save();
        return NextResponse.json({response:"succesfully uploaded",succes:true},{status:201})
    } catch (error) {
        console.log(error);
        return NextResponse.json({succes:false},{status:500});
    }
}