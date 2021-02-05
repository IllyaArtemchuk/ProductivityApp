import { FC, Dispatch, SetStateAction } from "react";
import { GraphData, IActivities } from "./Interfaces";
import { VictoryPie, VictoryTooltip } from "victory";
import { FontSize, NeutralColors, PrimaryColors } from "../../styles/styles";

interface IProps {
  graphData: GraphData[];
  currentlySelectedCategory: string;
  setCurrentlySelectedCategory: Dispatch<SetStateAction<string>>;
}

const Graph: FC<IProps> = ({
  graphData,
  currentlySelectedCategory,
  setCurrentlySelectedCategory,
}) => {
  const findCategoryData = (): IActivities[] => {
    if (graphData[0] && graphData[0].category === "Nothing here...") {
      return [
        {
          minutes: 1,
          activity: "Nothing here...",
          activityColor: NeutralColors.Light,
        },
      ];
    }
    const categoryData = graphData.find(
      (item) => item.category === currentlySelectedCategory
    );
    if (categoryData === undefined) {
      return [
        {
          minutes: 1,
          activity: "Select a category",
          activityColor: NeutralColors.Lightest,
        },
      ];
    } else {
      return Object.values(categoryData.activities);
    }
  };

  const generateLabel = (activity: string, min: number): string => {
    if (activity === "Nothing here..." || activity === "Select a category") {
      return activity;
    }
    return `${activity}: ${min} min`;
  };
  return (
    <div>
      <div>
        <VictoryPie
          data={graphData}
          innerRadius={100}
          padAngle={2}
          width={700}
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
              stroke: ({ datum }) =>
                datum.category === currentlySelectedCategory
                  ? PrimaryColors.Dark
                  : datum.categoryColor,
              strokeWidth: ({ datum }) =>
                datum.category === currentlySelectedCategory ? 3 : 0,
            },
            labels: {
              fontFamily: "Roboto",
            },
          }}
          x={(d: GraphData) => generateLabel(d.category, d.minutes)}
          y={(d: GraphData) => d.minutes}
          animate={{
            duration: 500,
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
                //@ts-ignore
                onClick: (event: any, data: any) => {
                  if (data.datum.category !== "Nothing here...") {
                    setCurrentlySelectedCategory(data.datum.category);
                  }
                },
              },
            },
          ]}
        />
      </div>
      <VictoryPie
        data={findCategoryData()}
        innerRadius={100}
        padAngle={2}
        width={700}
        labelComponent={
          <VictoryTooltip
            pointerLength={0}
            style={{
              backgroundColor: "white",
              fontFamily: "Roboto",
              fill: ({ datum }: any) => datum.activityColor,
              fontSize: FontSize.size16,
            }}
            flyoutStyle={{
              backgroundColor: "white",
              stroke: ({ datum }: any) => datum.activityColor,
              fill: "white",
              strokeWidth: 1,
            }}
          />
        }
        style={{
          data: {
            fill: ({ datum }) => datum.activityColor,
          },
          labels: {
            fontFamily: "Roboto",
          },
        }}
        x={(d: IActivities) => generateLabel(d.activity, d.minutes)}
        y={(d: IActivities) => d.minutes}
        animate={{
          duration: 500,
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
    </div>
  );
};

export default Graph;
