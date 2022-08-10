import React from 'react';
import PropTypes from 'prop-types';
import { editCard, blockCard, deleteCard } from '../../helpers/formIcons';

const CardUser = ({ user, onEdit, onDelete, onLock }) => {
  const { imagen, nombre, nombreRol, id } = user;
  return (
    <div
      className="w-full rounded-lg py-5 my-4"
      style={{
        boxShadow: '2px 2px 5px #d2d2d2',
      }}
    >
      <div className="w-1/3 inline-block align-top">
        <img
          src={
            imagen ||
            'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png'
          }
          className="w-3/4 rounded-full mx-auto"
        />
      </div>
      <div className="w-2/3 inline-block align-top">
        <span className="text-smartDark font-bold text-md block">{nombre}</span>
        <span className="text-sm text-smartDark block">{nombreRol}</span>
        <div className="text-right pr-5 pt-5">
          <a
            onClick={() => {
              onEdit(user);
            }}
          >
            <img
              src={editCard}
              className="w-6 cursor-pointer mx-1 inline-block"
            />
          </a>
          <a
            onClick={() => {
              onLock(user);
            }}
          >
            <img
              src={blockCard}
              className="w-6 cursor-pointer mx-1 inline-block"
            />
          </a>
          <a
            onClick={() => {
              onDelete(user);
            }}
          >
            <img
              src={deleteCard}
              className="w-6 cursor-pointer mx-1 inline-block"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

CardUser.propTypes = {
  user: PropTypes.object.isRequired,
};

export default CardUser;
