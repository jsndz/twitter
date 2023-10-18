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
 
tweetSchema.virtual('contentWithEmail').get(function process(){
    return `${this.content} \n by ${this.userEmail}`
});

tweetSchema.pre('save',function(next){
    console.log(';inside a hook');
    this.content = this.content + '....'
    next()
})
const tweet = mongoose.model('Tweet', tweetSchema);

module.exports = tweet;