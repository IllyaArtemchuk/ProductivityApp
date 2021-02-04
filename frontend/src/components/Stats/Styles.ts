import { makeStyles } from "@material-ui/core/styles";
import { FontSize, PrimaryColors } from "../../styles/styles";
import { offsetEnum } from "./Interfaces";

export const MainLayoutStyles = makeStyles({
  Selector: {},
  Container: {
    marginTop: 30,
  },
  Graph: {
    marginTop: 5,
    marginLeft: -80,
    minWidth: 550,
  },
  Title: {
    textAlign: "center",
    marginBottom: 15,
  },
  CardDivider: {
    marginTop: 100,
  },
  Cards: {
    marginTop: 70,
  },
});

export const SelectorStyles = makeStyles({
  Select: {
    fontSize: FontSize.size36,
    marginLeft: 20,
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
  Container: {
    marginTop: 20,
    display: "flex",
    whiteSpace: "nowrap",
  },
  IconButton: {
    marginBottom: 15,
  },
});

export const GraphStyles = makeStyles({
  LabelStyles: {},
});

export const StatsCardStyles = makeStyles({
  container: {
    minWidth: 400,
    maxWidth: 600,
    height: 300,
  },
});
