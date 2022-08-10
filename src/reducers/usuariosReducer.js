import { types } from '../types/types';

const INITIAL_STATE = [];

export const usuariosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.usuariosSet:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
