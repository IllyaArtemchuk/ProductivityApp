import { gql } from "@apollo/client";

export const CREATE_ACTION = gql`
  mutation createAction(
    $userID: String
    $categoryName: String
    $activityTitle: String
    $timeStarted: String
    $timeEnded: String
    $minutes: Int
  ) {
    createAction(
      userID: $userID
      categoryName: $categoryName
      activityTitle: $activityTitle
      timeStarted: $timeStarted
      timeEnded: $timeEnded
      minutes: $minutes
    ) {
      id
      timeStarted
      timeEnded
      minutes
    }
  }
`;
