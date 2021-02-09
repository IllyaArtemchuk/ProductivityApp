import { FC, Dispatch, SetStateAction } from "react";
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import { ActionTableStyles } from "./Styles";
import { User } from "../../interfaces/UserTypes";
import ActionTableRow from "./ActionTableRow";
import { IAction } from "./Interfaces";

interface IProps {
  userData: User;
  actions: IAction[];
  setActions: Dispatch<SetStateAction<IAction[]>>;
  setVisibleActions: Dispatch<SetStateAction<IAction[]>>;
}

const ActionTable: FC<IProps> = ({
  userData,
  actions,
  setActions,
  setVisibleActions,
}) => {
  const renderTableRows = () => {
    if (userData) {
      return (
        <TableBody>
          {actions.map((action, ind) => (
            <ActionTableRow
              key={ind}
              action={action}
              userID={userData.id}
              actions={actions}
              setVisibleActions={setVisibleActions}
            />
          ))}
        </TableBody>
      );
    } else {
      return (
        <TableBody>
          <TableRow>
            <TableCell align="center" className={classes.BlankTable}>
              <CircularProgress />
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }
  };
  const classes = ActionTableStyles();
  return (
    <TableContainer
      component={Paper}
      elevation={2}
      className={classes.TableContainer}
    >
      <Table>
        {actions.length ? (
          renderTableRows()
        ) : (
          <TableBody>
            <TableRow>
              <TableCell align="center" className={classes.BlankTable}>
                Nothing Completed Today...
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default ActionTable;
