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
  Feature: {
    marginTop: 40,
  },
  BulletPoint: {
    marginTop: 20,
    marginLeft: 40,
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
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
});
