import { FC } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
const Landing: FC = () => {
  return (
    <div>
      <Link to="/tracker">
        <Button>Hello!!!</Button>
      </Link>
    </div>
  );
};

export default Landing;
