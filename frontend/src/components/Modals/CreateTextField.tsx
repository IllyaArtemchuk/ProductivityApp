import { FC, useState, Dispatch, SetStateAction } from "react";
import { TextField } from "@material-ui/core";
import { GithubPicker } from "react-color";
import { selectionColors } from "../../styles/styles";
import { CreateTextFieldStyles } from "./Styles";
import OutsideClickHandler from "react-outside-click-handler";

interface IProps {
  textValue: string;
  setTextValue: Dispatch<SetStateAction<string>>;
  currentColor: string;
  setCurrentColor: Dispatch<SetStateAction<string>>;
}

const CreateTextField: FC<IProps> = ({
  textValue,
  setTextValue,
  currentColor,
  setCurrentColor,
}) => {
  const [isFocused, setFocused] = useState(false);
  const StyleProps = { color: currentColor };
  const classes = CreateTextFieldStyles(StyleProps);

  return (
    <>
      <OutsideClickHandler onOutsideClick={() => setFocused(false)}>
        <div className={classes.TextWrapper} onClick={() => setFocused(true)}>
          <TextField
            autoFocus
            id="category"
            label="Category"
            onChange={(e) => setTextValue(e.target.value)}
            value={textValue}
            variant="outlined"
            className={classes.InputField}
          />
        </div>
      </OutsideClickHandler>
      {isFocused ? (
        <GithubPicker
          colors={selectionColors}
          color={currentColor}
          onChange={(color) => setCurrentColor(color.hex)}
          width="200px"
        />
      ) : null}
    </>
  );
};

export default CreateTextField;
