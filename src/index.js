import express from 'express'

import {connect}  from './config/database.js'

import bodyParser from 'body-parser';

const app = express();

import apiRoute from './routes/index.js';

import passport from 'passport';
import { passportAuth } from './config/jwt-middleware.js';



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
passportAuth(passport);
app.use('/api',apiRoute);
 
app.listen(3000,  async ()=>{ 
    console.log("server started at 3000");
    await connect();
    console.log("MongoDB connected");
});



