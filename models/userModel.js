const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Name is Required."],
    },
    email: {
      type: String,
      required: [true, "Email is Required."],
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Please provide a valid Email.",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is Required."],
      minLength: [6, "Password must contain atleast 6 characters."]
    },
    savedNews: {
      type : [
        {
          name:{
            type : String,
            required : [true, "Source name of the news not provided"]
          },
          title:{
            type : String,
            required : [true, "Title of the News not provided"]
          },
          urlToImage:{
            type : String,
            required : [true, "Image of the News not provided"]
          },
          description:{
            type : String,
            required : [true, "Description of the News not provided"]
          },
          content:{
            type : String,
            required : [true, "Content of the News not provided"]
          },
          url:{
            type :String,
            required : [true, "Reference of the News not provided"]
          }
        }
      ]
    },
    token: {
      type : String
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User",userSchema)

module.exports = User;