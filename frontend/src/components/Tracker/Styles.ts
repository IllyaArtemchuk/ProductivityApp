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
  },
  box: {
    border: "solid",
    backgroundColor: PrimaryColors.Base,
    marginTop: 20,
    borderColor: PrimaryColors.Base,
    borderRadius: 10,
    textAlign: "center",
    height: 250,
  },
  timerControl: {
    height: 90,
    width: 90,
    backgroundColor: AccentColors.LightGreen,
    boxShadow: `inset 0 2px 0 ${AccentColors.LightestGreen}, 0 1px 6px hsla(0, 0%, 0%, .4)`,
    color: AccentColors.DarkGreen,
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

interface OptionProps {
  color: string;
}

export const ActivitySelectorStyles = makeStyles({
  container: {
    position: "relative",
    justifyContent: "center",
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
});
