import { FC } from "react";
import { Button, Typography, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SaveIcon from "@material-ui/icons/Save";
import PieChartIcon from "@material-ui/icons/PieChart";
import AssessmentIcon from "@material-ui/icons/Assessment";
import HighlightIcon from "@material-ui/icons/Highlight";
import { LandingPageStyles } from "./Styles";

const Landing: FC = () => {
  const classes = LandingPageStyles();
  return (
    <Grid container className={classes.Container}>
      <Grid item xs={12}>
        <Typography variant="h2">
          Track your time, focus on what matters.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.Feature}>
          Choose your Focus:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" className={classes.BulletPoint}>
          <AssignmentLateIcon className={classes.InLineIcon} />
          Choose an activity you want to focus on.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h4" className={classes.Feature}>
          Track Your Time:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" className={classes.BulletPoint}>
          <AccessTimeIcon />
          Track your time spent on each activity.
        </Typography>
        <Typography variant="body1" className={classes.BulletPoint}>
          <SaveIcon />
          Progress is always saved.
        </Typography>
        <Typography variant="subtitle2" className={classes.Subtitle}>
          Unfinished activities progress is stored server-side
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.Feature}>
          See Your Stats:
        </Typography>
        <Typography variant="body1" className={classes.BulletPoint}>
          <PieChartIcon />
          Get visual data of how you spend your time.
        </Typography>
        <Typography variant="body1" className={classes.BulletPoint}>
          <AssessmentIcon />
          Measure your time on each activity by day/week/month.
        </Typography>
        <Typography variant="body1" className={classes.BulletPoint}>
          <HighlightIcon />
          Highlight specific categories to see what actions you focus on most.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Landing;
