import { FC } from "react";
import { Paper, Typography, Card, CardContent } from "@material-ui/core";
import { StatsCardStyles } from "./Styles";

const StatsCard: FC = () => {
  const classes = StatsCardStyles();
  return (
    <Card className={classes.Card}>
      <CardContent>
        <Typography variant="h4">Day Stats</Typography>
        <Typography variant="body1" component="p">
          Total Time Tracked: 124
        </Typography>
        <Typography variant="body1" component="p">
          Average Per Day : 11
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
