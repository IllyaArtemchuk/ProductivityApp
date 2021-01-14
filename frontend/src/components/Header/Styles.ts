import { makeStyles } from "@material-ui/core/styles";
import { ThemeColors } from "../../styles/styles";

export const HeaderStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
  login: {
    marginRight: 10,
  },
  appBar: {
    backgroundColor: ThemeColors.Dark,
    color: ThemeColors.Sand,
  },
});

export const LoggedInStyles = makeStyles({
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
