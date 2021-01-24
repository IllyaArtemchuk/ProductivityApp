import { makeStyles } from "@material-ui/core/styles";
import { PrimaryColors, NeutralColors } from "../../../styles/styles";

export const CategoryModalStyles = makeStyles({
  ModalTitle: {
    color: PrimaryColors.Dark,
  },
  CategoryTextField: {
    width: 200,
    textAlign: "center",
  },
  DialogContentText: {
    marginTop: 10,
  },
  DialogContent: {
    height: 340,
  },
  Container: {
    height: 1000,
  },
  DialogActions: {
    marginTop: -15,
  },
  SubmitButton: {
    color: NeutralColors.White,
    backgroundColor: PrimaryColors.Light,
  },
  CancelButton: {
    color: NeutralColors.Normal,
  },
});
