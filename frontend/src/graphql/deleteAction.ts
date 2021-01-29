import { gql } from "@apollo/client";

export const DELETE_ACTION = gql`
  mutation deleteAction(
    $actionID: String
    $userID: String
    $categoryName: String
    $activityTitle: String
  ) {
    deleteAction(
      actionID: $actionID
      userID: $userID
      categoryName: $categoryName
      activityTitle: $activityTitle
    ) {
      id
    }
  }
`;
