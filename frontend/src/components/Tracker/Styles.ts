import { makeStyles } from "@material-ui/core/styles";
import {
  ThemeColors,
  PrimaryColors,
  AccentColors,
  NeutralColors,
  FontSize,
  FontWeight,
} from "../../styles/styles";

export const MainLayoutStyles = makeStyles({
  ActivitySelector: {
    marginTop: 30,
  },
});

export const CurrentDisplayStyles = makeStyles({
  timer: {
    color: NeutralColors.White,
  },
  timerContainer: {
    marginBottom: 15,
    marginTop: -20,
  },
  box: {
    border: "solid",
    backgroundColor: PrimaryColors.Base,
    marginTop: 20,
    borderColor: PrimaryColors.Base,
    borderRadius: 10,
    textAlign: "center",
    height: 250,
    maxWidth: 1200,
    minWidth: 350,
  },
  currentActivity: {
    textAlign: "right",
    color: PrimaryColors.Lightest,
    marginRight: 10,
  },
  pauseButton: {
    marginTop: 18,
    marginRight: 20,
    width: 100,
    height: 46,
    backgroundColor: AccentColors.LightGreen,
    color: AccentColors.DarkestGreen,
    "&:hover": {
      backgroundColor: ThemeColors.FadedGreen,
      color: ThemeColors.Sand,
    },
  },
  finishButton: {
    marginTop: 18,
    marginLeft: 20,
    width: 100,
    height: 46,
    color: NeutralColors.Dark,
    backgroundColor: AccentColors.Red,
    "&:hover": {
      backgroundColor: AccentColors.LightRed,
      color: NeutralColors.White,
    },
  },
  buttonContainer: {
    margin: "auto",
  },
});

export const ActivitySelectorStyles = makeStyles({
  container: {
    position: "relative",
    justifyContent: "center",
  },
  loadingBar: {
    width: 600,
    marginLeft: "auto",
    marginRight: "auto",
  },
  formControl: {
    marginTop: -2,
  },
  option: {
    fontSize: FontSize.size24,
  },
  select: {
    fontSize: FontSize.size24,
    fontWeight: FontWeight.heavy,
  },
  typography: {
    marginRight: 5,
    fontSize: FontSize.size24,
    color: PrimaryColors.Dark,
  },
  emphasized: {
    fontWeight: FontWeight.heavy,
  },
});

interface DropdownProps {
  color: string;
}

export const DropdownStyles = makeStyles({
  formControl: {
    marginTop: -2,
  },
  option: {
    fontSize: FontSize.size24,
  },
  select: {
    fontSize: FontSize.size24,
    color: (props: DropdownProps) => props.color,
    fontWeight: FontWeight.heavy,
  },
  placeHolder: {
    color: NeutralColors.Light,
    fontSize: FontSize.size24,
  },
  typography: {
    marginRight: 5,
    fontSize: FontSize.size24,
    color: PrimaryColors.Dark,
  },
  emphasized: {
    fontWeight: FontWeight.heavy,
  },
  disabledDropDown: {
    color: (props: DropdownProps) => props.color,
    opacity: 0.5,
  },
});

interface BProps {
  disabled: boolean;
}

export const StartButtonStyles = makeStyles({
  timerControl: {
    height: 90,
    width: 90,
    backgroundColor: AccentColors.LightGreen,
    boxShadow: (props: BProps) =>
      `inset 0 2px 0 ${
        props.disabled ? NeutralColors.Light : AccentColors.LightestGreen
      }, 0 1px 6px hsla(0, 0%, 0%, .4)`,
    color: AccentColors.DarkGreen,
    "&:hover": {
      backgroundColor: ThemeColors.FadedGreen,
      color: ThemeColors.Sand,
    },
  },
  controlButton: { fontSize: 65 },
});
