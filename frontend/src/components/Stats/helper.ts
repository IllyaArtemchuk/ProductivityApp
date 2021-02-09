export const timeFormatter = (minutes: number): string => {
  if (minutes >= 60) {
    return `${Math.trunc(minutes / 60)} hrs ${minutes % 60} min`;
  }
  return `${minutes} min`;
};
