import React, { FC } from "react";
import Header from "./components/Header/Header";
import { Container, Toolbar } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "./graphql/getCurrentUser";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Tracker from "./components/Tracker/Tracker";

const App: FC = () => {
  const { data, loading } = useQuery(CURRENT_USER);

  console.log(data);
  return (
    <Container>
      <BrowserRouter>
        <Header
          currentUser={data ? data.currentUser : null}
          currentUserLoading={loading}
        />
        <Toolbar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/tracker" component={Tracker} />
      </BrowserRouter>
    </Container>
  );
};

export default App;
