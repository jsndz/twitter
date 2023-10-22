import  express  from "express";
import { createComment } from "../../controllers/comment-controller.js";
import {createTweet, getTweet} from "../../controllers/tweet-controller.js";
import {toggleLike} from "../../controllers/like-controller.js";
import { signup } from "../../controllers/auth-controller.js";

const router = express.Router();

router.post('/tweet',createTweet);
router.post('/likes/toggle',toggleLike);
router.post('/comment',createComment);
router.get('/tweet/:id',getTweet)
router.post('/signup',signup);

export default router;