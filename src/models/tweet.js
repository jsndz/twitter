import mongoose from 'mongoose';

const tweetSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
        max:[250,'250 character Limit']
    },
    hashtags:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Hashtag'
        }
    ]
    
},{timestamps:true});
 

const tweet = mongoose.model('Tweet', tweetSchema);

export default tweet;