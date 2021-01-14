import React, { FC } from "react";
import Header from "./components/Header/Header";
import { Container, Toolbar } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "./graphql/getCurrentUser";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";

const App: FC = () => {
  const { data } = useQuery(CURRENT_USER);
  console.log(data);
  return (
    <Container>
      <BrowserRouter>
        <Header currentUser={data ? data.currentUser : null} />
        <Toolbar />
        <Route exact path="/" component={Landing} />
      </BrowserRouter>
    </Container>
  );
};

export default App;
