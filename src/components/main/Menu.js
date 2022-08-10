import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../../App';
import iconoMenu from '../../css/img/menuPrincipal.svg';
import iconoHome from '../../css/img/home.svg';
import altaAspirante from '../../css/img/altaAspirante.svg';
import infoAspirante from '../../css/img/infoAspirante.svg';
import analiticos from '../../css/img/analiticos.svg';
import reportes from '../../css/img/reportes.svg';
import configuracion from '../../css/img/configuracion.svg';
import miCuenta from '../../css/img/miCuenta.svg';
import cerrarSesion from '../../css/img/cerrarSesion.svg';

import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const Menu = ({ abierto, setAbierto }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div className="container mx-auto">
      <div className="cssHeader">
        <div className="w-screen">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <span className="text-white text-center mx-auto text-lg">Home</span>
          </div>
        </div>
      </div>
      <div className="sideBarMenu fixed bg-white w-16 h-screen">
        <div
          onClick={() => setAbierto(!abierto)}
          className="opcionMenu rounded-lg bg-menu-square w-10 h-10 relative flex flex-column flex-wrap mx-auto my-3"
        >
          <img
            className="mx-auto"
            src={iconoMenu}
            width="25"
            alt="Menú principal"
            title="Menú principal"
          />
        </div>
        <Link exact to="/home">
          <div className="opcionMenu rounded-lg bg-menu-square w-10 h-10 relative flex flex-column flex-wrap mx-auto my-3">
            <img
              className="mx-auto"
              src={iconoHome}
              width="25"
              alt="Menú principal"
              title="Menú principal"
            />
          </div>
        </Link>
        <Link exact to="/paso1">
          <div className="opcionMenu rounded-lg bg-menu-square w-10 h-10 relative flex flex-column flex-wrap mx-auto my-3">
            <img
              className="mx-auto"
              src={altaAspirante}
              width="30"
              alt="Alta de aspirante"
              title="Alta de aspirante"
            />
          </div>
        </Link>
        <div className="opcionMenu rounded-lg bg-menu-square w-10 h-10 relative flex flex-column flex-wrap mx-auto my-3">
          <img
            className="mx-auto"
            src={infoAspirante}
            width="30"
            alt="Información de aspirante"
            title="Información de aspirante"
          />
        </div>
        <div className="opcionMenu rounded-lg bg-menu-square w-10 h-10 relative flex flex-column flex-wrap mx-auto my-3">
          <img
            className="mx-auto"
            src={analiticos}
            width="30"
            alt="Analíticos"
            title="Analíticos"
          />
        </div>
        <div className="opcionMenu rounded-lg bg-menu-square w-10 h-10 relative flex flex-column flex-wrap mx-auto my-3">
          <img
            className="mx-auto"
            src={reportes}
            width="30"
            alt="Reportes"
            title="Reportes"
          />
        </div>
        <div className="opcionMenu rounded-lg bg-menu-square w-10 h-10 relative flex flex-column flex-wrap mx-auto my-3">
          <img
            className="mx-auto"
            src={configuracion}
            width="30"
            alt="Configuración"
            title="Configuración"
          />
        </div>
        <div className="opcionMenu rounded-lg bg-menu-square w-10 h-10 relative flex flex-column flex-wrap mx-auto my-3">
          <img
            className="mx-auto"
            src={miCuenta}
            width="30"
            alt="Mi cuenta"
            title="Mi cuenta"
          />
        </div>
        {/* <Link to="../login"> */}
        <div className="opcionCloseMenu rounded-lg bg-menu-square w-10 h-10 mx-auto my-3">
          <img
            onClick={handleLogout}
            className="mx-auto"
            src={cerrarSesion}
            width="25"
            alt="Cerrar sesión"
            title="Cerrar sesión"
          />
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
};
