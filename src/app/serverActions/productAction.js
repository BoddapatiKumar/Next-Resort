"use server"

import DBconnection from "../utils/config/db"

export async function productAction(productDetails){

    await DBconnection();
    console.log("product-details",productDetails);
}