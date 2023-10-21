import TweetService from '../services/tweet-service.js';

const tweetService = new TweetService();

export const createTweet = async (req,res) => {
    try {
        const response = await tweetService.create(req.body);
        
        return res.status(201).json({
            data : response,
            message:'Successfully tweeted',
            sucess: true,
            err:{}
        })
    } catch (error) {
        res.status(500).json({
            data : {},
            message:'coulnt be tweeted',
            sucess: true,
            err:{error}
        
    })
    }
}

export const getTweet = async (req,res) => {
    try {
        const response = await tweetService.get(req.params.id);
        console.log(response);
        return res.status(201).json({
            data : response,
            message:'Successfully fetched a tweet from service',
            sucess: true,
            err:{}
        })
    } catch (error) {
        res.status(500).json({
            data : {},
            message:'coulnt be tweeted',
            sucess: true,
            err:{error}
        
    });
    }
}


