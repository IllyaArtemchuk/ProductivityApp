export type OffsetType = "day" | "week" | "month";
export enum offsetEnum {
  "day",
  "week",
  "month",
}

export interface GraphData {
  x: string;
  category: string;
  color: string;
  categoryColor: string;
  y: number;
}

export const offsetArray: OffsetType[] = ["day", "week", "month"];
