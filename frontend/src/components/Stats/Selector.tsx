import { FC, Dispatch, SetStateAction } from "react";
import { Select, MenuItem } from "@material-ui/core";
import { offsetEnum, offsetArray } from "./Interfaces";
import { CustomTimeSelectorStyles, SelectorStyles } from "./Styles";
import TimeSelector from "../TimeSelector/TimeSelector";

interface IProps {
  timeOffset: number;
  setTimeOffset: Dispatch<SetStateAction<number>>;
  offsetType: offsetEnum;
  setOffsetType: Dispatch<SetStateAction<offsetEnum>>;
}

const Selector: FC<IProps> = ({
  timeOffset,
  setTimeOffset,
  offsetType,
  setOffsetType,
}) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOffsetType(event.target.value as number);
  };

  const renderSelection = () => {
    return offsetArray.map((type, ind) => (
      <MenuItem key={ind} value={ind}>
        {type}
      </MenuItem>
    ));
  };

  const classes = SelectorStyles();
  return (
    <div className={classes.Container}>
      <TimeSelector
        timeSelected={timeOffset}
        setTimeSelected={setTimeOffset}
        offsetType={offsetType}
        styles={CustomTimeSelectorStyles}
        customStyleProps={{ offsetType: offsetType }}
      />
      <Select
        value={offsetType}
        onChange={handleChange}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        }}
        className={classes.Select}
      >
        {renderSelection()}
      </Select>
    </div>
  );
};

export default Selector;
