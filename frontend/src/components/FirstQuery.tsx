import React from "react";
import { gql, useQuery } from "@apollo/client";

const CURRENT_USER = gql`
  query {
    {
    currentUser{
      id
      username
      categories{
        category_name
        activities{
          title
          actions{
            id
            timeEnded
            timeStarted
            minutes
           }
        }
      }
    }
  }
}
`;

function FirstQuery() {
  const { loading, error, data } = useQuery(CURRENT_USER);
  if (loading) return <p> Loading... </p>;
  if (error) {
    console.log(error);
    return <p>Error!</p>;
  }
  console.log(data);
  return <div>{data.currentUser.username}</div>;
}

export default FirstQuery;
