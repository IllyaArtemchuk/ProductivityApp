import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { CategoryModalStyles } from "./Styles";

const CategoryModal: FC = () => {
  const classes = CategoryModalStyles();
  const [page, setPage] = useState<1 | 2>(1);
  const [newCategory, setNewCategory] = useState("");
  return (
    <Dialog open={true} maxWidth="xs">
      <DialogTitle id="form-dialog-title" className={classes.ModalTitle}>
        Create A New Category
      </DialogTitle>
      <div>
        <TextField
          autoFocus
          id="category"
          label="Category"
          value={newCategory}
          variant="outlined"
          className={classes.CategoryTextField}
        />
      </div>
    </Dialog>
  );
};

export default CategoryModal;
