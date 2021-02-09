import { makeStyles } from "@material-ui/core/styles";
import { AccentColors, NeutralColors, FontWeight } from "../../styles/styles";

export const ActionTableStyles = makeStyles({
  TableContainer: {
    marginTop: 50,
    maxWidth: 900,
    minWidth: 400,
    margin: "auto",
  },
  BlankTable: {
    color: NeutralColors.Light,
  },
});

interface IActionTableRowProps {
  categoryColor: string;
  activityColor: string;
}
export const ActionTableRowStyles = makeStyles({
  Deletion: {
    "&:hover": {
      color: AccentColors.Red,
    },
    marginTop: -5,
    marginBottom: -5,
    marginRight: -11,
    marginLeft: 10,
  },
  Category: {
    color: (props: IActionTableRowProps) => props.categoryColor,
    fontWeight: FontWeight.heavy,
  },
  Activity: {
    color: (props: IActionTableRowProps) => props.activityColor,
    fontWeight: FontWeight.heavy,
  },
  Slash: {
    color: NeutralColors.Light,
  },
});
