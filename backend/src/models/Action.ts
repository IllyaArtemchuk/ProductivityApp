import mongoose, { Schema } from "mongoose";

const actionSchema = new Schema({
  timeStarted: String,
  timeEnded: String,
  minutes: Number,
});

mongoose.model("action", actionSchema);
