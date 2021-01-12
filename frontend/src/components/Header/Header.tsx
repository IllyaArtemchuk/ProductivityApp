import { FC } from "react";
import { AppBar, Typography, Container, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoggedIn from "./LoggedIn";
import GoogleButton from "./GoogleButton";
import { colors } from "../../styles/styles";

const styles = makeStyles({
  title: {
    flexGrow: 1,
  },
  login: {
    marginRight: 10,
  },
  appBar: {
    backgroundColor: colors.Dark,
    color: colors.Sand,
  },
});

interface Props {
  currentUser: {
    id: "string";
    username: "string";
  } | null;
}

const Header: FC<Props> = ({ currentUser }) => {
  const classes = styles();
  return (
    <AppBar className={classes.appBar}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Productivity App
          </Typography>
          {currentUser ? (
            <LoggedIn username={currentUser.username} />
          ) : (
            <GoogleButton />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
