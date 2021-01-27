import { FC, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import CurrentDisplay from "./CurrentDisplay";
import { CURRENT_USER } from "../../graphql/getCurrentUser";
import { MainLayoutStyles } from "./Styles";
import ActivitySelector from "./ActivitySelector";
import { Category, Activity } from "../../interfaces/UserTypes";
import { ICurrentlySelected, ActivityRef, ICurrentAction } from "./Interfaces";
import CategoryModal from "../Modals/CategoryModal/CategoryModal";
import ActivityModal from "../Modals/ActivityModal/ActivityModal";

const defaultCurrentlySelected: ICurrentlySelected = {
  category: "",
  categoryColor: "",
  activities: [],
  activity: "",
  activityColor: "",
};

const defaultCurrentAction: ICurrentAction = {
  category: "",
  activity: "",
  timeStarted: "",
  minutes: 0,
};

const Tracker: FC = () => {
  const { data, loading, error } = useQuery(CURRENT_USER);
  const [
    currentlySelected,
    setCurrentlySelected,
  ] = useState<ICurrentlySelected>(defaultCurrentlySelected);
  const [currentAction, setCurrentAction] = useState(defaultCurrentAction);
  const [loadingSubmission, setLoadingSubmission] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [activityModalOpen, setActivityModalOpen] = useState(false);

  // Update Currently Selected based on server-side data
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
      setSeconds(data.currentUser.currentAction.minutes * 60);
    }
  }, [loading, error, data]);

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
        <CategoryModal
          userID={data ? data.currentUser.id : null}
          categories={data ? data.currentUser.categories : []}
          open={categoryModalOpen}
          close={setCategoryModalOpen}
          setLoading={setLoadingSubmission}
        />
        <ActivityModal
          userID={data ? data.currentUser.id : null}
          setLoading={setLoadingSubmission}
          currentCategory={currentlySelected.category}
          activities={currentlySelected.activities}
          open={activityModalOpen}
          close={setActivityModalOpen}
        />
        <CurrentDisplay
          currentlySelected={currentlySelected}
          currentAction={currentAction}
          seconds={seconds}
          setSeconds={setSeconds}
        />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}>
        <div className={classes.ActivitySelector}>
          <ActivitySelector
            seconds={seconds}
            loadingSubmission={loadingSubmission}
            openCategoryModal={setCategoryModalOpen}
            openActivityModal={setActivityModalOpen}
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
