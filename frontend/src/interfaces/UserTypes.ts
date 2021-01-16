export interface Action {
  timeEnded: string;
  timeStarted: string;
  minutes: number;
  id: string;
}

export interface Activity {
  title: string;
  color: string;
  actions: Action[];
}

export interface Category {
  category_name: string;
  color: string;
  activities: Activity[];
}

export interface CurrentAction {
  timeStarted: string;
  category: string;
  activity: string;
  minutes: number;
}

export interface User {
  id: string;
  username: string;
  currentAction: CurrentAction;
  categories: Category[];
}
