import mongoose from "mongoose";

const likeSchema = mongoose.Schema(
  {
    onModel: {
      type: String,
      required: true,
      enum: ["Tweet", "Comment"],
    },
    likeable: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestaps: true }
);

const Like = mongoose.model("Like", likeSchema);

export default Like;
