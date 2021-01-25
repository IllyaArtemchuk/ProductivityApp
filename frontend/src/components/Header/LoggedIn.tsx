import { FC } from "react";
import { Typography, Button } from "@material-ui/core";
import { generateBackendURL } from "../../helpers";
import { LoggedInStyles } from "./Styles";
interface Props {
  username: string;
}

const LoggedIn: FC<Props> = ({ username }) => {
  const classes = LoggedInStyles();
  return (
    <>
      <Typography variant="h5" className={classes.username}>
        Hello, {username}
      </Typography>
      <Button
        variant="contained"
        className={classes.button}
        size="large"
        href={generateBackendURL("/api/logout")}
      >
        Sign Out
      </Button>
    </>
  );
};

export default LoggedIn;
