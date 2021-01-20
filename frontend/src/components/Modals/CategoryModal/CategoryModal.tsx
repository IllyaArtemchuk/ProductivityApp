import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import { GithubPicker } from "react-color";
import { selectionColors } from "../../../styles/styles";
import { CategoryModalStyles } from "./Styles";
import CreateTextField from "../CreateTextField";

const CategoryModal: FC = () => {
  const classes = CategoryModalStyles();

  const [newCategory, setNewCategory] = useState("");
  const [newActivity, setNewActivity] = useState("");
  const [categoryColor, setCategoryColor] = useState("#1f1f1f");
  const [activityColor, setActivityColor] = useState("#1f1f1f");
  return (
    <Dialog open={true} maxWidth="xs" className={classes.Container}>
      <DialogTitle id="form-dialog-title" className={classes.ModalTitle}>
        Create A New Category
      </DialogTitle>
      <DialogContent>
        <CreateTextField
          textValue={newCategory}
          setTextValue={setNewCategory}
          currentColor={categoryColor}
          setCurrentColor={setCategoryColor}
        />
        <DialogContentText className={classes.DialogContentText}>
          Create First Activity:
        </DialogContentText>
        <TextField
          autoFocus
          id="activity"
          label="Activity"
          onChange={(e) => setNewActivity(e.target.value)}
          value={newActivity}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary">Cancel</Button>
        <Button color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryModal;
