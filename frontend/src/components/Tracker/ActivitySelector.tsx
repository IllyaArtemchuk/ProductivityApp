import { FC, SetStateAction, Dispatch } from "react";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  Box,
} from "@material-ui/core";
import { ActivitySelectorStyles } from "./Styles";

interface Category {
  category_name: string;
  color: string;
}

interface IProps {
  category: string;
  activity: string;
  setCategory: Dispatch<SetStateAction<string>>;
  setActivity: Dispatch<SetStateAction<string>>;
  categories: Array<Category>;
}

const ActivitySelector: FC<IProps> = ({
  category,
  activity,
  setCategory,
  setActivity,
  categories,
}) => {
  const classes = ActivitySelectorStyles();

  const generateCategoryOptions = () => {
    return categories.map((cat, ind) => {
      return (
        <option key={ind} value={cat.category_name} className={classes.option}>
          {cat.category_name}
        </option>
      );
    });
  };
  return (
    <Box
      className={classes.container}
      display="flex"
      flexDirection="row"
      flexWrap="nowrap"
    >
      <Typography className={classes.typography}>
        I'm <span className={classes.emphasized}>Focusing</span> on
      </Typography>
      <FormControl className={classes.formControl}>
        <Select
          className={classes.select}
          native
          inputProps={{
            name: "category",
            id: "category",
          }}
        >
          {generateCategoryOptions()}
          <option>New Category + </option>
        </Select>
      </FormControl>
      <Typography className={classes.typography}>
        By <span className={classes.emphasized}>Doing</span>
      </Typography>
      <FormControl className={classes.formControl}>
        <Select
          className={classes.select}
          native
          inputProps={{
            name: "category",
            id: "category",
          }}
        >
          {generateCategoryOptions()}
          <option>New Category + </option>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ActivitySelector;
