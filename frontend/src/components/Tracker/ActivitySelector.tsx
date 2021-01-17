import { FC, SetStateAction, Dispatch } from "react";
import { Typography, FormControl, Select, Box } from "@material-ui/core";
import { ActivitySelectorStyles } from "./Styles";
import { ICurrentlySelected } from "./Interfaces";
import DropdownOption from "./DropdownOption";

interface Category {
  category_name: string;
  color: string;
}

interface IProps {
  currentlySelected: ICurrentlySelected;
  setCurrentlySelected: Dispatch<SetStateAction<ICurrentlySelected>>;
  categories: Array<Category>;
}

const ActivitySelector: FC<IProps> = ({
  currentlySelected,
  setCurrentlySelected,
  categories,
}) => {
  const classes = ActivitySelectorStyles();

  const generateCategoryOptions = () => {
    return categories.map((cat, ind) => {
      return (
        <DropdownOption
          key={ind}
          dropdownName={cat.category_name}
          color={cat.color}
          setCurrentlySelected={setCurrentlySelected}
          type="category"
        />
      );
    });
  };

  const handleCategoryChange = (value: string) => {
    setCurrentlySelected((prevCurrentlySelected) => ({
      ...prevCurrentlySelected,
      category: value,
    }));
  };
  console.log(currentlySelected);
  return (
    <Box
      className={classes.container}
      display="flex"
      flexDirection="row"
      flexWrap="nowrap"
    >
      <Typography className={classes.typography}>
        I'm <span className={classes.emphasized}>Focusing</span> on
      </Typography>
      <FormControl className={classes.formControl}>
        <Select
          className={classes.select}
          native
          value={currentlySelected.category}
          onChange={(event) =>
            handleCategoryChange(event.target.value as string)
          }
          inputProps={{
            name: "category",
            id: "category",
          }}
        >
          {generateCategoryOptions()}
          <option>New Category + </option>
        </Select>
      </FormControl>
      <Typography className={classes.typography}>
        By <span className={classes.emphasized}>Doing</span>
      </Typography>
      <FormControl className={classes.formControl}>
        <Select
          className={classes.select}
          native
          inputProps={{
            name: "category",
            id: "category",
          }}
        >
          {generateCategoryOptions()}
          <option>New Category + </option>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ActivitySelector;
