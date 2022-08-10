import '../../css/style/Login.css';

import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { startLogin } from '../../actions/auth';
import { useDispatch } from 'react-redux';

import ContRecuperarPass from '../modales/ContRecuperarPass';
import Modal from '../modales/ModalContenidoMitad';

export const Login = () => {
  const [isOpenModalPass, setOpenModalPass] = useState(false);

  const onAceptModal = () => {
    setOpenModalPass(false);
  };

  const onCancelModal = () => {
    setOpenModalPass(false);
  };

  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    //email:'administrador@dgmx.com',
    //username:'dgadmin@dgmx.com',
    username: 'dgpro2@dgmx.com',
    password: '123456',
  });

  const { username, password } = formLoginValues;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!(await dispatch(startLogin(username, password)))) return;
  };

  return (
    <div className="cssLoginContainer">
      <div className="cssLoginIzq"></div>
      <div className="cssLoginDer">
        <div className="cssLoginText m-4 mt-14 p-3 font-sans mx-auto text-center">
          <h1 className="text-smartDark text-lg">Bienvenido de nuevo</h1>
          <br />
          <h2 className="text-basic-gray text-base">Inicia sesión</h2>
        </div>
        <div className="cssLogoSmartEd"></div>
        <div className="my-1 mx-auto">
          <form className="mx-16 p-2" onSubmit={handleLogin}>
            <input type="hidden" name="remember" value="true"></input>
            <div className="rounded-md flex flex-column flex-wrap basis-3">
              <div className="mx-auto my-4 w-3/4 h-16">
                <label className="sr-only">Email</label>
                <span className="iconInputs">
                  <svg
                    className="h-5 w-5 text-basic-gray group-hover:text-basic-gray"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 25 25"
                    fill="currentColor"
                  >
                    <path
                      fill="#aaa"
                      d="M9.69,9.73C7.33,6.51,7.26,3.81,9.26,2a4.9,4.9,0,0,1,6.58,0c2,1.84,2,4.59-.32,7.65,5.25,1.47,4.76,6.24,5.57,10.13.18.85-.91,2.49-1.82,2.94a14.8,14.8,0,0,1-13.42.08A2.9,2.9,0,0,1,4.1,18.86,21.54,21.54,0,0,0,4.65,16C5.19,13.09,6.12,10.46,9.69,9.73Z"
                      fillRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  name="username"
                  value={username}
                  onChange={handleLoginInputChange}
                  id="username"
                  type="text"
                  required
                  autoComplete="off"
                  className="font-sans bg-transparent text-lg appearance-none relative block w-full px-10 py-3 border border-borders-gray placeholder-gray-400 text-gray-800 rounded-full focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base"
                  placeholder="Usuario"
                ></input>
              </div>
              <div className="mx-auto my-4 w-3/4 h-16">
                <label className="sr-only">Contraseña</label>
                <span className="iconInputs">
                  <svg
                    className="h-5 w-5 text-basic-gray group-hover:text-basic-gray"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 25 25"
                    fill="currentColor"
                  >
                    <path
                      fill="#aaa"
                      d="M20.42,11.11H19V8a6.45,6.45,0,0,0-6.28-6.46h-.41A6.56,6.56,0,0,0,6,8.05v3.11H4.58c-.15,0-.38.29-.38.74V22.72c0,.46.27.74.38.74H20.42c.15,0,.38-.29.38-.74V11.85C20.8,11.39,20.53,11.11,20.42,11.11Zm-6.64,5.94-.09.09v3.42a.4.4,0,0,1-.38.37H11.74a.4.4,0,0,1-.29-.12.41.41,0,0,1-.11-.28V17.11l-.07-.06a1.59,1.59,0,0,1-.5-1.2,1.64,1.64,0,0,1,1.55-1.64h.4a1.64,1.64,0,0,1,1.55,1.67,1.6,1.6,0,0,1-.49,1.18Zm3.11-6.83H8.16V8A4.32,4.32,0,0,1,10.3,4.13a4.4,4.4,0,0,1,4.46,0A4.29,4.29,0,0,1,16.89,8Z"
                      fillRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  name="password"
                  value={password}
                  onChange={handleLoginInputChange}
                  id="password"
                  type="password"
                  autoComplete="off"
                  required
                  className="font-sans bg-transparent text-lg appearance-none relative block w-full px-10 py-3 border border-borders-gray placeholder-gray-400 text-gray-800 rounded-full focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10 sm:text-base"
                  placeholder="Contraseña"
                ></input>
              </div>
              <div className="mx-auto my-4 w-3/4 h-16">
                <label className="sr-only">Iniciar sesión</label>

                <button
                  type="submit"
                  className="font-sans text-lg appearance-none relative block w-full px-8 py-3 border border-transparent text-white bg-smartPurple rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-smartPurple hover:bg-cyan-700 sm:text-base"
                >
                  Iniciar sesión
                </button>
              </div>
              <div className="text-base m-auto w-3/4 text-center my-4">
                <button className="font-medium text-smartDark opacity-80 hover:text-smartDark hover:opacity-100">
                  ¿Olvidaste tu contraseña?
                  <span className="absolute px-2 py-0">
                    <svg
                      className="h-5 w-5 text-smartDark group-hover:text-smartDark"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 25 25"
                      fill="currentColor"
                    >
                      <path d="M15.81,11.29H15V9.55a3.56,3.56,0,0,0-3.48-3.62h-.22a3.66,3.66,0,0,0-3.5,3.65v1.74H7.05c-.08,0-.21.16-.21.41v6.05c0,.26.15.42.21.42h8.76c.08,0,.21-.16.21-.42V11.7C16,11.45,15.87,11.29,15.81,11.29ZM12.14,14.6l-.05.06v1.9a.22.22,0,0,1-.21.21H11a.22.22,0,0,1-.2-.21v-1.9l-.06-.06a.94.94,0,0,1,0-1.33,1,1,0,0,1,.59-.26h.22a.93.93,0,0,1,.86,1,.89.89,0,0,1-.26.58Zm1.72-3.83H9V9.55a2.42,2.42,0,0,1,4.84,0Z" />
                      <path
                        d="M19.74,11.92a8.23,8.23,0,0,0-.65-2.67,8.11,8.11,0,0,0-6.25-5A8.13,8.13,0,0,0,4.43,7.92a7.85,7.85,0,0,0-.36,8.47,8,8,0,0,0,7.47,4.41,8.57,8.57,0,0,0,4.6-1.42,1.58,1.58,0,0,1,.9-.24,1,1,0,0,1,1,.74,1.2,1.2,0,0,1-.47,1.27,9.56,9.56,0,0,1-3.24,1.53,10.39,10.39,0,0,1-7.86-.85,10.25,10.25,0,0,1-5.27-6.77A10,10,0,0,1,2.62,6.63,10.31,10.31,0,0,1,10.28,2,10.2,10.2,0,0,1,18.66,4.8a10.11,10.11,0,0,1,3.1,5.67c.07.39.13.77.17,1.15s.13.34.38.33a9.69,9.69,0,0,1,1.32,0,.74.74,0,0,1,.55.26.67.67,0,0,1-.12.56c-.83.91-1.66,1.78-2.5,2.68a.84.84,0,0,1-1.19,0l0,0c-.46-.39-.87-.9-1.31-1.35s-.83-.87-1.21-1.32a2.2,2.2,0,0,1-.26-.61,2.48,2.48,0,0,1,.64-.24C18.7,11.9,19.2,11.92,19.74,11.92Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
        <Modal
          onClickAccept={onAceptModal}
          onClickCancel={onCancelModal}
          closeModal={() => {
            setOpenModalPass(false);
          }}
          open={isOpenModalPass}
          contenido={<ContRecuperarPass />}
        />
      </div>
    </div>
  );
};
