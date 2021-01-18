import { FC } from "react";
import { IconButton } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { StartButtonStyles } from "./Styles";
import { ICurrentlySelected } from "./Interfaces";

interface IProps {
  currentlySelected: ICurrentlySelected;
}

const StartButton: FC<IProps> = ({ currentlySelected }) => {
  const isDisabled = () => {
    if (
      currentlySelected.category !== "" &&
      currentlySelected.activity !== ""
    ) {
      return false;
    }
    return true;
  };
  const styleProps = { disabled: isDisabled() };
  const classes = StartButtonStyles(styleProps);
  return (
    <IconButton className={classes.timerControl} disabled={isDisabled()}>
      <PlayArrowIcon className={classes.controlButton} />
    </IconButton>
  );
};

export default StartButton;
