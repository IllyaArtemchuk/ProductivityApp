import { gql } from "@apollo/client";

export const UPDATE_CURRENT_ACTION = gql`
  mutation updateCurrentAction(
    $userID: String
    $category: String
    $activity: String
    $timeStarted: String
    $minutes: Int
  ) {
    updateCurrentAction(
      userID: $userID
      category: $category
      activity: $activity
      timeStarted: $timeStarted
      minutes: $minutes
    ) {
      id
    }
  }
`;
