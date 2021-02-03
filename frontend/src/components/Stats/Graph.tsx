import { useState, FC } from "react";
import { GraphData } from "./Interfaces";
import { VictoryPie } from "victory";
import { PrimaryColors } from "../../styles/styles";

interface IProps {
  displayedActions: GraphData[];
}

const Graph: FC<IProps> = ({ displayedActions }) => {
  return (
    <VictoryPie
      data={displayedActions}
      innerRadius={100}
      padAngle={2}
      width={600}
      style={{
        data: {
          fill: ({ datum }) => datum.categoryColor,
        },
      }}
      x="category"
      events={[
        {
          target: "data",
          eventHandlers: {
            onMouseOver: () => {
              return [
                {
                  target: "data",
                  mutation: (props) => {
                    return {
                      style: Object.assign({}, props.style, {
                        fill: PrimaryColors.Base,
                      }),
                    };
                  },
                },
                {
                  target: "label",
                  mutation: (props) => {
                    return {
                      style: Object.assign({}, props.style, {
                        fill: PrimaryColors.Light,
                      }),
                    };
                  },
                },
              ];
            },
            onMouseOut: () => {
              return [
                {
                  target: "data",
                  mutation: () => {
                    return null;
                  },
                },
              ];
            },
            onClick: () => {
              return [
                {
                  target: "data",
                  mutation: ({ style }) => {
                    return style.fill === "#c43a31"
                      ? null
                      : { style: { fill: "#c43a31" } };
                  },
                },
                {
                  target: "labels",
                  mutation: ({ text }) => {
                    return text === "clicked" ? null : { text: "clicked" };
                  },
                },
              ];
            },
          },
        },
      ]}
    />
  );
};

export default Graph;
