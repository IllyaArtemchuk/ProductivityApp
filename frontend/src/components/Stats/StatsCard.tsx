import { FC } from "react";
import { Paper, Typography } from "@material-ui/core";
import { StatsCardStyles } from "./Styles";

const StatsCard: FC = () => {
  const classes = StatsCardStyles();
  return (
    <>
      <Typography variant="h4">Category Stats</Typography>
      <Typography variant="h5">Total Time: 153 min</Typography>
      <Typography variant="h5">Average Per Day: 25 min</Typography>
    </>
  );
};

export default StatsCard;
