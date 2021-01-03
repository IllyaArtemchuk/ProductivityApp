import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  googleId: String,
  username: String,
  reputation: { type: Number, default: 0 },
});

mongoose.model("users", userSchema);
