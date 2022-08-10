import React from 'react';
import '../../App';
import '../main/Home';
import './CardHome';
import '../../App.css';
import masculino from '../../css/img/masculino.svg';

const CardUserHome = ({ user }) => {
  const {
    imagen = masculino,
    nombre,
    nombreRol,
    id,
    numeroAspirantes = 0,
    cantidadInscritos = 0,
    cantidadProspectos = 0,
  } = user;
  return (
    <div className="h-full px-5 my-4 py-4 mx-4 cardUserHome items-start justify-start">
      <img
        src={imagen !== null ? imagen : masculino}
        width="45%"
        className="mx-auto text-center m-2 rounded-full"
        alt="user"
      />
      <div className="mx-auto">
        <div className="text-basic-gray mx-auto w-full p-2 pb-0 mt-0 text-center">
          <span className="font-semibold text-lg spanInfoCard">{nombre}</span>
        </div>
        <div className="text-basic-gray mx-auto text-center w-full p-2 pt-0 mt-0">
          <span className="relative font-light text-base mt-3 spanInfoCard">
            {nombreRol}
          </span>
        </div>
        <div className="text-normalPurple mx-auto text-center w-full p-2 mt-0">
          <span className="text-lg mt-3 font-bold numProspectos spanInfoCard">
            {`${cantidadProspectos + cantidadInscritos} Datos`}
          </span>
        </div>
        <div className="text-normalPurple mx-auto text-center w-full p-2 mt-0">
          <span className="text-lg mt-3 font-bold numProspectos spanInfoCard">
            {`${cantidadInscritos} Inscritos`}
          </span>
        </div>
      </div>
    </div>
  );
};

CardUserHome.propTypes = {};

export default CardUserHome;
