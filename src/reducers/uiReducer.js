import { types } from '../types/types';

const initialState = {
  modalLoadingOpen: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiOpenLoadingModal:
      return {
        ...state,
        modalLoadingOpen: true,
      };
    case types.uiCloseLoadingModal:
      return {
        ...state,
        modalLoadingOpen: false,
      };
    default:
      return state;
  }
};
