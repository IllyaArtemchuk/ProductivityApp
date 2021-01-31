import { Dayjs } from "dayjs";

export interface IAction {
  id: string;
  category: string;
  categoryColor: string;
  activity: string;
  activityColor: string;
  timeStarted: string;
  timeEnded: string;
  timeQuery: Dayjs;
  minutes: number;
}
