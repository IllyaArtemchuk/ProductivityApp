import { FC, SetStateAction, Dispatch } from "react";
import { Typography, Box, LinearProgress } from "@material-ui/core";
import { ActivitySelectorStyles } from "./Styles";
import { ICurrentlySelected, CategoryRef } from "./Interfaces";
import Dropdown from "./Dropdown";

interface IProps {
  currentlySelected: ICurrentlySelected;
  setCurrentlySelected: Dispatch<SetStateAction<ICurrentlySelected>>;
  categories: Array<CategoryRef>;
  openCategoryModal: Dispatch<SetStateAction<boolean>>;
  openActivityModal: Dispatch<SetStateAction<boolean>>;
  loadingSubmission: boolean;
}

const ActivitySelector: FC<IProps> = ({
  currentlySelected,
  setCurrentlySelected,
  categories,
  openCategoryModal,
  openActivityModal,
  loadingSubmission,
}) => {
  const classes = ActivitySelectorStyles();
  if (loadingSubmission) {
    return <LinearProgress className={classes.loadingBar} />;
  }
  return (
    <Box className={classes.container} display="flex" flexDirection="row">
      <Typography className={classes.typography}>
        I'm <span className={classes.emphasized}>Focusing</span> on
      </Typography>
      <Dropdown
        selectedColor={currentlySelected.categoryColor}
        currentlySelected={currentlySelected}
        openModal={openCategoryModal}
        setCurrentlySelected={setCurrentlySelected}
        categories={categories}
        type="category"
      />
      {currentlySelected.category !== "" ? (
        <>
          <Typography className={classes.typography}>
            By <span className={classes.emphasized}>Doing</span>
          </Typography>
          <Dropdown
            selectedColor={currentlySelected.activityColor}
            openModal={openActivityModal}
            currentlySelected={currentlySelected}
            setCurrentlySelected={setCurrentlySelected}
            type="activity"
          />
        </>
      ) : null}
    </Box>
  );
};

export default ActivitySelector;
