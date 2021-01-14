import { FC } from "react";
import { Box, Typography, Grid, IconButton } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { CurrentDisplayStyles } from "./Styles";

const CurrentDisplay: FC = () => {
  const classes = CurrentDisplayStyles();
  return (
    <Box className={classes.box}>
      <Grid container>
        <Grid item xs={12} className={classes.timerContainer}>
          <Typography variant="h1" className={classes.timer}>
            00:00
          </Typography>
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <IconButton className={classes.timerControl}>
            <PlayArrowIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CurrentDisplay;
