import { FC, useState } from "react";
import { Typography, Menu, IconButton, MenuItem } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { useHistory } from "react-router-dom";
import { generateBackendURL } from "../../helpers";
import { LoggedInStyles } from "./Styles";
interface Props {
  username: string;
}

const LoggedIn: FC<Props> = ({ username }) => {
  const classes = LoggedInStyles();
  const [anchorEl, setAnchorEl] = useState<
    null | (EventTarget & HTMLButtonElement)
  >(null);
  const history = useHistory();
  return (
    <>
      <Typography
        variant="h5"
        className={classes.TrackerLink}
        onClick={() => history.push("/tracker")}
      >
        Tracker
      </Typography>
      <Typography
        variant="h5"
        className={classes.MyStatsLink}
        onClick={() => history.push("/stats")}
      >
        My Stats
      </Typography>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="medium">
        <PersonIcon className={classes.SignedInIcon} />
      </IconButton>
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MenuItem disabled>Hello, {username.split(" ")[0]}</MenuItem>
        <MenuItem href={generateBackendURL("/api/logout")}>Sign Out</MenuItem>
      </Menu>
      {/* <Typography variant="h5" className={classes.Username}>
        Hello, {username}
      </Typography>
      <Button
        variant="contained"
        className={classes.Button}
        size="large"
        href={generateBackendURL("/api/logout")}
      >
        Sign Out
      </Button> */}
    </>
  );
};

export default LoggedIn;
