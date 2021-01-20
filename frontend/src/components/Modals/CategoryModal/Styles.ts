import { makeStyles } from "@material-ui/core/styles";
import { PrimaryColors } from "../../../styles/styles";

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
  Container: {
    height: 1000,
  },
});
