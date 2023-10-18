import TweetService from '../services/tweet-service.js';

const tweetService = new TweetService();

export const createTweet = async (req,res) => {
    try {
        console.log("Hi")
        const response = await tweetService.create(req.body);
        console.log(response);
        return res.status(201).json({
            data : response,
            message:'Successfully tweeted',
            sucess: true,
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            data : {},
            message:'coulnt be tweeted',
            sucess: true,
            err:{error}
        
    })
    }
}

