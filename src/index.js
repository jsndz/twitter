const express = require('express');

const mongoose = require('mongoose');
const connect = require('./config/database')
const Tweet = require('./models/tweet')
const app = express();
const TweetRepository = require('./repository/tweet-repository')
const Comment= require('./models/comments')

app.listen(3000,  async ()=>{
    console.log("server started at 3000");
    await connect();
    console.log("MongoDB connected")
    // const tweet = await Tweet.create({
    //     content:'2nd tweet',
    //     // userEmail:'a@b.com'
    // });
    const tweetRepo = new TweetRepository();
    const tweet = await tweetRepo.getWithComment('652ea137c9da586a173d8fd9');
    // console.log(tweet);
    // tweet.comments.push({content:'1st cmnt 2'})
    // await tweet.save();
    // console.log(tweet);
    // const comment= await Comment.create({content:'robin '});
    // tweet.comments.push(comment);
    // await tweet.save();
    console.log(tweet);

})