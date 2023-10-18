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

const User = mongoose.model('User', userSchema);

export default User;