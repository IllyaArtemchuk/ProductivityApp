import React, { useEffect, useState, FC } from "react";
import Header from "./components/Header/Header";
import { Container, Toolbar } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "./graphql/getCurrentUser";
import { BrowserRouter, Route } from "react-router-dom";
import dayjs from "dayjs";
import Landing from "./components/Landing/Landing";
import Tracker from "./components/Tracker/Tracker";
import StatsContainer from "./components/Stats/StatsContainer";
import { IAction } from "./components/ActionTable/Interfaces";
import { User } from "./interfaces/UserTypes";
import PrivateRoute from "./PrivateRoute";

const App: FC = () => {
  const { data, loading } = useQuery(CURRENT_USER);
  const [actions, setActions] = useState<IAction[]>([]);
  useEffect(() => {
    if (data) {
      const userData: User = data.currentUser;
      if (userData) {
        let actionsArray: IAction[] = [];
        userData.categories.forEach((cat) => {
          cat.activities.forEach((act) => {
            act.actions.forEach((action) => {
              actionsArray.push({
                category: cat.category_name,
                categoryColor: cat.color,
                activity: act.title,
                activityColor: act.color,
                timeStarted: action.timeStarted,
                timeEnded: action.timeEnded,
                minutes: action.minutes,
                timeQuery: dayjs(parseInt(action.timeEnded)),
                id: action.id,
              });
            });
          });
        });
        actionsArray.sort(
          (a, b) => parseInt(b.timeEnded) - parseInt(a.timeEnded)
        );
        setActions(actionsArray);
      }
    }
  }, [data]);
  return (
    <Container>
      <BrowserRouter>
        <Header
          currentUser={data ? data.currentUser : null}
          currentUserLoading={loading}
        />
        <Toolbar />
        <Route
          exact
          path="/"
          render={(props) => (
            <Landing
              {...props}
              currentUser={data ? data.currentUser : null}
              currentUserLoading={loading}
            />
          )}
        />

        <PrivateRoute
          component={<Tracker actions={actions} setActions={setActions} />}
          path="/tracker"
          loading={loading}
          isAuthenticated={data ? data.currentUser : null}
        />
        <PrivateRoute
          component={<StatsContainer actions={actions} />}
          path="/stats"
          loading={loading}
          isAuthenticated={data ? data.currentUser : null}
        />
      </BrowserRouter>
    </Container>
  );
};

export default App;
