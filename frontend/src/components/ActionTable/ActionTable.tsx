import { useState, useEffect, FC } from "react";
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Paper,
} from "@material-ui/core";
import { ActionTableStyles } from "./Styles";
import { User } from "../../interfaces/UserTypes";

interface IProps {
  userData: User;
}

interface IAction {
  category: string;
  activity: string;
  timeStarted: string;
  timeEnded: string;
  minutes: number;
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
              activity: act.title,
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
        <TableHead>
          <TableRow>
            <TableCell>Category/Activity</TableCell>
            <TableCell>Minutes</TableCell>
            <TableCell align="right">Started</TableCell>
            <TableCell align="right">Ended</TableCell>
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActionTable;
