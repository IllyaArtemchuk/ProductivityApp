import React, { FC } from "react";
import Header from "./components/Header/Header";
import { Container, Button, Toolbar } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "./graphql/getCurrentUser";

const App: FC = () => {
  const { data } = useQuery(CURRENT_USER);
  console.log(data);
  return (
    <Container>
      <Header currentUser={data ? data.currentUser : null} />
      <Toolbar />

      <Button>Helllo @@@@@@@@@@</Button>
    </Container>
  );
};

export default App;
