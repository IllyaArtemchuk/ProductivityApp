import mongoose, { Schema, Document } from "mongoose";
const userSchema: Schema = new Schema({
  googleId: String,
  username: String,
  currentAction: {
    category: { type: String, default: "", unique: false },
    activity: { type: String, default: "", unique: false },
    timeStarted: { type: String, default: "", unique: false },
    minutes: { type: Number, defualt: 0, unique: false },
  },
  categories: [
    {
      category_name: { type: String, unique: false },
      color: { type: String, unique: false },
      activities: [
        {
          title: { type: String, unique: false },
          color: { type: String, unique: false },
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

// userSchema.plugin(arrayUniquePlugin);

mongoose.model<IUser>("user", userSchema);
