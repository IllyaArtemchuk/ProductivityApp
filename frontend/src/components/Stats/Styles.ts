import { makeStyles } from "@material-ui/core/styles";
import {
  AccentColors,
  FontSize,
  FontWeight,
  NeutralColors,
  PrimaryColors,
} from "../../styles/styles";
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
    color: PrimaryColors.Dark,
  },
  CardDivider: {
    marginTop: 170,
  },
  CardDividerSmallWindow: {
    marginTop: 40,
  },
  Cards: {
    marginTop: 80,
    marginLeft: -150,
  },
  CardsSmallWindow: {
    marginTop: 40,
    marginLeft: 40,
    minWidth: 300,
  },
});

export const SelectorStyles = makeStyles({
  Select: {
    fontSize: FontSize.size36,
    marginLeft: 20,
    color: AccentColors.Green,
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

export const StatsCardStyles = makeStyles({
  Card: {
    minWidth: 200,
    height: 300,
    boxShadow: `${PrimaryColors.Light} 0px 1px 6px, ${PrimaryColors.Lightest} 0px 1px 4px`,
  },
  Title: {
    color: PrimaryColors.Light,
    marginBottom: 12,
    textAlign: "center",
  },
  Stat: {
    marginTop: 6,
    color: PrimaryColors.Base,
  },
  Empty: {
    fontSize: 200,
    color: NeutralColors.Light,
  },
  EmptyText: {
    fontWeight: FontWeight.heavy,
    color: NeutralColors.Light,
    textAlign: "center",
    marginLeft: 15,
  },
});
