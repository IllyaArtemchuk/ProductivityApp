import { Typography } from "@material-ui/core";
import { useEffect, FC, Dispatch, SetStateAction } from "react";
import { User } from "../../interfaces/UserTypes";
import ActionTable from "./ActionTable";
import DaySelector from "./DaySelector";
import { IAction } from "./Interfaces";

interface IProps {
  actions: IAction[];
  setActions: Dispatch<SetStateAction<IAction[]>>;
  userData: User;
}

const ActionTableContainer: FC<IProps> = ({
  actions,
  setActions,
  userData,
}) => {
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
              id: action.id,
            });
          });
        });
      });
      actionsArray.sort(
        (a, b) => parseInt(b.timeEnded) - parseInt(a.timeEnded)
      );
      setActions(actionsArray);
    }
  }, [userData, setActions]);

  return (
    <div>
      <ActionTable
        userData={userData}
        actions={actions}
        setActions={setActions}
      />
      <DaySelector />
    </div>
  );
};

export default ActionTableContainer;
