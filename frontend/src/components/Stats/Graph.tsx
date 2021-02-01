import { FC } from "react";
import { IAction } from "../ActionTable/Interfaces";
import { RadialChart } from "react-vis";

interface IProps {
  displayedActions: IAction[];
}

const Graph: FC<IProps> = ({ displayedActions }) => {
  return <RadialChart />;
};

export default Graph;
