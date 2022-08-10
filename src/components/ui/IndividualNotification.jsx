import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Notify from './Notify';
import '../../App.css';
import '../../App';

export const IndividualNotification = (props) => {
  const notificationsOpen = props.isVisible;
  const history = useHistory();
  const { aspirante, daysDifference } = props;

  return (
    <div
      onClick={() => {
        history.push('/prospectDetails/' + aspirante.id);
      }}
      className="containerIndividualNotification text-basic-gray px-6 text-base mt-4 text-left"
    >
      <span className="notificationTop">
        🦄{' '}
        {`${aspirante.nombre} ${aspirante.apellido_paterno} ${aspirante.apellido_materno}`}{' '}
        <br />
        <span className="text-sm">
          {daysDifference !== 0 ? 'Pendiente por contactar' : 'Llamar hoy'}
        </span>
      </span>
      <br />
      <span className="notificationBottom text-sm">
        {daysDifference !== 0 ? `Hace ${daysDifference} Días` : <b>Hoy</b>}
      </span>
      <br />
    </div>
  );
};

export default IndividualNotification;
