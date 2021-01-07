import mongoose, { Schema } from "mongoose";

const actionSchema = new Schema({
  timeStarted: String,
  timeEnded: String,
});

mongoose.model("action", actionSchema);
