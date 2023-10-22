import  express  from "express";
import { createComment } from "../../controllers/comment-controller.js";
import {createTweet, getTweet} from "../../controllers/tweet-controller.js";
import {toggleLike} from "../../controllers/like-controller.js";
import { signup,login } from "../../controllers/auth-controller.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = express.Router();

router.post('/tweet',authenticate,createTweet);
router.post('/likes/toggle',toggleLike);
router.post('/comment',authenticate,createComment);
router.get('/tweet/:id',getTweet)
router.post('/signup',signup);
router.post('/login',login)

export default router;