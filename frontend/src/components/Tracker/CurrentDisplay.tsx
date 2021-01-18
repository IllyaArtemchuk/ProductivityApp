import { FC } from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import { CurrentDisplayStyles } from "./Styles";
import StartButton from "./StartButton";
import { ICurrentlySelected } from "./Interfaces";
interface IProps {
  currentlySelected: ICurrentlySelected;
}

const CurrentDisplay: FC<IProps> = ({ currentlySelected }) => {
  const classes = CurrentDisplayStyles();

  const displayCurrentActivity = () => {
    if (currentlySelected.category !== "") {
      return `${currentlySelected.category}/${currentlySelected.activity}`;
    } else {
      return "Select An Activity";
    }
  };
  return (
    <Box className={classes.box} boxShadow={3}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.currentActivity}>
            {displayCurrentActivity()}
          </Typography>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={8} className={classes.timerContainer}>
          <Typography variant="h1" className={classes.timer}>
            00:00
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <StartButton currentlySelected={currentlySelected} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CurrentDisplay;
