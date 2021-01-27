import { useState, FC, Dispatch, SetStateAction } from "react";
import { Box, Typography, Grid, Button } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import Timer from "react-compound-timer";
import { CurrentDisplayStyles } from "./Styles";
import StartButton from "./StartButton";
import { ICurrentlySelected } from "./Interfaces";
import { UPDATE_CURRENT_ACTION } from "../../graphql/setCurrentAction";
import { CURRENT_ACTION } from "../../graphql/getCurrentAction";

interface IProps {
  currentlySelected: ICurrentlySelected;
  seconds: number;
  setSeconds: Dispatch<SetStateAction<number>>;
  userID: string;
}

const CurrentDisplay: FC<IProps> = ({
  currentlySelected,
  seconds,
  setSeconds,
  userID,
}) => {
  const classes = CurrentDisplayStyles();
  const [isRunning, setRunning] = useState(false);
  const [updateAction] = useMutation(UPDATE_CURRENT_ACTION, {
    refetchQueries: [{ query: CURRENT_ACTION }],
    awaitRefetchQueries: true,
  });
  const { data } = useQuery(CURRENT_ACTION);
  const displayCurrentActivity = () => {
    if (currentlySelected.category !== "") {
      return `${currentlySelected.category}/${currentlySelected.activity}`;
    } else {
      return "Select An Activity";
    }
  };
  const startCurrentAction = (startFunc: any, getTime: any) => {
    console.log("Zwoosh");
    if (data) {
      updateAction({
        variables: {
          userID: userID,
          minutes: 0,
          timeStarted: Date.now().toString(),
          category: data.currentUser.currentAction.category,
          activity: data.currentUser.currentAction.activity,
        },
      });
      startFunc();
    } else {
      return "Error Getting User Data";
    }
  };

  const updateCurrentAction = (pauseFunc: any, currentTime: number) => {
    if (data) {
      updateAction({
        variables: {
          userID: userID,
          minutes: Math.trunc(currentTime / 1000 / 60),
          timeStarted: data.currentUser.currentAction.timeStarted,
          category: data.currentUser.currentAction.category,
          activity: data.currentUser.currentAction.activity,
        },
      });
    }
    pauseFunc();
  };

  const setInitialTime = (setTime: any) => {
    console.log("called");
    setTime(seconds * 1000);
    return null;
  };

  return (
    <Box className={classes.box} boxShadow={3}>
      <Timer
        startImmediately={false}
        initialTime={seconds * 1000}
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
        {({ start, pause, stop, getTimerState, getTime, setTime }: any) => (
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
                  {getTime() === 0 ? setInitialTime(setTime) : null}
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
                    onClick={() => startCurrentAction(start, getTime)}
                  />
                ) : (
                  <>
                    <Button
                      variant="contained"
                      size="large"
                      className={classes.pauseButton}
                      onClick={() => {
                        return isRunning
                          ? updateCurrentAction(pause, Math.trunc(getTime()))
                          : start();
                      }}
                    >
                      {isRunning ? "Pause" : "Resume"}
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      className={classes.finishButton}
                      onClick={() => console.log(Math.trunc(getTime()))}
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
