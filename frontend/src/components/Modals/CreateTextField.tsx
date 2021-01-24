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
  error: string;
  autoFocus?: boolean;
  type: "category" | "activity";
}

const CreateTextField: FC<IProps> = ({
  textValue,
  setTextValue,
  currentColor,
  setCurrentColor,
  error,
  autoFocus,
  type,
}) => {
  const [isFocused, setFocused] = useState(autoFocus ? true : false);
  const StyleProps = { color: currentColor };
  const classes = CreateTextFieldStyles(StyleProps);
  const updateTextValue = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.value) {
      let currentChar = e.target.value[e.target.value.length - 1].charCodeAt(0);

      if (
        (currentChar >= 65 && currentChar <= 90) ||
        (currentChar >= 97 && currentChar <= 122) ||
        currentChar === 32
      ) {
        setTextValue(e.target.value);
      }
    }
    setTextValue(e.target.value);
  };
  return (
    <OutsideClickHandler onOutsideClick={() => setFocused(false)}>
      <div className={classes.TextWrapper} onClick={() => setFocused(true)}>
        <TextField
          autoFocus={autoFocus ? true : false}
          error={error === "" ? false : true}
          helperText={error === "" ? null : error}
          id={type}
          label={type === "category" ? "Category" : "Activity"}
          onChange={(e) => updateTextValue(e)}
          value={textValue}
          variant="outlined"
          className={classes.InputField}
        />
      </div>
      {isFocused ? (
        <GithubPicker
          colors={selectionColors}
          className={classes.ColorPicker}
          color={currentColor}
          onChange={(color) => setCurrentColor(color.hex)}
          width="200px"
        />
      ) : null}
    </OutsideClickHandler>
  );
};

export default CreateTextField;
