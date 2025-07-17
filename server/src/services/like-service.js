import { LikeRepository, TweetRepository } from "../repository/index.js";

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
  }

  async togglelike(modelId, modelType, userId) {
    if (modelType == "Tweet") {
      var likeable = await this.tweetRepository.find(modelId);
      console.log(likeable);
    } else if (modelType == "Comment") {
      // todo
    } else {
      throw new Error("Unknow model Type");
    }
    const exists = await this.likeRepository.findByUserAndLikeable({
      user: userId,
      onModel: modelType,
      likeable: modelId,
    });
    if (exists) {
      likeable.likes.pull(exists.id);
      await likeable.save();
      await exists.remove();
      var isAdded = false;
    } else {
      const newLike = await this.likeRepository.create({
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });
      console.log(newLike);
      console.log("likable", likeable);
      console.log("me", likes);
      likeable.likes.push(newLike);
      await likeable.save();
      var isAdded = true;
    }
    return isAdded;
  }
}

export default LikeService;
