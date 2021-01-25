import { FC } from "react";
import {
  AppBar,
  Typography,
  Container,
  Toolbar,
  CircularProgress,
} from "@material-ui/core";
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
  return (
    <AppBar className={classes.appBar}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Productivity App
          </Typography>
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
