"use server"

import DBconnection from "../utils/config/db";
import userModel from "../utils/models/User";

export async function RegisterAction(RegisterDetails){

    await DBconnection();
    console.log("register Details",RegisterDetails);

    try {
        await userModel.create({
            username:RegisterDetails.username,
            mail:RegisterDetails.mail,
            password:RegisterDetails.password,
        })
        return{success:true}
    } catch (error) {
        console.log(error)
    }

}