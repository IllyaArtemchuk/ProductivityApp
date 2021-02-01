import { makeStyles } from "@material-ui/core/styles";
import { AccentColors, NeutralColors, FontWeight } from "../../styles/styles";

export const ActionTableStyles = makeStyles({
  tableContainer: {
    marginTop: 50,
    maxWidth: 900,
    minWidth: 400,
    margin: "auto",
  },
  blankTable: {
    color: NeutralColors.Light,
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
  slash: {
    color: NeutralColors.Light,
  },
});
