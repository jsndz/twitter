import LikeService from "../services/like-service.js";

const likeService = new LikeService();

export const toggleLike = async (req, res) => {
  try {
    const response = await likeService.toggleLike(
      req.query.modelId,
      req.query.modelType,
      req.body.userId
    );

    return res.status(201).json({
      data: response,
      message: "Successsfully toggld the like",
      sucess: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      message: "coulnt be toggle",
      sucess: true,
      err: { error },
    });
  }
};
