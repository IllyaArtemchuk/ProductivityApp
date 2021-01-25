import { FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { ActivityModalStyles } from "./Styles";
import CreateTextField from "../CreateTextField";
import { ActivityRef } from "../../Tracker/Interfaces";
import { CREATE_ACTIVITY } from "../../../graphql/createActivity";
import { UPDATE_CURRENT_ACTION } from "../../../graphql/setCurrentAction";
import { CURRENT_USER } from "../../../graphql/getCurrentUser";

interface IProps {
  activities: Array<ActivityRef>;
  currentCategory: string;
  userID: string;
  open: boolean;
  close: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const ActivityModal: FC<IProps> = ({
  userID,
  activities,
  open,
  close,
  setLoading,
  currentCategory,
}) => {
  const classes = ActivityModalStyles();
  const [newActivity, setNewActivity] = useState("");
  const [updateAction] = useMutation(UPDATE_CURRENT_ACTION, {
    refetchQueries: [{ query: CURRENT_USER }],
  });
  const [createActivity] = useMutation(CREATE_ACTIVITY);
  const [activityColor, setActivityColor] = useState("#0058e6");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (newActivity.length > 0 && newActivity.length <= 20) {
      setValidationError("");
    }
  }, [newActivity]);

  const onSubmit = () => {
    // Validate
    let activity = newActivity.trim();
    if (activity.length > 20 || activity.length === 0) {
      if (activity.length > 20) {
        setValidationError("Maximum Character limit is 20");
      } else if (activity.length === 0) {
        setValidationError("Activity can't be blank");
      }
      return;
    }
    for (let act of activities) {
      if (act.title === activity) {
        setValidationError("Activity Already Exists");
        return;
      }
    }
    close(false);
    setLoading(true);
    createActivity({
      variables: {
        userID: userID,
        categoryName: currentCategory,
        activityTitle: newActivity,
        color: activityColor,
      },
    }).then(() => {
      updateAction({
        variables: {
          userID: userID,
          category: currentCategory,
          activity: newActivity,
          minutes: 0,
          timeStarted: "",
        },
      }).then(() => setLoading(false));
    });
  };
  return (
    <Dialog open={open} className={classes.Container}>
      <DialogTitle id="form-dialog-title" className={classes.ModalTitle}>
        Create A New Activity
      </DialogTitle>
      <DialogContent className={classes.DialogContent}>
        <CreateTextField
          type="activity"
          autoFocus={true}
          textValue={newActivity}
          setTextValue={setNewActivity}
          currentColor={activityColor}
          setCurrentColor={setActivityColor}
          error={validationError}
        />
      </DialogContent>
      <DialogActions className={classes.DialogActions}>
        <Button className={classes.CancelButton} onClick={() => close(false)}>
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          className={classes.SubmitButton}
          onClick={() => onSubmit()}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActivityModal;
