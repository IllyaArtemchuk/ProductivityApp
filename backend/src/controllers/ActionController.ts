import mongoose, { Document } from "mongoose";
import { UserType } from "../schema/types/user_type";
const User = mongoose.model("user");
const Action = mongoose.model("action");

interface ActionOBJ {
  _id: string;
  action: string;
}

export const findActions = async (
  actions: Array<ActionOBJ>
): Promise<mongoose.Document<any>[] | null> => {
  const ids: Array<string> = [];
  for (let act of actions) {
    ids.push(act.action);
  }
  const actionsList = await Action.find({ _id: ids });
  return actionsList;
};

export const newAction = async (
  userID: string,
  categoryName: string,
  activityTitle: string,
  timeStarted: string,
  timeEnded: string
): Promise<Document | null> => {
  const createdAction = await new Action({
    timeStarted,
    timeEnded,
  }).save();
  if (!createdAction) {
    throw "Invalid Action";
  }
  const currUser = await User.findOneAndUpdate(
    { _id: userID },
    {
      $push: {
        "categories.$[category].activities.$[activity].actions": {
          action: createdAction.id,
        },
      },
    },
    {
      arrayFilters: [
        {
          "category.category_name": categoryName,
        },
        {
          "activity.title": activityTitle,
        },
      ],
      new: true,
    }
  );

  if (!currUser) {
    throw "Action created, but linking to user failed.";
  }
  return createdAction;
};

interface ActionChanges {
  timeStarted?: string;
  timeEnded?: string;
}

export const updateAction = async (
  actionID: string,
  timeStarted: string | null = null,
  timeEnded: string | null = null
): Promise<Document | null> => {
  const action: any = await Action.findOne({ _id: actionID });

  if (timeStarted) {
    action.timeStarted = timeStarted;
  }
  if (timeEnded) {
    action.timeEnded = timeEnded;
  }

  await action.save();
  return action;
};
