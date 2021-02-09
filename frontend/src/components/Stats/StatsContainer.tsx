import { useState, useEffect, FC } from "react";
import { Grid, useMediaQuery, Typography } from "@material-ui/core";
import {
  offsetEnum,
  offsetArray,
  GraphData,
  Statistic,
  IActivities,
} from "./Interfaces";
import Selector from "./Selector";
import Graph from "./Graph";
import { MainLayoutStyles } from "./Styles";
import { IAction } from "../ActionTable/Interfaces";
import { NeutralColors } from "../../styles/styles";
import dayjs from "dayjs";
import StatsCard from "./StatsCard";
import { timeFormatter } from "./helper";

interface IProps {
  actions: IAction[];
}

const StatsContainer: FC<IProps> = ({ actions }) => {
  const [timeOffset, setTimeOffset] = useState(0);
  const [offsetType, setOffsetType] = useState<offsetEnum>(0);
  const [currentlySelectedCategory, setCurrentlySelectedCategory] = useState(
    ""
  );
  const [graphData, setGraphData] = useState<GraphData[]>([]);
  const [categoryStats, setCategoryStats] = useState<Statistic[]>([]);
  const [totalDayTime, setTotalDayTime] = useState(0);
  const [totalCategoryTime, setTotalCategoryTime] = useState(0);
  const [activityStats, setActivityStats] = useState<Statistic[]>([]);
  const matches = useMediaQuery("(min-width:550px)");

  useEffect(() => {
    setCategoryStats([]);
    setActivityStats([]);
    setTotalDayTime(0);
    setTotalCategoryTime(0);
  }, [timeOffset, offsetType]);
  // Parses Actions into a graph friendly format and calculates some stats to display
  useEffect(() => {
    let validDataCount = 0;
    let graphFriendlyData: any = {};
    let valid = false;
    let totalTimeTracked = 0;
    let favoriteActivity = "";
    let favoriteActivityCounter = 0;
    for (let i = 0; i < actions.length; i++) {
      valid = false;
      if (offsetType === 0 && timeOffset === 0) {
        if (!dayjs().isSame(actions[i].timeQuery, offsetArray[offsetType])) {
          break;
        }
        valid = true;
      } else {
        if (offsetArray[offsetType] === "day") {
          if (
            actions[i].timeQuery.isSame(
              dayjs().subtract(timeOffset, offsetArray[offsetType]),
              "day"
            )
          ) {
            valid = true;
          } else if (
            actions[i].timeQuery.isBefore(
              dayjs().subtract(timeOffset, offsetArray[offsetType])
            )
          ) {
            break;
          }
        } else if (
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
          valid = true;
        }
      }
      if (valid) {
        totalTimeTracked += actions[i].minutes;
        validDataCount++;
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
        if (
          graphFriendlyData[actions[i].category].activities[actions[i].activity]
            .minutes > favoriteActivityCounter
        ) {
          favoriteActivity = actions[i].activity;
          favoriteActivityCounter =
            graphFriendlyData[actions[i].category].activities[
              actions[i].activity
            ].minutes;
        }
      }
    }
    console.log(graphFriendlyData);
    if (!validDataCount) {
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
      setCategoryStats([
        { Stat: "Total Time", Value: timeFormatter(totalTimeTracked) },
        { Stat: "Favorite Activity", Value: favoriteActivity },
      ]);
      setTotalDayTime(totalTimeTracked);
      setGraphData(Object.values(graphFriendlyData));
    }
  }, [actions, offsetType, timeOffset]);

  useEffect(() => {
    if (currentlySelectedCategory !== "") {
      let found = graphData.find(
        (cat) => cat.category === currentlySelectedCategory
      );
      if (found !== undefined) {
        let arrayForm: IActivities[] = Object.values(found.activities);
        let totalTimeTracked = 0;
        let favoriteActivity = "";
        let favoriteActivityCounter = 0;
        for (let activity of arrayForm) {
          totalTimeTracked += activity.minutes;
          if (activity.minutes > favoriteActivityCounter) {
            favoriteActivity = activity.activity;
            favoriteActivityCounter = activity.minutes;
          }
        }
        setTotalCategoryTime(totalTimeTracked);
        setActivityStats([
          {
            Stat: "Total Time",
            Value: timeFormatter(totalTimeTracked),
          },
          {
            Stat: "Favorite Activity",
            Value: favoriteActivity,
          },
        ]);
      }
    }
  }, [currentlySelectedCategory, graphData]);
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
      <Grid
        item
        xs={4}
        className={matches ? classes.Cards : classes.CardsSmallWindow}
      >
        <StatsCard
          Stats={categoryStats}
          Title="Stats"
          setStats={setCategoryStats}
          Range={offsetType}
          totalTime={totalDayTime}
        />
        <div
          className={
            matches ? classes.CardDivider : classes.CardDividerSmallWindow
          }
        >
          <StatsCard
            Stats={activityStats}
            Title={currentlySelectedCategory}
            setStats={setActivityStats}
            Range={offsetType}
            totalTime={totalCategoryTime}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default StatsContainer;
