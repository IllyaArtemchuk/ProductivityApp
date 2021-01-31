import { FC, Dispatch, SetStateAction } from "react";
import { Typography, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { DaySelectorStyles } from "./Styles";
import dayjs from "dayjs";

interface IProps {
  daySelected: number;
  setDaySelected: Dispatch<SetStateAction<number>>;
}

const DaySelector: FC<IProps> = ({ daySelected, setDaySelected }) => {
  const classes = DaySelectorStyles();
  return (
    <div className={classes.container}>
      <IconButton
        onClick={() => setDaySelected((prevDaySelected) => prevDaySelected + 1)}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Typography className={classes.currentDay}>
        {daySelected === 0
          ? "Today"
          : dayjs().subtract(daySelected, "day").format("MMM DD")}
      </Typography>
      <IconButton
        disabled={daySelected === 0}
        onClick={() => setDaySelected((prevDaySelected) => prevDaySelected - 1)}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
};

export default DaySelector;
