import express from 'express'

import {connect}  from './config/database.js'

const app = express();


app.listen(3000,  async ()=>{
    console.log("server started at 3000");
    await connect();
    console.log("MongoDB connected");

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