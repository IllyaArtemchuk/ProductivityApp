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
  row: {},
  deletion: {
    "&:hover": {
      color: AccentColors.Red,
    },
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
