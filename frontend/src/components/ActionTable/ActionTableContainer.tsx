import dayjs from "dayjs";
import { useEffect, useState, FC, Dispatch, SetStateAction } from "react";
import { User } from "../../interfaces/UserTypes";
import TimeSelector from "../TimeSelector/TimeSelector";
import ActionTable from "./ActionTable";
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
  const [daySelected, setDaySelected] = useState(0);
  const [visibleActions, setVisibleActions] = useState<IAction[]>([]);
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
              timeQuery: dayjs(parseInt(action.timeEnded)),
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

  useEffect(() => {
    setVisibleActions(
      actions.filter((action) =>
        action.timeQuery.isSame(dayjs().subtract(daySelected, "day"), "day")
      )
    );
  }, [daySelected, actions]);
  return (
    <div>
      <TimeSelector
        timeSelected={daySelected}
        setTimeSelected={setDaySelected}
        offsetType={0}
      />
      <ActionTable
        userData={userData}
        actions={visibleActions}
        setActions={setActions}
      />
    </div>
  );
};

export default ActionTableContainer;
