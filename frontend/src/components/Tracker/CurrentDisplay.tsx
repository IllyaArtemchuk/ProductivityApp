import { useState, FC, Dispatch, SetStateAction } from "react";
import { Box, Typography, Grid, Button } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import Timer from "react-compound-timer";
import { CurrentDisplayStyles } from "./Styles";
import StartButton from "./StartButton";
import { ICurrentAction, ICurrentlySelected } from "./Interfaces";
import { UPDATE_CURRENT_ACTION } from "../../graphql/setCurrentAction";

interface IProps {
  currentlySelected: ICurrentlySelected;
  seconds: number;
  setSeconds: Dispatch<SetStateAction<number>>;
  currentAction: ICurrentAction;
}

const CurrentDisplay: FC<IProps> = ({
  currentlySelected,
  seconds,
  setSeconds,
}) => {
  const classes = CurrentDisplayStyles();
  const [isRunning, setRunning] = useState(false);
  const [updateAction] = useMutation(UPDATE_CURRENT_ACTION);

  const displayCurrentActivity = () => {
    if (currentlySelected.category !== "") {
      return `${currentlySelected.category}/${currentlySelected.activity}`;
    } else {
      return "Select An Activity";
    }
  };

  const startCurrentAction = () => {};
  return (
    <Box className={classes.box} boxShadow={3}>
      <Timer
        startImmediately={false}
        initialTime={1000 * seconds}
        lastUnit="h"
        checkpoints={[
          {
            time: 1000 * 1,
            callback: () => setSeconds(1),
          },
        ]}
        onStart={() => setRunning(true)}
        onPause={() => {
          setRunning(false);
        }}
        formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
      >
        {({ start, pause, stop, timerState }: any) => (
          <>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.currentActivity}>
                  {displayCurrentActivity()}
                </Typography>
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={8} className={classes.timerContainer}>
                <Typography variant="h1" className={classes.timer}>
                  <Timer.Hours />:
                  <Timer.Minutes />:
                  <Timer.Seconds />
                </Typography>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4} />
              <Grid item xs={12} className={classes.buttonContainer}>
                {seconds === 0 && !isRunning ? (
                  <StartButton
                    currentlySelected={currentlySelected}
                    onClick={start}
                  />
                ) : (
                  <>
                    <Button
                      variant="contained"
                      size="large"
                      className={classes.pauseButton}
                      onClick={isRunning ? pause : start}
                    >
                      {isRunning ? "Pause" : "Resume"}
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      className={classes.finishButton}
                      onClick={() => console.log(timerState)}
                    >
                      Finish
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </>
        )}
      </Timer>
    </Box>
  );
};

export default CurrentDisplay;
