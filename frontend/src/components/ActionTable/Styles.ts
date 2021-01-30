import { makeStyles } from "@material-ui/core/styles";
import { PrimaryColors, AccentColors, FontWeight } from "../../styles/styles";

export const ActionTableStyles = makeStyles({
  TableContainer: {
    marginTop: 50,
    maxWidth: 600,
    minWidth: 300,
    margin: "auto",
  },
});

interface IActionTableRowProps {
  categoryColor: string;
  activityColor: string;
}
export const ActionTableRowStyles = makeStyles({
  deletion: {
    "&:hover": {
      color: AccentColors.Red,
    },
    marginTop: -5,
    marginBottom: -5,
    marginRight: -11,
    marginLeft: 10,
  },
  category: {
    color: (props: IActionTableRowProps) => props.categoryColor,
    fontWeight: FontWeight.heavy,
  },
  activity: {
    color: (props: IActionTableRowProps) => props.activityColor,
    fontWeight: FontWeight.heavy,
  },
});
