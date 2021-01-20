import { FC, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import CurrentDisplay from "./CurrentDisplay";
import { CURRENT_USER } from "../../graphql/getCurrentUser";
import { MainLayoutStyles } from "./Styles";
import ActivitySelector from "./ActivitySelector";
import { Category, Activity } from "../../interfaces/UserTypes";
import { ICurrentlySelected, ActivityRef } from "./Interfaces";
import CategoryModal from "../Modals/CategoryModal/CategoryModal";

const defaultCurrentlySelected: ICurrentlySelected = {
  category: "",
  categoryColor: "",
  activities: [],
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
  // Update color of category and the available activities array when category changes
  useEffect(() => {
    if (data) {
      const currentCategory: Category = data.currentUser.categories.find(
        ({ category_name }: Category) =>
          category_name === currentlySelected.category
      );
      let ActivitiesArray: ActivityRef[] = [];

      if (currentCategory) {
        currentCategory.activities.forEach((activity) => {
          ActivitiesArray.push({
            title: activity.title,
            color: activity.color,
          });
        });
        setCurrentlySelected((prevCurrentlySelected) => ({
          ...prevCurrentlySelected,
          categoryColor: currentCategory.color,
          activities: ActivitiesArray,
        }));
      }
    }
  }, [currentlySelected.category, data]);
  // Update color of activity when activity changes
  useEffect(() => {
    console.log("my time has come.");
    if (data) {
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
        const FoundActivity: Activity = currentActivity;
        setCurrentlySelected((prevCurrentlySelected) => ({
          ...prevCurrentlySelected,
          activityColor: FoundActivity.color,
        }));
      }
    }
  }, [currentlySelected.activity, currentlySelected.category, data]);
  const classes = MainLayoutStyles();
  return (
    <Grid container>
      <Grid item xs={undefined} md={2} />
      <Grid item xs={12} md={8}>
        <CategoryModal />
        <CurrentDisplay currentlySelected={currentlySelected} />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}>
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
