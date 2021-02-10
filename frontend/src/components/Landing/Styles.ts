import { makeStyles } from "@material-ui/core/styles";
import {
  PrimaryColors,
  NeutralColors,
  AccentColors,
  FontWeight,
} from "../../styles/styles";

export const LandingPageStyles = makeStyles({
  Container: {
    marginTop: 50,
  },
  Title: {
    color: PrimaryColors.Base,
  },
  Feature: {
    marginTop: 40,
    color: AccentColors.Green,
  },
  BulletPoint: {
    marginTop: 20,
    marginLeft: 40,
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    color: PrimaryColors.Dark,
  },
  FocusImage: {
    width: "80%",
  },
  InLineIcon: {},
  Subtitle: {
    marginLeft: 65,
    fontWeight: FontWeight.normal,
    color: NeutralColors.Normal,
  },
  SignInPrompt: {
    textAlign: "center",
    marginTop: 70,
    color: PrimaryColors.Base,
  },
  SignInButton: {
    display: "flex",
    flexDirection: "row",
  },
});
