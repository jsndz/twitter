import TweetService from "../services/tweet-service.js";
import upload from "../config/upload.js";

const singleUploader = upload.single("image");

const tweetService = new TweetService();

export const createTweet = async (req, res) => {
  try {
    singleUploader(req, res, async function (err, data) {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      console.log("Image URL is", req.file);
      const payload = { ...req.body };
      payload.image = req.file.location;
      const response = await tweetService.create(payload);

      return res.status(201).json({
        data: response,
        message: "Successfully tweeted",
        sucess: true,
        err: {},
      });
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "coulnt be tweeted",
      sucess: true,
      err: { error },
    });
  }
};

export const getTweet = async (req, res) => {
  try {
    const response = await tweetService.get(req.params.id);
    return res.status(201).json({
      data: response,
      message: "Successfully fetched a tweet from service",
      sucess: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "coulnt be tweeted",
      sucess: true,
      err: { error },
    });
  }
};
