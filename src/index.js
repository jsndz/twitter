const express = require('express');

const mongoose = require('mongoose');
const connect = require('./config/database')
const Tweet = require('./models/tweet')
const app = express();
const TweetRepository = require('./repository/tweet-repository')
const Comment= require('./models/comments');
const  HashtagRepository = require('./repository/hashtag-repository');
const TweetService = require('./services/tweet-service')

app.listen(3000,  async ()=>{
    console.log("server started at 3000");
    await connect();
    console.log("MongoDB connected");
    const service = new TweetService();
    const tweet = await service.create({content:' it is #jimbe and with him is #sanji and #zoro'})
    console.log(tweet)

});


// const hashtagrepo = new HashtagRepository();
    // await hashtagrepo.create([
    //     {
    //         title: 'luffy',
    //         tweets:[]
    //     },
    //     {
    //         title: 'nami',
    //         tweets:[]
    //     },
    //     {
    //         title: 'naruto',
    //         tweets:[]
    //     },
    //     {
    //         title: 'goku',
    //         tweets:[]
    //     }

    // ])