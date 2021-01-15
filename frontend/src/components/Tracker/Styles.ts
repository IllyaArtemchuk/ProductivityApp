import { makeStyles } from "@material-ui/core/styles";
import { ThemeColors } from "../../styles/styles";

export const CurrentDisplayStyles = makeStyles({
  timer: {
    color: ThemeColors.Sand,
  },
  timerContainer: {
    marginBottom: 15,
  },
  box: {
    border: "solid",
    backgroundColor: ThemeColors.Blue,
    marginTop: 20,
    borderColor: ThemeColors.Blue,
    borderRadius: 10,
    textAlign: "center",
    height: 250,
  },
  timerControl: {
    height: 90,
    width: 90,
    backgroundColor: ThemeColors.Green,
    "&:hover": {
      backgroundColor: ThemeColors.FadedGreen,
      color: ThemeColors.Sand,
    },
  },
  controlButton: { fontSize: 65 },
  button: {
    width: 100,
    height: 40,
    backgroundColor: ThemeColors.Sand,
  },
});
