import { useState, useEffect, FC, Dispatch, SetStateAction } from "react";
import { Prompt } from "react-router-dom";
import { Box, Typography, Grid, Button } from "@material-ui/core";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@apollo/client";
import Timer from "react-compound-timer";
import { CurrentDisplayStyles } from "./Styles";
import StartButton from "./StartButton";
import { ICurrentlySelected } from "./Interfaces";
import { UPDATE_CURRENT_ACTION } from "../../graphql/updateCurrentAction";
import { CURRENT_ACTION } from "../../graphql/getCurrentAction";
import { CREATE_ACTION } from "../../graphql/createNewAction";
import KeyPressHandler from "./KeyPressHandler";
import { IAction } from "../ActionTable/Interfaces";
import TimeResetter from "./TimeResetter";

interface IProps {
  currentlySelected: ICurrentlySelected;
  seconds: number;
  setSeconds: Dispatch<SetStateAction<number>>;
  userID: string;
  setActions: React.Dispatch<React.SetStateAction<IAction[]>>;
  actions: IAction[];
  activityModalOpen: boolean;
  categoryModalOpen: boolean;
}

const CurrentDisplay: FC<IProps> = ({
  currentlySelected,
  seconds,
  setSeconds,
  userID,
  actions,
  setActions,
  activityModalOpen,
  categoryModalOpen,
}) => {
  const classes = CurrentDisplayStyles();
  const [isRunning, setRunning] = useState(false);
  // Prevents Navigation if there is unsaved time tracked
  useEffect(() => {
    if (isRunning) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }
  }, [isRunning]);

  const [updateAction] = useMutation(UPDATE_CURRENT_ACTION, {
    refetchQueries: [{ query: CURRENT_ACTION }],
    awaitRefetchQueries: true,
  });
  const [createAction] = useMutation(CREATE_ACTION);
  const { data } = useQuery(CURRENT_ACTION);
  const displayCurrentActivity = () => {
    if (currentlySelected.category !== "") {
      return `${currentlySelected.category}/${currentlySelected.activity}`;
    } else {
      return "Select An Activity";
    }
  };

  useEffect(() => {
    if (data) {
      setSeconds(data.currentUser.currentAction.minutes * 60);
    }
  }, [setSeconds, data]);

  const startCurrentAction = (startFunc: any) => {
    if (data) {
      updateAction({
        variables: {
          userID: userID,
          minutes: 0,
          timeStarted: Date.now().toString(),
          category: currentlySelected.category,
          activity: currentlySelected.activity,
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

  const finishCurrentAction = (
    resetFunc: any,
    currentTime: number,
    pause: any
  ) => {
    if (currentTime / 1000 < 60) {
      updateAction({
        variables: {
          userID: userID,
          minutes: 0,
          timeStarted: "",
          category: data.currentUser.currentAction.category,
          activity: data.currentUser.currentAction.activity,
        },
      }).then(() => {
        setSeconds(0);
        resetFunc();
        pause();
      });
    } else if (data) {
      let EndTime = Date.now().toString();
      setActions([
        {
          category: currentlySelected.category,
          categoryColor: currentlySelected.categoryColor,
          activity: currentlySelected.activity,
          activityColor: currentlySelected.activityColor,
          minutes: Math.trunc(currentTime / 1000 / 60),
          timeStarted: data.currentUser.currentAction.timeStarted,
          timeEnded: EndTime,
          timeQuery: dayjs(parseInt(EndTime)),
          id: "1",
        },
        ...actions,
      ]);
      createAction({
        variables: {
          userID: userID,
          timeStarted: data.currentUser.currentAction.timeStarted,
          timeEnded: Date.now().toString(),
          minutes: Math.trunc(currentTime / 1000 / 60),
          categoryName: data.currentUser.currentAction.category,
          activityTitle: data.currentUser.currentAction.activity,
        },
      }).then(() => {
        updateAction({
          variables: {
            userID: userID,
            minutes: 0,
            timeStarted: "",
            category: data.currentUser.currentAction.category,
            activity: data.currentUser.currentAction.activity,
          },
        });
        Promise.resolve()
          .then(() => {
            setSeconds(0);
          })
          .then(() => {
            resetFunc();
            pause();
          });
      });
    }
  };

  const setInitialTime = (setTime: any) => {
    setTime(seconds * 1000);
    return null;
  };

  const renderKeyPressHandler = (start: any, pause: any, getTime: any) => {
    if (
      currentlySelected.category === "" ||
      currentlySelected.activity === "" ||
      activityModalOpen ||
      categoryModalOpen
    ) {
      return null;
    } else {
      return (
        <KeyPressHandler
          startCurrentAction={() => startCurrentAction(start)}
          pauseCurrentAction={() =>
            updateCurrentAction(pause, Math.trunc(getTime()))
          }
          seconds={seconds}
          isRunning={isRunning}
          start={start}
        />
      );
    }
  };

  const initialTimeGetter = () => {
    return seconds * 1000;
  };

  return (
    <Box className={classes.box} boxShadow={3}>
      <Prompt
        when={isRunning}
        message="If you dont pause the timer, you will lose progress on page leave."
      />
      <Timer
        startImmediately={false}
        initialTime={initialTimeGetter()}
        lastUnit="h"
        checkpoints={[
          {
            time: 1000 * 1,
            callback: () => {
              setSeconds(1);
            },
          },
        ]}
        onStart={() => setRunning(true)}
        onPause={() => {
          setRunning(false);
        }}
        formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
      >
        {({ start, pause, reset, getTime, setTime }: any) => (
          <>
            <Grid container>
              <Grid item xs={12}>
                {renderKeyPressHandler(start, pause, getTime)}
                <Typography variant="h6" className={classes.currentActivity}>
                  {displayCurrentActivity()}
                </Typography>
              </Grid>
              <TimeResetter setTime={setTime} seconds={seconds} />
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
                    onClick={() => startCurrentAction(start)}
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
                      onClick={() =>
                        finishCurrentAction(reset, Math.trunc(getTime()), pause)
                      }
                    >
                      {Math.trunc(getTime()) / 1000 < 60 ? "Discard" : "Finish"}
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
