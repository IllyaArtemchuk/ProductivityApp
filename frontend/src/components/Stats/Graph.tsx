import React, { useState, FC } from "react";
import { GraphData } from "./Interfaces";
import { VictoryPie, VictoryTooltip } from "victory";
import { FontSize, PrimaryColors } from "../../styles/styles";

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
      labelComponent={
        <VictoryTooltip
          pointerLength={0}
          style={{
            backgroundColor: "white",
            fontFamily: "Roboto",
            fill: ({ datum }: any) => datum.categoryColor,
            fontSize: FontSize.size16,
          }}
          flyoutStyle={{
            backgroundColor: "white",
            stroke: ({ datum }: any) => datum.categoryColor,
            fill: "white",
            strokeWidth: 1,
          }}
        />
      }
      style={{
        data: {
          fill: ({ datum }) => datum.categoryColor,
        },
        labels: {
          fontFamily: "Roboto",
        },
      }}
      x="category"
      y={(d: GraphData) => d.minutes}
      animate={{
        onLoad: {
          duration: 1000,
        },
      }}
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
                        opacity: 0.7,
                      }),
                    };
                  },
                },
                {
                  target: "labels",
                  mutation: () => ({ active: true }),
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
                {
                  target: "labels",
                  mutation: () => ({ active: undefined }),
                },
              ];
            },
            onFocus: () => ({
              target: "labels",
              mutation: () => ({ active: true }),
            }),
            onBlur: () => ({
              target: "labels",
              mutation: () => ({ active: undefined }),
            }),
          },
        },
      ]}
    />
  );
};

export default Graph;
