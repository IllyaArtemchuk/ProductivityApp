import { gql } from "@apollo/client";

export const CREATE_ACTIVITY = gql`
  mutation createActivity(
    $userID: String
    $categoryName: String
    $activityTitle: String
    $color: String
  ) {
    createActivity(
      userID: $userID
      categoryName: $categoryName
      activityTitle: $activityTitle
      color: $color
    ) {
      id
      categories {
        category_name
      }
    }
  }
`;
