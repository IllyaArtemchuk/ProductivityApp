import { FC } from "react";
import { Button } from "@material-ui/core";
import { User } from "../interfaces/UserTypes";
import { useMutation } from "@apollo/client";
import { CREATE_ACTION } from "../graphql/createNewAction";
import dayjs from "dayjs";

interface IProps {
  currentUser: User | null;
}
const GeneratorButton: FC<IProps> = ({ currentUser }) => {
  const [createAction] = useMutation(CREATE_ACTION);
  const generateStuff = () => {
    const offsetHours = 1;
    const offsetMinutes = 1;
    const category_name = "Relaxing";
    const activity_name = "Netflix";
    const minutes = 60;
    const manipulatedDate = dayjs()
      .set("month", 0)
      .set("hour", 20)
      .set("minute", 20);
    console.log(manipulatedDate);
    for (let i = 0; i <= 15; i++) {
      console.log("looping", i);
      let unixStart = manipulatedDate.set("day", i).unix() * 1000;
      let unixEnd =
        manipulatedDate
          .set("day", i)
          .add(offsetHours, "hour")
          .add(offsetMinutes, "minute")
          .unix() * 1000;
      createAction({
        variables: {
          userID: currentUser?.id,
          timeStarted: unixStart.toString(),
          timeEnded: unixEnd.toString(),
          minutes: minutes,
          categoryName: category_name,
          activityTitle: activity_name,
        },
      });
    }
  };
  return <Button onClick={() => generateStuff()}>Generate!</Button>;
};

export default GeneratorButton;
