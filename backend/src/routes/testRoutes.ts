import { Express } from "express";
import mongoose from "mongoose";
const User = mongoose.model("user");
interface userOBJ {
  id: string;
  googleId: string;
  username: string;
  categories: Array<object>;
}

module.exports = (app: Express) => {
  app.get("/create/category", async function (req, res, next) {
    const user = req.user as userOBJ;
    const id = user ? user.id : "";
    const currUser: any = await User.findOne({ _id: id });
    if (!currUser) {
      return res.json("couldnt find user");
    }
    currUser.categories.push({
      category_name: req.query.category,
      activities: [],
    });
    await currUser.save();
    res.json("Pizza");
  });

  app.get("/create/activity", async (req, res) => {
    const user = req.user as userOBJ;
    const id = user ? user.id : "";
    const currCategory = await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $push: { "categories.$[outer].activities": { title: req.query.title } },
      },
      { arrayFilters: [{ "outer.category_name": req.query.category }] }
    );
    res.json(currCategory);
  });
};
