import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:  String,
        required:true,
    },
    name:{
        type: String,
        required:true,
    }
},{timestaps:true});

const user = mongoose.model('User', userSchema);

export default User;