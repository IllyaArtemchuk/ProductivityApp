import { FC } from "react";
import useEventListener from "@use-it/event-listener";

interface IProps {
  startCurrentAction: () => "Error Getting User Data" | undefined;
  pauseCurrentAction: () => void;
  seconds: number;
  isRunning: boolean;
  start: any;
}

const KeyPressHandler: FC<IProps> = ({
  startCurrentAction,
  pauseCurrentAction,
  seconds,
  isRunning,
  start,
}) => {
  const SPACE_KEYS = ["32", " "];
  const handler = ({ key }: any) => {
    if (SPACE_KEYS.includes(String(key))) {
      if (seconds === 0 && isRunning) {
        startCurrentAction();
        return;
      }
      if (isRunning) {
        pauseCurrentAction();
        return;
      } else {
        start();
        return;
      }
    }
  };
  useEventListener("keydown", handler);
  return <span></span>;
};

export default KeyPressHandler;
