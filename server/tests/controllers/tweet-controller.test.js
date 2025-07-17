import {mockResponse,mockRequest} from "../mocker.js";

import {getTweet} from "../../src/controllers/tweet-controller.js";

import TweetService from "../../src/services/tweet-service.js";

jest.mock("../../src/services/tweet-service.js")

test('controller test ',async ()=>{
    const req = mockRequest();
    const res = mockResponse();
    const response =[{
        content:'tweet 1'
    },{
        content:'tweet 2'
    }];
    (TweetService.prototype.get).mockReturnValue(response);
    
    await getTweet(req,res);
    expect(res.json).toHaveBeenCalledWith({
        data : response,
        message:'Successfully fetched a tweet from service',
        sucess: true,
        err:{}
    })
})