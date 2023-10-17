const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    userEmail:{
        type:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }
    ]

},{timestamps:true});

const tweet = mongoose.model('Tweet', tweetSchema);

module.exports = tweet;