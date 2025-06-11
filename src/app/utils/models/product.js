const { default: mongoose } = require("mongoose");

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    offer:{
        type:String,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
    },
    amen:{
        type:[String],
        default:["AC","Geyser","TV","Wi-Fi","Elevator","Breakfast"],
        set : function(amen){
          const defaultvalues=["AC","Geyser","TV","Wi-Fi","Elevator","Breakfast"];
          if(typeof amen ==='string')
          {
            amen=amen.split(',').map((item)=>item.trim());
          }

          return Array.from(new Set([...defaultvalues,...amen]));
        }
    }
})

const productModel=mongoose.models.product || mongoose.Model('product',productSchema);