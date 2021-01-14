import { FC } from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { generateBackendURL } from "../../helpers";
import { ThemeColors } from "../../styles/styles";
interface Props {
  username: string;
}

const styles = makeStyles({
  username: {
    marginRight: 15,
  },
  button: {
    backgroundColor: ThemeColors.FadedGreen,
    color: ThemeColors.Dark,
    "&:hover, &:focus": {
      backgroundColor: ThemeColors.Green,
      color: ThemeColors.Sand,
    },
  },
});

const LoggedIn: FC<Props> = ({ username }) => {
  const classes = styles();
  console.log(generateBackendURL("api/logout"));
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
