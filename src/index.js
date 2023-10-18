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
   
    const tweetRepo = new TweetRepository();
    
    const tweet = await tweetRepo.create({
        content:'with hooka'
    })
    

    console.log(tweet);

});
