import React, { Component } from 'react';
import '../../App';
import '../main/Home';
import './CardHome';
import './Avfemenino';
import '../../App.css';
import cardIcon from '../../css/img/cardIcon.svg';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

const today = moment();

const CardHomeBack = ({ user, estilos, onHover, auth }) => {
  const history = useHistory();
  const { nombre, apellido_paterno, apellido_materno, id, createdAt } = user;

  return (
    <div className="h-full px-5 my-4 py-6 mx-4 cardHomeBack items-start justify-start">
      <img src={cardIcon} width="45%" className="mx-auto text-center m-2" />
      <div className="flex flex-col mx-auto">
        <div className="text-white mx-auto text-center w-full px-2 py-1 mt-4">
          <span className="font-bold text-lg spanInfoCard">
            {[nombre, apellido_paterno, apellido_materno].join(' ')}
          </span>
        </div>
        <div className="text-smartDark mx-auto text-center w-full px-2 py-1 mt-2">
          <span className="font-light text-sm mt-4 spanInfoCard">
            Ciclo escolar: 2022-2
          </span>
        </div>
        <div className="text-smartDark mx-auto text-center w-full px-2 py-1 mt-2">
          <span className="font-light text-sm mt-4 spanInfoCard">
            {today.diff(moment(createdAt), 'days')} días
          </span>
        </div>
        {auth.id_rol !== 1 && (
          <div
            className="text-smartDark mx-auto text-center w-full px-2 py-1 mt-2"
            onClick={() => {
              history.push('/prospectDetails/' + id);
            }}
          >
            <span className="font-bold text-base mt-6 spanInfoCard">
              Ver detalle
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default connect((state) => ({ auth: state.auth }))(CardHomeBack);
