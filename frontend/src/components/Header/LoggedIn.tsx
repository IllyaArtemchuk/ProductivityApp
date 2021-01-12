import { FC } from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { colors } from "../../styles/styles";
interface Props {
  username: string;
}

const styles = makeStyles({
  username: {
    marginRight: 15,
  },
  button: {
    backgroundColor: colors.FadedGreen,
    color: colors.Dark,
    "&:hover, &:focus": {
      backgroundColor: colors.Green,
      color: colors.Sand,
    },
  },
});

const LoggedIn: FC<Props> = ({ username }) => {
  const classes = styles();
  return (
    <>
      <Typography variant="h5" className={classes.username}>
        Hello, {username}
      </Typography>
      <Button
        variant="contained"
        className={classes.button}
        size="large"
        href="/api/logout"
      >
        Sign Out
      </Button>
    </>
  );
};

export default LoggedIn;
