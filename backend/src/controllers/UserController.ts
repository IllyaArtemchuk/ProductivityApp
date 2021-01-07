import mongoose, { Document } from "mongoose";
const User = mongoose.model("user");

export const getUser = async (userID: string): Promise<Document | null> => {
  const user = await User.findOne({
    _id: userID,
  });
  return user;
};

export const newCategory = async (
  userID: string,
  categoryName: string
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
      $push: { categories: { category_name: categoryName, activities: [] } },
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
  activityTitle: string
): Promise<Document | null> => {
  const user = await User.findOneAndUpdate(
    { _id: userID },
    {
      $push: {
        "categories.$[category].activities": {
          title: activityTitle,
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
