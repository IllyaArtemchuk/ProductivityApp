import { FC } from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

interface Props {
  username: string;
}

const styles = makeStyles({
  username: {
    marginRight: 15,
  },
});

const LoggedIn: FC<Props> = ({ username }) => {
  const classes = styles();
  return (
    <>
      <Typography variant="h5" className={classes.username}>
        Hello, {username}
      </Typography>
      <Button variant="contained" color="secondary" size="large">
        Sign Out
      </Button>
    </>
  );
};

export default LoggedIn;
