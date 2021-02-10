import { FC, cloneElement, ReactElement } from "react";
import { Route, Redirect } from "react-router-dom";
interface IProps {
  component: ReactElement;
  path: string;
  isAuthenticated: {
    id: "string";
    username: "string";
  } | null;
  loading: boolean;
}

const PrivateRoute: FC<IProps> = ({
  component,
  path,
  isAuthenticated,
  loading,
}) => {
  if (!isAuthenticated && !loading) {
    return <Redirect to="/" />;
  }
  return (
    <Route
      exact
      path={path}
      render={(props) => cloneElement(component, { ...props })}
    />
  );
};

export default PrivateRoute;
