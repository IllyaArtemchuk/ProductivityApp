import { useState, FC } from "react";
import { Grid } from "@material-ui/core";
import { offsetEnum } from "./Interfaces";
import Selector from "./Selector";
import { MainLayoutStyles } from "./Styles";
const StatsContainer: FC = () => {
  const [timeOffset, setTimeOffset] = useState(0);
  const [offsetType, setOffsetType] = useState<offsetEnum>(0);

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
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default StatsContainer;
