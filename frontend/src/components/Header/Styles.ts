import { makeStyles } from "@material-ui/core/styles";
import {
  PrimaryColors,
  NeutralColors,
  AccentColors,
} from "../../styles/styles";

export const HeaderStyles = makeStyles({
  TitleContainer: {
    flexGrow: 1,
  },
  Title: {
    transition: "font-size .25s",
    "&:hover": {
      fontSize: 35,
      cursor: "pointer",
    },
  },
  AppBar: {
    backgroundColor: PrimaryColors.Base,
    color: NeutralColors.White,
  },
});

export const LoggedInStyles = makeStyles({
  TrackerLink: {
    transition: "font-size .25s",
    "&:hover": {
      fontSize: 25,
      cursor: "pointer",
    },
    marginRight: 20,
  },
  MyStatsLink: {
    transition: "font-size .25s",
    "&:hover": {
      fontSize: 25,
      cursor: "pointer",
    },
    marginRight: 20,
    marginLeft: 20,
  },
  SignedInIcon: {
    color: AccentColors.LightGreen,
    fontSize: 50,
    marginBottom: -5,
  },
});
