import mongoose, { Document } from "mongoose";
const User = mongoose.model("user");

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

export const newActivitiy = async (
  userID: string,
  categoryName: string,
  activityTitle: string
): Promise<Document | null> => {
  const isDuplicate = await User.findOne(
    {
      _id: userID,
      "categories.$[category].activities.title": activityTitle,
    },
    { arrayFilters: [{ "category.category_name": categoryName }] }
  );
  if (isDuplicate) {
    throw Error("Activity Already Exists");
  }
  const user = await User.findOneAndUpdate(
    { _id: userID },
    {
      $push: { "categories.$[category].activities": { title: activityTitle } },
    },
    { arrayFilters: [{ "category.category_name": categoryName }], new: true }
  );

  return user;
};
