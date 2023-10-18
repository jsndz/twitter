import mongoose from 'mongoose';

const hashtagSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    tweets:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'tweet'
        }
    ] 
    
},{timestamps:true});
 

const Hashtag = mongoose.model('Hashtag', hashtagSchema);

export default  Hashtag;