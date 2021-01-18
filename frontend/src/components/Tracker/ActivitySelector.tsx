import { FC, SetStateAction, Dispatch } from "react";
import { Typography, Box } from "@material-ui/core";
import { ActivitySelectorStyles } from "./Styles";
import { ICurrentlySelected, CategoryRef } from "./Interfaces";
import Dropdown from "./Dropdown";

interface IProps {
  currentlySelected: ICurrentlySelected;
  setCurrentlySelected: Dispatch<SetStateAction<ICurrentlySelected>>;
  categories: Array<CategoryRef>;
}

const ActivitySelector: FC<IProps> = ({
  currentlySelected,
  setCurrentlySelected,
  categories,
}) => {
  const classes = ActivitySelectorStyles();

  console.log(currentlySelected);
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
      <Dropdown
        selectedColor={currentlySelected.categoryColor}
        currentlySelected={currentlySelected}
        setCurrentlySelected={setCurrentlySelected}
        categories={categories}
        type="category"
      />
      <Typography className={classes.typography}>
        By <span className={classes.emphasized}>Doing</span>
      </Typography>
      <Dropdown
        selectedColor={currentlySelected.activityColor}
        currentlySelected={currentlySelected}
        setCurrentlySelected={setCurrentlySelected}
        type="activity"
      />
    </Box>
  );
};

export default ActivitySelector;
