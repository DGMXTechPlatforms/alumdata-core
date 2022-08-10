import { types } from '../../types/types';

export const setCurrentAspirantes = (aspirantes) => {
  return {
    type: types.aspirantesSet,
    payload: aspirantes,
  };
};
