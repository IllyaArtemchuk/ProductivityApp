import { useState, useEffect, FC, Dispatch, SetStateAction } from "react";
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
  actions: IAction[];
  setActions: Dispatch<SetStateAction<IAction[]>>;
}

const ActionTable: FC<IProps> = ({ userData, actions, setActions }) => {
  const classes = ActionTableStyles();
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
              <ActionTableRow
                key={ind}
                action={action}
                userID={userData.id}
                actions={actions}
                setActions={setActions}
              />
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
