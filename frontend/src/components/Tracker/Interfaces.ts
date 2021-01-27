export interface ICurrentlySelected {
  category: string;
  categoryColor: string;
  activities: Array<ActivityRef>;
  activity: string;
  activityColor: string;
}

export interface CategoryRef {
  category_name: string;
  color: string;
}

export interface ActivityRef {
  title: string;
  color: string;
}

export interface ICurrentAction {
  category: string;
  activity: string;
  timeStarted: string;
  minutes: number;
}
