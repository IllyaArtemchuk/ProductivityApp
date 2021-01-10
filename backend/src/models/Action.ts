import mongoose, { Schema } from "mongoose";

const actionSchema = new Schema({
  timeStarted: Date,
  timeEnded: Date,
});

mongoose.model("action", actionSchema);
