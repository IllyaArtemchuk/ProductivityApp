import mongoose, { Schema } from "mongoose";
const arrayUniquePlugin = require("mongoose-unique-array");
const userSchema = new Schema({
  googleId: String,
  username: String,
  categories: [
    {
      category_name: String,
      activities: [
        {
          title: String,
        },
      ],
    },
  ],
});

userSchema.plugin(arrayUniquePlugin);

mongoose.model("user", userSchema);
