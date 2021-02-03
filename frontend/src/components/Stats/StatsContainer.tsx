import { useState, useEffect, FC } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { offsetEnum, offsetArray, GraphData } from "./Interfaces";
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
  const [graphData, setGraphData] = useState<GraphData[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let newCurrentlySelected: IAction[] = [];
    let graphFriendlyData: any = {};
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
        if (!graphFriendlyData[actions[i].category]) {
          graphFriendlyData[actions[i].category] = {
            category: actions[i].category,
            activity: actions[i].activity,
            activityColor: actions[i].activityColor,
            categoryColor: actions[i].categoryColor,
            y: actions[i].minutes,
          };
        } else {
          graphFriendlyData[actions[i].category].y += actions[i].minutes;
        }
        newCurrentlySelected.push(actions[i]);
      }
    }
    setGraphData(Object.values(graphFriendlyData));
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
          <Graph displayedActions={graphData} />
        )}
      </Grid>
    </Grid>
  );
};

export default StatsContainer;
