import { FC } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { StartButtonStyles } from "./Styles";
import { ICurrentlySelected } from "./Interfaces";

interface IProps {
  currentlySelected: ICurrentlySelected;
  onClick: any;
}

const StartButton: FC<IProps> = ({ currentlySelected, onClick }) => {
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
    <Tooltip
      title={isDisabled() ? "Choose something to focus on!" : ""}
      classes={{
        tooltip: classes.ToolTip,
      }}
    >
      <span>
        <IconButton
          className={classes.TimerControl}
          disabled={isDisabled()}
          onClick={onClick}
          onKeyPress={onClick}
        >
          <PlayArrowIcon className={classes.ControlButton} />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default StartButton;
