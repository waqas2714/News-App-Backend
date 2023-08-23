const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Comment is Required."],
    },
    title: {
        type: String,
        required: [true, "title is Required."],
    },
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true, "User Id is required."]
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comments", commentsSchema)

module.exports = Comment;