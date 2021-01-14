import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query {
    currentUser {
      id
      username
      categories {
        category_name
        activities {
          title
          actions {
            id
            timeEnded
            timeStarted
            minutes
          }
        }
      }
    }
  }
`;
