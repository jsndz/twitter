import Hashtag from "../models/hashtags.js";

class HashtagRepository {
  async create(data) {
    try {
      const tag = await Hashtag.create(data);
      return tag;
    } catch (error) {
      console.log(error);
    }
  }

  async bulkCreate(data) {
    try {
      const tag = await Hashtag.insertMany(data);
      return tag;
    } catch (error) {
      console.log(error);
    }
  }

  async get(id) {
    try {
      const tag = await Hashtag.findById(id);
      return tag;
    } catch (error) {
      console.log(error);
    }
  }

  async update(tweetId, data) {
    try {
      const tag = await Hashtag.findByIdAndUpdate(tweetId, data);
      return tag;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const response = await Hashtag.findByIdAndRemove(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async findByName(titlelist) {
    try {
      const tags = await Hashtag.find({
        title: titlelist,
      });
      return tags;
    } catch (error) {
      console.log(error);
    }
  }
}

export default HashtagRepository;
