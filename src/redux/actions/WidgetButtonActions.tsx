export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const EDIT = "EDIT";
export const CHANGE_GRID_SIZE = "CHANGE_GRID_SIZE";

export type EditType = (
  index: number,
  widget: AllWidgetButtonProps
) => {
  type: string;
  payload: { index: number; widget: AllWidgetButtonProps };
};

export type ChangeGridSizeType = (
  width: number,
  height: number
) => { type: string; payload: { width: number; height: number } };

export const add = () => ({ type: ADD });
export const remove = () => ({ type: REMOVE });
export const edit: EditType = (index, widget) => {
  const payload = { index, widget };
  return {
    type: EDIT,
    payload: payload,
  };
};

export const change_grid_size: ChangeGridSizeType = (width, height) => ({
  type: CHANGE_GRID_SIZE,
  payload: {
    width,
    height,
  },
});
