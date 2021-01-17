import { FC, SetStateAction, Dispatch } from "react";
import { DropdownOptionStyles } from "./Styles";
import { ICurrentlySelected } from "./Interfaces";
interface IProps {
  dropdownName: string;
  color: string;
  setCurrentlySelected: Dispatch<SetStateAction<ICurrentlySelected>>;
  type: "activity" | "category";
}

const DropdownOption: FC<IProps> = ({
  dropdownName,
  color,
  setCurrentlySelected,
  type,
}) => {
  const styleProps = { color };
  const classes = DropdownOptionStyles(styleProps);
  return (
    <option value={dropdownName} className={classes.option}>
      {dropdownName}
    </option>
  );
};

export default DropdownOption;
