import {createTweet} from "../../controllers/tweet-controller.js";

import  express  from "express";

const router = express.Router();

router.post('/tweet',createTweet);



export default router;