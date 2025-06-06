export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const EDIT = "EDIT";

export const add = () => ({ type: ADD });
export const remove = () => ({ type: REMOVE });
export const edit = (index: number, widget: AllWidgetButtonProps) => {
  const payload = { index, widget };
  return {
    type: EDIT,
    payload: payload,
  };
};
