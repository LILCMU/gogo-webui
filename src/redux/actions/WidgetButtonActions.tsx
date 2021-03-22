export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const EDIT = "EDIT";
export const CHANGE_GRID_SIZE = "CHANGE_GRID_SIZE";
export const SET_PROJECT = "SET_PROJECT";
export const SET_WIDGET = "SET_WIDGET";

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
  widget: AllWidgetButtonProps,
  new_widget: AllWidgetButtonProps
) => {
  type: string;
  payload: { widget: AllWidgetButtonProps; new_widget: AllWidgetButtonProps };
};

export type ChangeGridSizeType = (
  width: number,
  height: number
) => { type: string; payload: { width: number; height: number } };

export type SetProjectType = (
  project: Project
) => { type: string; payload: Project };

export type SetWidgetType = (
  widgets: Array<AllWidgetButtonProps>
) => { type: string; payload: { widgets: Array<AllWidgetButtonProps> } };

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

export const edit: EditType = (widget, new_widget) => {
  const payload = { widget, new_widget };
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

export const set_project: SetProjectType = (project) => ({
  type: SET_PROJECT,
  payload: project,
});

export const set_widget: SetWidgetType = (widgets) => ({
  type: SET_WIDGET,
  payload: { widgets },
});
