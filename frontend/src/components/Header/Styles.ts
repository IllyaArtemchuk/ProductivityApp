import { makeStyles } from "@material-ui/core/styles";
import {
  PrimaryColors,
  NeutralColors,
  AccentColors,
} from "../../styles/styles";

export const HeaderStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
  login: {
    marginRight: 10,
  },
  appBar: {
    backgroundColor: PrimaryColors.Base,
    color: NeutralColors.White,
  },
});

export const LoggedInStyles = makeStyles({
  username: {
    marginRight: 15,
  },
  button: {
    backgroundColor: AccentColors.Green,
    color: AccentColors.LightestGreen,
    "&:hover, &:focus": {
      backgroundColor: AccentColors.Green,
      color: NeutralColors.White,
    },
  },
});
