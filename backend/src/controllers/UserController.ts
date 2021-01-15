import mongoose, { Document } from "mongoose";
import { IUser } from "../models/User";
const User = mongoose.model("user");

export const getUser = async (userID: string): Promise<Document | null> => {
  const user = await User.findOne({
    _id: userID,
  });
  return user;
};

export const newCategory = async (
  userID: string,
  categoryName: string,
  color: string
): Promise<Document | null> => {
  const isDuplicate = await User.findOne({
    _id: userID,
    "categories.category_name": categoryName,
  });
  if (isDuplicate) {
    throw Error("Category Already Exists");
  }
  const user = await User.findOneAndUpdate(
    { _id: userID },
    {
      $push: {
        categories: {
          category_name: categoryName,
          color: color,
          activities: [],
        },
      },
    },
    { new: true }
  );
  return user;
};

export const deleteCategory = async (
  userID: string,
  categoryName: string
): Promise<Document | null> => {
  const user = await User.findOneAndUpdate(
    {
      _id: userID,
      "categories.category_name": categoryName,
    },
    { $pull: { categories: { category_name: categoryName } } },
    { new: true }
  );
  return user;
};

export const newActivitiy = async (
  userID: string,
  categoryName: string,
  activityTitle: string,
  color: string
): Promise<Document | null> => {
  const user = await User.findOneAndUpdate(
    { _id: userID },
    {
      $push: {
        "categories.$[category].activities": {
          title: activityTitle,
          color: color,
          actions: [],
        },
      },
    },
    { arrayFilters: [{ "category.category_name": categoryName }], new: true }
  );

  return user;
};

export const deleteActivity = async (
  userID: string,
  categoryName: string,
  activityTitle: string
): Promise<Document | null> => {
  const user = await User.findOneAndUpdate(
    { _id: userID, "categories.category_name": categoryName },
    {
      $pull: { "categories.$.activities": { title: activityTitle } },
    },
    { new: true }
  );
  return user;
};

interface CurrentAction {
  category: String;
  activity: String;
  timeStarted: String;
  minutes: Number;
}

export const updateCurrentAction = async (
  userID: string,
  newCurrentAction: CurrentAction
): Promise<Document | null> => {
  const user = await User.findOneAndUpdate(
    { _id: userID },
    {
      currentAction: newCurrentAction,
    },
    { new: true }
  );
  if (!user) {
    throw Error("Invalid User ID");
  }
  return user;
};
