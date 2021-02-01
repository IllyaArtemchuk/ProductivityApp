import { useState, useEffect, FC } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { offsetEnum, offsetArray } from "./Interfaces";
import Selector from "./Selector";
import Graph from "./Graph";
import { MainLayoutStyles } from "./Styles";
import { IAction } from "../ActionTable/Interfaces";
import dayjs from "dayjs";

interface IProps {
  actions: IAction[];
}

const StatsContainer: FC<IProps> = ({ actions }) => {
  const [timeOffset, setTimeOffset] = useState(0);
  const [offsetType, setOffsetType] = useState<offsetEnum>(0);
  const [currentlySelectedActions, setCurrentlySelectedActions] = useState<
    IAction[]
  >([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let newCurrentlySelected: IAction[] = [];
    for (let i = 0; i < actions.length; i++) {
      if (
        actions[i].timeQuery.isBefore(
          dayjs().subtract(timeOffset, offsetArray[offsetType])
        )
      ) {
        if (
          !actions[i].timeQuery.isAfter(
            dayjs().subtract(timeOffset + 1, offsetArray[offsetType])
          )
        ) {
          break;
        }
        newCurrentlySelected.push(actions[i]);
      }
    }
    setCurrentlySelectedActions(newCurrentlySelected);
  }, [actions, offsetType, timeOffset]);
  const classes = MainLayoutStyles();
  return (
    <Grid container className={classes.Container}>
      <Grid item xs={12} className={classes.Selector}>
        <Selector
          timeOffset={timeOffset}
          setTimeOffset={setTimeOffset}
          offsetType={offsetType}
          setOffsetType={setOffsetType}
        />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={10} className={classes.Graph}>
        {loading ? (
          <CircularProgress size={100} />
        ) : (
          <Graph displayedActions={currentlySelectedActions} />
        )}
      </Grid>
    </Grid>
  );
};

export default StatsContainer;
