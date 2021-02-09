import { useState, FC } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import dayjs from "dayjs";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { IAction } from "./Interfaces";
import { ActionTableRowStyles } from "./Styles";
import { DELETE_ACTION } from "../../graphql/deleteAction";
import { CURRENT_USER } from "../../graphql/getCurrentUser";

interface IProps {
  action: IAction;
  userID: string;
  actions: IAction[];
  setVisibleActions: React.Dispatch<React.SetStateAction<IAction[]>>;
}

const ActionTableRow: FC<IProps> = ({
  action,
  userID,
  actions,
  setVisibleActions,
}) => {
  const [hovered, setHovered] = useState(false);
  const [handleDelete, { loading }] = useMutation(DELETE_ACTION, {
    refetchQueries: [{ query: CURRENT_USER }],
  });
  const classes = ActionTableRowStyles({
    categoryColor: action.categoryColor,
    activityColor: action.activityColor,
  });

  const onDelete = () => {
    handleDelete({
      variables: {
        actionID: action.id,
        userID: userID,
        categoryName: action.category,
        activityTitle: action.activity,
      },
    }).then(() => {
      setVisibleActions(actions.filter((item) => item.id !== action.id));
    });
  };

  const renderDeleteButton = () => {
    if (loading) {
      return (
        <CircularProgress
          color="secondary"
          className={classes.Deletion}
          size={20}
        />
      );
    } else {
      if (action.id !== "1") {
        return (
          <IconButton
            aria-label="delete"
            className={classes.Deletion}
            size="small"
            onClick={() => onDelete()}
          >
            <HighlightOffIcon fontSize="small" />
          </IconButton>
        );
      }
    }
  };

  const renderNull = () => {
    if (loading) {
      return (
        <CircularProgress
          color="secondary"
          className={classes.Deletion}
          size={20}
        />
      );
    } else {
      return <div style={{ marginLeft: 10, minWidth: 15 }}></div>;
    }
  };

  return (
    <TableRow
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <TableCell align="left">
        <span className={classes.Category}>{action.category}</span>
        <span className={classes.Slash}>/</span>
        <span className={classes.Activity}>{action.activity}</span>
      </TableCell>
      <TableCell align="right">{action.minutes} m</TableCell>
      <TableCell align="right">
        {dayjs(parseInt(action.timeStarted)).format("h:mmA")} -{" "}
        {dayjs(parseInt(action.timeEnded)).format("h:mmA")}
      </TableCell>
      <TableCell align="right">
        {hovered ? renderDeleteButton() : renderNull()}
      </TableCell>
    </TableRow>
  );
};

export default ActionTableRow;
