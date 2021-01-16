import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query {
    currentUser {
      id
      username
      currentAction {
        timeStarted
        category
        activity
        minutes
      }
      categories {
        category_name
        color
        activities {
          title
          color
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
