export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const EDIT = "EDIT";
export const CHANGE_GRID_SIZE = "CHANGE_GRID_SIZE";

export type AddType = (
  widget: AllWidgetButtonProps
) => {
  type: string;
  payload: {
    widget: AllWidgetButtonProps;
  };
};

export type RemoveType = (
  index: number
) => {
  type: string;
  payload: { index: number };
};

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

export const add: AddType = (widget) => ({
  type: ADD,
  payload: { widget: widget },
});

export const remove: RemoveType = (index) => ({
  type: REMOVE,
  payload: {
    index: index,
  },
});

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
