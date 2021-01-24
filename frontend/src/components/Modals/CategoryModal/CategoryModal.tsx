import { FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { CategoryModalStyles } from "./Styles";
import CreateTextField from "../CreateTextField";
import { CategoryRef } from "../../Tracker/Interfaces";

interface IProps {
  categories: Array<CategoryRef>;
  open: boolean;
  close: Dispatch<SetStateAction<boolean>>;
}

const CategoryModal: FC<IProps> = ({ categories, open, close }) => {
  const classes = CategoryModalStyles();

  const [newCategory, setNewCategory] = useState("");
  const [newActivity, setNewActivity] = useState("");
  const [categoryValidationError, setCategoryValidationError] = useState("");
  const [activityValidationError, setActivityValidationError] = useState("");
  const [categoryColor, setCategoryColor] = useState("#0058e6");
  const [activityColor, setActivityColor] = useState("#0058e6");

  useEffect(() => {
    if (newCategory.length > 0 && newCategory.length <= 20) {
      setCategoryValidationError("");
    }
    if (newActivity.length > 0 && newActivity.length <= 20) {
      setActivityValidationError("");
    }
  }, [newCategory, newActivity]);

  const onSubmit = () => {
    // Validate Input
    let category = newCategory.trim();
    let activity = newActivity.trim();
    if (
      activity.length > 20 ||
      category.length > 20 ||
      category.length === 0 ||
      activity.length === 0
    ) {
      if (activity.length > 20) {
        setActivityValidationError("Maximum Character limit is 20");
      } else if (activity.length === 0) {
        setActivityValidationError("Activity can't be blank");
      }
      if (category.length > 20) {
        setCategoryValidationError("Maximum Character limit is 20");
      } else if (category.length === 0) {
        setCategoryValidationError("Category can't be blank");
      }
      return;
    }
    for (let cat of categories) {
      if (cat.category_name === category) {
        setCategoryValidationError("Category Already Exists");
        return;
      }
    }
    setCategoryValidationError("All good!");
    return;
  };

  return (
    <Dialog open={open} maxWidth="xs" className={classes.Container}>
      <DialogTitle id="form-dialog-title" className={classes.ModalTitle}>
        Create A New Category
      </DialogTitle>
      <DialogContent className={classes.DialogContent}>
        <CreateTextField
          textValue={newCategory}
          autoFocus={true}
          error={categoryValidationError}
          setTextValue={setNewCategory}
          currentColor={categoryColor}
          setCurrentColor={setCategoryColor}
          type="category"
        />
        <DialogContentText className={classes.DialogContentText}>
          Create First Activity:
        </DialogContentText>
        <CreateTextField
          textValue={newActivity}
          error={activityValidationError}
          setTextValue={setNewActivity}
          currentColor={activityColor}
          setCurrentColor={setActivityColor}
          type="activity"
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
          onClick={onSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryModal;
