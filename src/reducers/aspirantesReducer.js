import { types } from '../types/types';

const INITIAL_STATE = [];

export const aspirantesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.aspirantesSet:
      return action.payload;
    default:
      return state;
  }
};
