import mongoose, { Schema } from "mongoose";

const actionSchema = new Schema({
  timeStarted: { type: String, unique: false },
  timeEnded: { type: String, unique: false },
  minutes: { type: Number, unique: false },
});

mongoose.model("action", actionSchema);
