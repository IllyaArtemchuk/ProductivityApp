import { FC, useEffect, Dispatch, SetStateAction } from "react";
import { Typography, Card, CardContent, Grid } from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import { StatsCardStyles } from "./Styles";
import { Statistic } from "./Interfaces";
interface IProps {
  Title: String;
  Stats: Array<Statistic>;
  setStats: Dispatch<SetStateAction<Statistic[]>>;
  Range?: number;
  totalTime: number;
}

const StatsCard: FC<IProps> = ({
  Title,
  Stats,
  setStats,
  Range,
  totalTime,
}) => {
  useEffect(() => {
    if (totalTime !== 0 && Range && Range > 0) {
      let divider = Range === 1 ? 7 : 30;
      // @ts-ignore
      let averagePerDay = Math.trunc(totalTime / divider);
      if (averagePerDay > 0) {
        setStats((prevStats) => [
          ...prevStats,
          { Stat: "Average Per Day", Value: `${averagePerDay} min` },
        ]);
      }
    }
  }, [Range, setStats, totalTime]);
  const classes = StatsCardStyles();

  const renderStats = () => {
    if (Stats.length) {
      return Stats.map((stat, ind) => {
        return (
          <Typography
            variant="h6"
            component="p"
            key={ind}
            className={classes.Stat}
          >
            {stat.Stat}: {stat.Value}
          </Typography>
        );
      });
    } else {
      return (
        <Typography variant="h6" component="p" className={classes.Stat}>
          Nothing completed today...
        </Typography>
      );
    }
  };
  return (
    <Card className={classes.Card} elevation={4}>
      {Stats.length ? (
        <CardContent>
          <Typography variant="h4" className={classes.Title}>
            {Range} {Title}
          </Typography>
          {renderStats()}
        </CardContent>
      ) : (
        <CardContent>
          <Grid container>
            <Grid item xs={3} />
            <Grid item xs={6}>
              <InboxIcon className={classes.Empty} />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={12}>
              <Typography className={classes.EmptyText}>
                {Title === "Stats"
                  ? "Nothing completed..."
                  : "Select a category..."}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      )}
    </Card>
  );
};

export default StatsCard;
