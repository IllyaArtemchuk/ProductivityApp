import { FC, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import CurrentDisplay from "./CurrentDisplay";
import { CURRENT_USER } from "../../graphql/getCurrentUser";
import { MainLayoutStyles } from "./Styles";
import ActivitySelector from "./ActivitySelector";
import { Category, Activity } from "../../interfaces/UserTypes";

const Tracker: FC = () => {
  const { data, loading, error } = useQuery(CURRENT_USER);
  const [category, setCategory] = useState("");
  const [activity, setActivity] = useState("");
  const [activities, setActivities] = useState<[] | Activity[]>([]);
  const [minutes, setMinutes] = useState(0);
  useEffect(() => {
    if (loading || error) {
      setCategory("");
      setActivity("");
    } else {
      setCategory(data.currentUser.currentAction.category);
      setActivity(data.currentUser.currentAction.activity);
    }
  }, [loading, error, data]);
  useEffect(() => {
    if (data) {
      const currentCategory: Category = data.currentUser.categories.find(
        ({ category_name }: Category) => category_name === category
      );
      setActivities(currentCategory.activities);
    }
  }, [category, data]);
  const classes = MainLayoutStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <CurrentDisplay />
        <div className={classes.ActivitySelector}>
          <ActivitySelector
            category={category}
            activity={activity}
            categories={data ? data.currentUser.categories : []}
            setCategory={setCategory}
            setActivity={setActivity}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default Tracker;
