import { React, useState } from 'react';
import Notify from './Notify';
import IndividualNotification from './IndividualNotification';
import moment from 'moment';
import '../../App.css';
import '../../App';

export const Notifications = (props) => {
  const notificationsOpen = props.isVisible;
  const { aspirantes } = props;
  const currentDate = moment(new Date());

  const aspirantesSorted = aspirantes.sort((a, b) => {
    return a.fecha_proximo_contacto - b.fecha_proximo_contacto;
  });

  return (
    <div
      className="notificationsContainer"
      style={{ display: notificationsOpen ? 'block' : 'none' }}
    >
      <Notify />
      {aspirantesSorted.reverse().map((a) => {
        if (currentDate.isAfter(a.fecha_proximo_contacto)) {
          return (
            <IndividualNotification
              key={a.id}
              aspirante={a}
              daysDifference={currentDate.diff(
                a.fecha_proximo_contacto,
                'days'
              )}
            />
          );
        }
        return false;
      })}
    </div>
  );
};

export default Notifications;
