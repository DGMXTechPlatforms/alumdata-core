import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';

const initialFetch = async (dispatch, body) => {
  localStorage.setItem('token', body.token);
  localStorage.setItem('token-init-date', new Date().getTime());
  const res = await fetchConToken('catalogos/', null, 'GET');
  const catalogos = await res.json();

  dispatch(
    login({
      id: body.data.user.id,
      name: body.data.user.nombre,
      username: body.data.user.username,
      puesto: body.data.user.puesto,
      fecha_nacimiento: body.data.user.fecha_nacimiento,
      telefono: body.data.user.telefono,
      userImg:
        body.data.user.userImg == null
          ? 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'
          : body.data.user.userImg,
      // "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png", //TODO: replace with right value
      id_rol: body.data.user.id_rol,
    })
  );

  dispatch({
    type: types.catalogsSet,
    payload: catalogos.data,
  });

  const idEmpresa = localStorage.getItem('idempresa');

  if (idEmpresa == '' || idEmpresa == null) {
    if (body.id_rol == 2) {
    } else {
    }
  } else {
  }
};

export const startLogin = (username, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      'auth/login/8d1c5aa98fa46f724acad631f43b3fb514f4fd6e9fed71ca29089d65ea8474f6',
      { username, password },
      'POST'
    );
    const body = await resp.json();
    if (body.status === 'success') {
      await initialFetch(dispatch, body);
      return true;
    } else {
      alert(body.message);
      // Swal.fire('Error',body.msg, 'error')
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken('auth/refresh');
    const body = await resp.json();
    if (body.status === 'success') {
      await initialFetch(dispatch, body);
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    //dispatch(cleanidempresa())
    dispatch(logout());
  };
};

const logout = () => ({
  type: types.authLogout,
});

export const updateProfile = (user) => {
  return (dispatch) => {
    dispatch(login(user));
  };
};
