import { types } from '../types/types';

export const catalogosReducer = (state = [], action) => {
  switch (action.type) {
    case types.catalogsSet:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
