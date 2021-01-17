import { FC, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import CurrentDisplay from "./CurrentDisplay";
import { CURRENT_USER } from "../../graphql/getCurrentUser";
import { MainLayoutStyles } from "./Styles";
import ActivitySelector from "./ActivitySelector";
import { Category, Activity } from "../../interfaces/UserTypes";
import { ICurrentlySelected } from "./Interfaces";

const defaultCurrentlySelected: ICurrentlySelected = {
  category: "",
  categoryColor: "",
  activity: "",
  activityColor: "",
};

const Tracker: FC = () => {
  const { data, loading, error } = useQuery(CURRENT_USER);
  const [
    currentlySelected,
    setCurrentlySelected,
  ] = useState<ICurrentlySelected>(defaultCurrentlySelected);
  const [minutes, setMinutes] = useState(0);
  useEffect(() => {
    if (loading || error) {
      setCurrentlySelected(defaultCurrentlySelected);
    } else {
      let categoryColor = "";
      let activityColor = "";
      const currentCategory: Category = data.currentUser.categories.find(
        ({ category_name }: Category) =>
          category_name === data.currentUser.currentAction.category
      );
      if (currentCategory) {
        categoryColor = currentCategory.color;
        const currentActivity:
          | Activity
          | undefined = currentCategory.activities.find(
          ({ title }: Activity) =>
            title === data.currentUser.currentAction.activity
        );
        if (currentActivity) {
          activityColor = currentActivity.color;
        }
      }
      setCurrentlySelected((prevCurrentlySelected) => ({
        ...prevCurrentlySelected,
        category: data.currentUser.currentAction.category,
        activity: data.currentUser.currentAction.activity,
        categoryColor: categoryColor,
        activityColor: activityColor,
      }));
    }
  }, [loading, error, data]);
  // Update color of category when category changes
  useEffect(() => {
    const currentCategory: Category = data.currentUser.categories.find(
      ({ category_name }: Category) =>
        category_name === currentlySelected.category
    );
    if (currentCategory) {
      setCurrentlySelected((prevCurrentlySelected) => ({
        ...prevCurrentlySelected,
        categoryColor: currentCategory.color,
      }));
    }
  }, [currentlySelected.category, data]);
  // Update color of activity when activity changes
  useEffect(() => {
    const currentCategory: Category = data.currentUser.categories.find(
      ({ category_name }: Category) =>
        category_name === currentlySelected.category
    );
    let currentActivity: Activity | undefined = undefined;
    if (currentCategory) {
      currentActivity = currentCategory.activities.find(
        ({ title }: Activity) => title === currentlySelected.activity
      );
    }
    if (currentActivity) {
      setCurrentlySelected((prevCurrentlySelected) => ({
        ...prevCurrentlySelected,
        categoryColor: currentCategory.color,
      }));
    }
  }, [currentlySelected.activity, currentlySelected.category, data]);
  const classes = MainLayoutStyles();
  console.log("rerender", loading, error, data);
  return (
    <Grid container>
      <Grid item xs={12}>
        <CurrentDisplay />
        <div className={classes.ActivitySelector}>
          <ActivitySelector
            currentlySelected={currentlySelected}
            setCurrentlySelected={setCurrentlySelected}
            categories={data ? data.currentUser.categories : []}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default Tracker;
