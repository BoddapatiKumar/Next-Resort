
"use server"
import { signIn } from "../authOptions";
import DBconnection from "../utils/config/db";

export async function LoginAction(loginDetails){
    await DBconnection();
    console.log("login details ",loginDetails);
    try {
        const response=await signIn('credentials',{
            mail:loginDetails.mail,
            password:loginDetails.password,
            redirect:false,
        })
        return{success:true};
    } catch (error) {
        throw new Error("Invalid Credentials");
    }
}