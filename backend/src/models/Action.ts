import mongoose, { Schema } from "mongoose";

const actionSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  timeStarted: Date,
  timeEnded: Date,
});

mongoose.model("actions", actionSchema);
