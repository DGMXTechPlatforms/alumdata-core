import { types } from '../../types/types';

export const setCurrentUsuarios = (usuarios) => {
  return {
    type: types.usuariosSet,
    payload: usuarios,
  };
};
