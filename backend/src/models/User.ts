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
          actions: [
            {
              action: { type: Schema.Types.ObjectId, ref: "Action" },
            },
          ],
        },
      ],
    },
  ],
});

userSchema.plugin(arrayUniquePlugin);

mongoose.model("user", userSchema);
