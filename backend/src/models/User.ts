import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  googleId: String,
  username: String,
  categories: [
    {
      name: String,
      activities: [
        {
          title: String,
        },
      ],
    },
  ],
});

interface Activity {
  title: string;
}

interface Category {
  name: string;
  activities: Array<Activity>;
}

export interface User {
  googleId: string;
  username: string;
  categories: Array<Category>;
}

mongoose.model("users", userSchema);
