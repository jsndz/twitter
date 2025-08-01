import mongoose from "mongoose";

import { TweetRepository, HashtagRepository } from "../repository/index.js";

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();
  }

  async create(data) {
    let content = data.content;
    let tags = content
      .match(/#[a-zA-Z0-9_]+/g)
      .map((tag) => tag.substring(1))
      .map((tag) => tag.toLowerCase());
    let tweet = await this.tweetRepository.create(data);
    let alreadyPresentTag = await this.hashtagRepository.findByName(tags);
    let titleOfpresentags = alreadyPresentTag.map((tags) => tags.title);
    let newTags = tags.filter((tag) => !titleOfpresentags.includes(tag));
    console.log(newTags);
    newTags = newTags.map((tag) => {
      return { title: tag, tweets: [tweet.id] };
    });
    const response = await this.hashtagRepository.bulkCreate(newTags);
    alreadyPresentTag.forEach((tag) => {
      tag.tweets.push(tweet.id);
      tag.save();
    });
    return tweet;
  }

  async get(tweetId) {
    const tweet = await this.tweetRepository.getWithComment(tweetId);
    console.log(tweet);
    return tweet;
  }
}

export default TweetService;
