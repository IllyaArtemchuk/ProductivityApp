import { FC, SetStateAction, Dispatch, useEffect } from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import { ICurrentlySelected } from "./Interfaces";
import { CategoryRef, ActivityRef } from "./Interfaces";
import { DropdownStyles } from "./Styles";

interface IProps {
  selectedColor: string;
  currentlySelected: ICurrentlySelected;
  setCurrentlySelected: Dispatch<SetStateAction<ICurrentlySelected>>;
  openModal: Dispatch<SetStateAction<boolean>>;
  categories?: Array<CategoryRef>;
  type: "activity" | "category";
}

const Dropdown: FC<IProps> = ({
  selectedColor,
  currentlySelected,
  setCurrentlySelected,
  categories,
  openModal,
  type,
}) => {
  useEffect(() => {
    if (type === "activity") {
      setCurrentlySelected((prevCurrentlySelected) => ({
        ...prevCurrentlySelected,
        activity: "",
      }));
    }
  }, [currentlySelected.category, type, setCurrentlySelected]);

  useEffect(() => {
    if (type === "category") {
      if (currentlySelected.category === "New+") {
        setCurrentlySelected((prevCurrentlySelected) => ({
          ...prevCurrentlySelected,
          category: "",
          activity: "",
        }));
      }
    } else {
      if (currentlySelected.activity === "New+") {
        setCurrentlySelected((prevCurrentlySelected) => ({
          ...prevCurrentlySelected,
          activity: "",
        }));
      }
    }
  }, [
    currentlySelected.category,
    currentlySelected.activity,
    type,
    setCurrentlySelected,
  ]);
  const styleProps = { color: selectedColor };
  const classes = DropdownStyles(styleProps);

  const handleCategoryChange = (value: string, type: string) => {
    if (type === "category") {
      setCurrentlySelected((prevCurrentlySelected) => ({
        ...prevCurrentlySelected,
        category: value,
      }));
    } else {
      setCurrentlySelected((prevCurrentlySelected) => ({
        ...prevCurrentlySelected,
        activity: value,
      }));
    }
  };

  const generateCategoryOptions = (categories: CategoryRef[] | undefined) => {
    if (categories === undefined) {
      return <MenuItem>Error</MenuItem>;
    }
    return categories.map((category) => {
      return (
        <MenuItem
          key={category.category_name}
          value={category.category_name}
          style={{ color: category.color }}
          className={classes.option}
        >
          {category.category_name}
        </MenuItem>
      );
    });
  };

  const generateActivityOptions = (activities: ActivityRef[]) => {
    return activities.map((activity) => {
      return (
        <MenuItem
          key={activity.title}
          value={activity.title}
          style={{ color: activity.color }}
          className={classes.option}
        >
          {activity.title}
        </MenuItem>
      );
    });
  };

  const chooseClassName = () => {
    if (type === "category" && currentlySelected.category === "")
      return classes.placeHolder;
    if (type === "activity" && currentlySelected.activity === "")
      return classes.placeHolder;
    return classes.select;
  };

  return (
    <FormControl className={classes.formControl}>
      <Select
        className={chooseClassName()}
        value={
          type === "category"
            ? currentlySelected.category
            : currentlySelected.activity
        }
        displayEmpty
        onChange={(event) =>
          handleCategoryChange(event.target.value as string, type)
        }
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        }}
      >
        <MenuItem value="" disabled className={classes.option}>
          Choose One
        </MenuItem>
        {type === "category"
          ? generateCategoryOptions(categories)
          : generateActivityOptions(currentlySelected.activities)}
        <MenuItem
          value="New+"
          className={classes.option}
          onClick={() => openModal(true)}
        >
          New +
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default Dropdown;
