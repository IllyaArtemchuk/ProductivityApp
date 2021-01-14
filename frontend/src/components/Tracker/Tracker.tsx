import { FC } from "react";
import { Grid } from "@material-ui/core";
import CurrentDisplay from "./CurrentDisplay";
const Tracker: FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <CurrentDisplay />
      </Grid>
    </Grid>
  );
};

export default Tracker;
