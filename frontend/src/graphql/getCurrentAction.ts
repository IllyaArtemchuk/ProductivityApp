import { gql } from "@apollo/client";

export const CURRENT_ACTION = gql`
  query {
    currentUser {
      currentAction {
        timeStarted
        category
        activity
        minutes
      }
    }
  }
`;
