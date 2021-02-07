import { SettingsRemoteSharp } from "@material-ui/icons";
import { FC, useEffect } from "react";

interface IProps {
  setTime: any;
  seconds: number;
}

const TimeResetter: FC<IProps> = ({ setTime, seconds }) => {
  useEffect(() => {
    if (seconds === 0) {
      setTime(0);
    }
  }, [seconds, setTime]);
  return <span />;
};

export default TimeResetter;
