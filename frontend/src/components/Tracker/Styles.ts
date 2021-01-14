import { makeStyles } from "@material-ui/core/styles";
import { ThemeColors } from "../../styles/styles";

export const CurrentDisplayStyles = makeStyles({
  //   box: {
  //     border: "solid",
  //     backgroundColor: ThemeColors.Green,
  //     marginTop: 20,
  //     borderColor: ThemeColors.Green,
  //     borderRadius: 30,
  //     textAlign: "center",
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     width: "100%",
  //     height: 250,
  //   },
  timer: {
    color: ThemeColors.Dark,
  },
  timerContainer: {
    marginBottom: 15,
  },
  box: {
    border: "solid",
    backgroundColor: ThemeColors.Green,
    marginTop: 20,
    borderColor: ThemeColors.Green,
    borderRadius: 30,
    textAlign: "center",
    height: 250,
  },
  timerControl: {
    height: 100,
    width: 100,
    backgroundColor: ThemeColors.Sand,
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: ThemeColors.Sand,
  },
});
