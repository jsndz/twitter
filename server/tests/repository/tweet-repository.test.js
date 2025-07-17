import { TweetRepository } from "../../src/repository/index.js";

import Tweet from "../../src/models/tweet.js";

jest.mock('../../src/models/tweet.js');

test('should create a new tweet and return it', async ()=>{
    const data={
        content:'testing tweet'
    }
    const spy = jest.spyOn(Tweet,'create').mockImplementation(()=>{
        return {...data,createdAt:'2022-02-12',updateAt:'2022-02-12'}
    })
    const tweetRepository = new TweetRepository();
    const tweet = await tweetRepository.create(data);

    expect(spy).toHaveBeenCalled();
    expect(tweet.content).toBe(data.content);
})

test('should not create a new tweet and throw exception', async ()=>{
    const data={
        content:'testing tweet'
    }
    const spy = jest.spyOn(Tweet,'create').mockImplementation(()=>{
        throw new Error('something went wrong');
    })
    const tweetRepository = new TweetRepository();
    const tweet = await tweetRepository.create(data).catch(err =>{
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('something went wrong')
    });

    
});

describe('get all tweet tests', () =>{
    test('testing limit for get all',async ()=>{
        //this part is defining the data
        const data={
            content:'testing tweet'
        }
        //this process is mocking the creation of array when you make a find call
        const tweetsArray = [{...data,createdAt:'2022-02-12',updateAt:'2022-02-12'},{...data,createdAt:'2022-02-12',updateAt:'2022-02-12'}];
        //make it an object of that array
        const findResponse ={tweetsArray};
        //imitATE or mock the limit filter 
        findResponse.limit = jest.fn((limit)=>findResponse.tweetsArray.slice(0,limit));
        
        //imitATE or mock the skip filter 
        findResponse.skip = jest.fn((offset) =>findResponse);
        // sets up a spy on the find method of the Tweet class, allowing you to monitor if and how many times this method is called during testing
        const spy = jest.spyOn(Tweet,'find').mockImplementation(()=>{
            return findResponse;
        });
        const tweetRepository = new TweetRepository();
        const tweets = await tweetRepository.getAll(0,2);
        expect(spy).toHaveBeenCalled();
        expect(tweets).toHaveLength(2);
    })
})


