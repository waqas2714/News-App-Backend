const Comment = require("../models/commentModel");
const User = require("../models/userModel");

const addComment = async (req, res) => {
  try {
    const { comment, title, userId } = req.body;
    const newComment = await Comment.create({
      comment,
      title,
      userId,
    });
    res.json(newComment);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { title } = req.body;
    const comments = await Comment.find({ title });
    const formattedComments = await Promise.all(comments.map(async (item) => {
      const user = await User.findById(item.userId);
      return {
        name: user.userName,
        comment: item.comment,
        createdAt: item.createdAt,
      };
    }));

    formattedComments.sort((a, b) => b.createdAt - a.createdAt);

    res.json( formattedComments );
  } catch (error) {
    res.json({ error: error.message });
  }
};


module.exports = {
  addComment,
  getComments,
};
