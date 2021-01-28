import { useState, useEffect, FC } from "react";
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";
import { ActionTableStyles } from "./Styles";
import { User } from "../../interfaces/UserTypes";
import ActionTableRow from "./ActionTableRow";
import { IAction } from "./Interfaces";

interface IProps {
  userData: User;
}

const ActionTable: FC<IProps> = ({ userData }) => {
  const classes = ActionTableStyles();
  const [actions, setActions] = useState<IAction[]>([]);
  useEffect(() => {
    if (userData) {
      let actionsArray: IAction[] = [];
      userData.categories.forEach((cat) => {
        cat.activities.forEach((act) => {
          act.actions.forEach((action) => {
            actionsArray.push({
              category: cat.category_name,
              categoryColor: cat.color,
              activity: act.title,
              activityColor: act.color,
              timeStarted: action.timeStarted,
              timeEnded: action.timeEnded,
              minutes: action.minutes,
            });
          });
        });
      });
      actionsArray.sort(
        (a, b) => parseInt(b.timeEnded) - parseInt(a.timeEnded)
      );
      setActions(actionsArray);
    }
  }, [userData]);
  return (
    <TableContainer
      component={Paper}
      elevation={2}
      className={classes.TableContainer}
    >
      <Table>
        {actions.length ? (
          <TableBody>
            {actions.map((action, ind) => (
              <ActionTableRow key={ind} action={action} />
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell align="center">Nothing Completed Today...</TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default ActionTable;
