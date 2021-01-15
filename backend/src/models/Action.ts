import mongoose, { Schema } from "mongoose";

const actionSchema = new Schema({
  timeStarted: Date,
  timeEnded: Date,
  minutes: Number,
});

mongoose.model("action", actionSchema);
