import { makeStyles } from "@material-ui/core/styles";
import { FontSize, PrimaryColors } from "../../styles/styles";
import { offsetEnum } from "./Interfaces";

export const MainLayoutStyles = makeStyles({
  Selector: {},
  Container: {
    marginTop: 80,
  },
});

export const SelectorStyles = makeStyles({
  Select: {
    fontSize: FontSize.size36,
  },
  Container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export interface CustomTimeSelectorProps {
  offsetType: offsetEnum;
}
export const CustomTimeSelectorStyles = makeStyles({
  CurrentTime: {
    fontSize: 36,
    color: PrimaryColors.Light,
    fontFamily: "Roboto",
    textAlign: "center",
    minWidth: (props: CustomTimeSelectorProps) =>
      props.offsetType === 0 ? 0 : 235,
    display: "inline-block",
  },
  Container: {},
  IconButton: {
    marginBottom: 10,
  },
});
