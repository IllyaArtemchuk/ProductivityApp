import { FC } from "react";
import {
  AppBar,
  Typography,
  Container,
  Toolbar,
  CircularProgress,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LoggedIn from "./LoggedIn";
import GoogleButton from "react-google-button";
import { HeaderStyles } from "./Styles";
import { generateBackendURL } from "../../helpers";

interface Props {
  currentUser: {
    id: "string";
    username: "string";
  } | null;
  currentUserLoading: boolean;
}

const Header: FC<Props> = ({ currentUser, currentUserLoading }) => {
  const classes = HeaderStyles();
  const authenticate = () => {
    window.location.href = generateBackendURL("/auth/google");
    return;
  };
  const history = useHistory();
  return (
    <AppBar className={classes.AppBar}>
      <Container maxWidth="xl">
        <Toolbar>
          <div className={classes.TitleContainer}>
            <Typography variant="h4">
              <span
                className={classes.Title}
                onClick={() => history.push("/tracker")}
              >
                Timeocity
              </span>
            </Typography>
          </div>
          {currentUserLoading ? (
            <CircularProgress color="secondary" />
          ) : currentUser ? (
            <LoggedIn username={currentUser.username} />
          ) : (
            <GoogleButton
              onClick={() => {
                authenticate();
              }}
            />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
