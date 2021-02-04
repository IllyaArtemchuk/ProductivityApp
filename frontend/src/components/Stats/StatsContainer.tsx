import { useState, useEffect, FC } from "react";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import { offsetEnum, offsetArray, GraphData } from "./Interfaces";
import Selector from "./Selector";
import Graph from "./Graph";
import { MainLayoutStyles } from "./Styles";
import { IAction } from "../ActionTable/Interfaces";
import { NeutralColors } from "../../styles/styles";
import dayjs from "dayjs";
import StatsCard from "./StatsCard";

interface IProps {
  actions: IAction[];
}

const StatsContainer: FC<IProps> = ({ actions }) => {
  const [timeOffset, setTimeOffset] = useState(0);
  const [offsetType, setOffsetType] = useState<offsetEnum>(0);
  const [currentlySelectedActions, setCurrentlySelectedActions] = useState<
    IAction[]
  >([]);
  const [currentlySelectedCategory, setCurrentlySelectedCategory] = useState(
    ""
  );
  const [graphData, setGraphData] = useState<GraphData[]>([]);
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
            categoryColor: actions[i].categoryColor,
            minutes: actions[i].minutes,
            activities: {},
          };
        } else {
          graphFriendlyData[actions[i].category].minutes += actions[i].minutes;
        }
        if (
          !graphFriendlyData[actions[i].category].activities[
            actions[i].activity
          ]
        ) {
          graphFriendlyData[actions[i].category].activities[
            actions[i].activity
          ] = {
            minutes: actions[i].minutes,
            activity: actions[i].activity,
            activityColor: actions[i].activityColor,
          };
        } else {
          graphFriendlyData[actions[i].category].activities[
            actions[i].activity
          ].minutes += actions[i].minutes;
        }
        newCurrentlySelected.push(actions[i]);
      }
    }
    console.log(graphFriendlyData);
    if (!newCurrentlySelected.length) {
      setGraphData([
        {
          category: "Nothing here...",
          categoryColor: NeutralColors.Normal,
          minutes: 1,
          activities: {
            minutes: 1,
            activity: "Nothing here...",
            activityColor: NeutralColors.Light,
          },
        },
      ]);
    } else {
      setGraphData(Object.values(graphFriendlyData));
    }
    setCurrentlySelectedActions(newCurrentlySelected);
  }, [actions, offsetType, timeOffset]);

  const classes = MainLayoutStyles();
  return (
    <Grid container className={classes.Container}>
      <Grid item xs={12}>
        <Typography variant="h2" className={classes.Title}>
          Your Stats
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.Selector}>
        <Selector
          timeOffset={timeOffset}
          setTimeOffset={setTimeOffset}
          offsetType={offsetType}
          setOffsetType={setOffsetType}
          setCurrentlySelectedCategory={setCurrentlySelectedCategory}
        />
      </Grid>
      <Grid item xs={8} className={classes.Graph}>
        <Graph
          graphData={graphData}
          currentlySelectedCategory={currentlySelectedCategory}
          setCurrentlySelectedCategory={setCurrentlySelectedCategory}
        />
      </Grid>
      <Grid item xs={4} className={classes.Cards}>
        <StatsCard />
        <div className={classes.CardDivider}>
          <StatsCard />
        </div>
      </Grid>
    </Grid>
  );
};

export default StatsContainer;
