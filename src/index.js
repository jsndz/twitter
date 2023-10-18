import express from 'express'

import {connect}  from './config/database.js'

const app = express();

import TweetService from './services/tweet-service.js'
app.listen(3000,  async ()=>{
    console.log("server started at 3000");
    await connect();
    console.log("MongoDB connected");
    let servic =new TweetService();
    await servic.create({content:'#kaido vs #LUFfy'}) 
});
