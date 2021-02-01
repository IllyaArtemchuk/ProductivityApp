import { FC, Dispatch, SetStateAction } from "react";
import { IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { TimeSelectorStyles } from "./Styles";
import { offsetArray } from "../Stats/Interfaces";
import dayjs from "dayjs";
import { CustomTimeSelectorProps } from "../Stats/Styles";

interface IProps {
  timeSelected: number;
  setTimeSelected: Dispatch<SetStateAction<number>>;
  offsetType: number;
  styles?: (
    props?: any
  ) => Record<"CurrentTime" | "Container" | "IconButton", string>;
  customStyleProps?: CustomTimeSelectorProps;
}

const TimeSelector: FC<IProps> = ({
  timeSelected,
  setTimeSelected,
  offsetType,
  styles,
  customStyleProps,
}) => {
  const classes = styles ? styles(customStyleProps) : TimeSelectorStyles();

  const renderCurrentTime = () => {
    if (timeSelected === 0) {
      switch (offsetType) {
        case 0:
          return "Today";
        case 1:
          return "This Week";
        case 2:
          return "This Month";
        default:
          return "Recently";
      }
    }
    if (offsetType === 0) {
      return dayjs()
        .subtract(timeSelected, offsetArray[offsetType])
        .format("MMM DD");
    }
    return `${dayjs()
      .subtract(timeSelected, offsetArray[offsetType])
      .format("MMM DD")}-${dayjs()
      .subtract(timeSelected - 1, offsetArray[offsetType])
      .format("MMM DD")}`;
  };

  return (
    <div className={classes.Container}>
      <IconButton
        className={classes.IconButton}
        onClick={() =>
          setTimeSelected((prevTimeSelected) => prevTimeSelected + 1)
        }
      >
        <ArrowBackIosIcon />
      </IconButton>
      <span className={classes.CurrentTime}>{renderCurrentTime()}</span>
      <IconButton
        disabled={timeSelected === 0}
        onClick={() =>
          setTimeSelected((prevTimeSelected) => prevTimeSelected - 1)
        }
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
};

export default TimeSelector;
