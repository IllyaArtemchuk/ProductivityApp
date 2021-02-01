import { makeStyles } from "@material-ui/core/styles";
import { PrimaryColors } from "../../styles/styles";

export const TimeSelectorStyles = makeStyles({
  CurrentTime: {
    fontSize: 24,
    color: PrimaryColors.Light,
    fontFamily: "Roboto",
  },
  Container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: -40,
  },
  IconButtons: {},
});
