import { useState, FC } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import dayjs from "dayjs";
import { IAction } from "./Interfaces";
import { ActionTableRowStyles } from "./Styles";

interface IProps {
  action: IAction;
}

const ActionTableRow: FC<IProps> = ({ action }) => {
  const [hovered, setHovered] = useState(false);
  const classes = ActionTableRowStyles({
    categoryColor: action.categoryColor,
    activityColor: action.activityColor,
  });
  return (
    <TableRow
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <TableCell align="left">
        <span className={classes.category}>{action.category}</span>/
        <span className={classes.activity}>{action.activity}</span>
      </TableCell>
      <TableCell align="left">{action.minutes} m</TableCell>
      <TableCell align="right">
        {dayjs(parseInt(action.timeStarted) * 1000).format("h:mA")} -{" "}
        {dayjs(parseInt(action.timeEnded) * 1000).format("h:mA")}
      </TableCell>
      <TableCell align="right">
        {hovered ? (
          <span className={classes.deletion}>X</span>
        ) : (
          <span style={{ marginLeft: 9 }}></span>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ActionTableRow;
