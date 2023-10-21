import express from 'express'

import {connect}  from './config/database.js'

import bodyParser from 'body-parser';

const app = express();

import apiRoute from './routes/index.js';

import {UserRepository,TweetRepository} from './repository/index.js'
import LikeService from './services/like-service.js';

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api',apiRoute);
    
    app.listen(3000,  async ()=>{ 
        console.log("server started at 3000");
        await connect();
        console.log("MongoDB connected");
        
        

    
    });



// const usrrepo = new UserRepository();
        // const tweetRepo = new TweetRepository();

        // const tweets = await tweetRepo.getAll(0,10);
        // const users = await usrrepo.getAll();
        // const likeservice = new LikeService();
        // await likeservice.toggleLike(tweets[0].id, 'Tweet',users[0].id);