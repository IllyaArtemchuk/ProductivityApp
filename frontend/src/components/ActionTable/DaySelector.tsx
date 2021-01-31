import { Typography, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { FC } from "react";
import { DaySelectorStyles } from "./Styles";

const DaySelector: FC = () => {
  const classes = DaySelectorStyles();
  return (
    <div className={classes.container}>
      <IconButton>
        <ArrowBackIosIcon />
      </IconButton>
      <Typography className={classes.currentDay}>Today</Typography>
      <IconButton>
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
};

export default DaySelector;
