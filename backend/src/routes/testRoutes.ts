import { Express } from "express";
import mongoose from "mongoose";
const User = mongoose.model("users");

module.exports = (app: Express) => {
  app.get("/create/category", async function (req, res, next) {
    const search_params: any = new URL(req.url, "http://localhost:5000/")
      .searchParams;
    const user: typeof User = req.user ? req.user.id : null;
    console.log(user);
    const category = search_params.category;
    const currUser: any = await User.findOne({ id: user });
    if (!currUser) {
      return res.json("couldnt find user");
    }
    currUser.categories.push({ name: category, activities: [] });
    await currUser.save();
    res.json("Pizza");
  });
};
