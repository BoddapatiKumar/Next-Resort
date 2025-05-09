const { default: mongoose } = require("mongoose");


const UserSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        default:'user',
    },
    bookings:[{
        type:mongoose.Types.ObjectId,
        ref:'bookings'

    }]
})

const userModel=mongoose.models.user || mongoose.model('user',UserSchema);
export default userModel;