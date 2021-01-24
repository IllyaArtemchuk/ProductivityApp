import { makeStyles } from "@material-ui/core/styles";
import { PrimaryColors, FontWeight, NeutralColors } from "../../styles/styles";

interface TextFieldProps {
  color: string;
}

export const CreateTextFieldStyles = makeStyles({
  InputField: {
    borderColor: (props: TextFieldProps) => props.color,
    color: (props: TextFieldProps) => props.color,
    fontWeight: FontWeight.heavy,
  },
  TextWrapper: {
    "& label.Mui-focused": {
      color: (props: TextFieldProps) => props.color,
      fontWeight: FontWeight.heavy,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: (props: TextFieldProps) => props.color,
      },
      "&:hover fieldset": {
        borderColor: (props: TextFieldProps) => props.color,
      },
      "&.Mui-focused fieldset": {
        borderColor: (props: TextFieldProps) => props.color,
      },
    },
    marginBottom: 72,
  },
  ColorPicker: {
    zIndex: 3,
    marginTop: -72,
    marginLeft: -3,
    marginRight: -3,
  },
});
