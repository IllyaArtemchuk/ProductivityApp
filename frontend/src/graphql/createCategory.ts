import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation createCategory(
    $userID: String
    $categoryName: String
    $color: String
  ) {
    createCategory(
      userID: $userID
      categoryName: $categoryName
      color: $color
    ) {
      categories {
        category_name
      }
    }
  }
`;
