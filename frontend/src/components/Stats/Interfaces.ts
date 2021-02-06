export type OffsetType = "day" | "week" | "month";
export enum offsetEnum {
  "day",
  "week",
  "month",
}

export interface IActivities {
  minutes: number;
  activity: string;
  activityColor: string;
}

export interface GraphData {
  category: string;
  categoryColor: string;
  minutes: number;
  activities: IActivities;
}

export interface Statistic {
  Stat: string;
  Value: string | number;
}

export const offsetArray: OffsetType[] = ["day", "week", "month"];
