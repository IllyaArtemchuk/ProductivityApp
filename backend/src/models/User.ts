import mongoose, { Schema, Document } from "mongoose";
const arrayUniquePlugin = require("mongoose-unique-array");
const userSchema: Schema = new Schema({
  googleId: String,
  username: String,
  currentAction: {
    category: { type: String, default: "" },
    activity: { type: String, default: "" },
    timeStarted: { type: String, default: "" },
    minutes: { type: Number, defualt: 0 },
  },
  categories: [
    {
      category_name: String,
      color: String,
      activities: [
        {
          title: String,
          color: String,
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

interface Action {
  action: string;
}

interface Activity {
  title: string;
  color: string;
  actions: Action[];
}

interface Category {
  category_name: string;
  color: string;
  activities: Activity[];
}

interface CurrentAction {
  category: string;
  activity: string;
  timeStarted: string;
  minutes: number;
}

export interface IUser extends Document {
  googleID: string;
  username: string;
  currentAction: CurrentAction;
  categories: Category[];
}

userSchema.plugin(arrayUniquePlugin);

mongoose.model<IUser>("user", userSchema);
