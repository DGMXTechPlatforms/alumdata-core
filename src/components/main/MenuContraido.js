import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import '../../App.css';
import '../../App';
import Badge from '@mui/material/Badge';
import Notifications from '../ui/Notifications';
import editUser from '../../css/img/edit.svg';
import notification from '../../css/img/notification.svg';
import iconoMenu from '../../css/img/menuPrincipal.svg';
import cerrarSesion from '../../css/img/cerrarSesion.svg';
import { useSelector } from 'react-redux';

export const MenuContraido = (props) => {
  const {
    onClickMenu,
    pageTitle,
    menuItems,
    onClickNotifications,
    notificationsOpen,
  } = props;
  const { aspirantes } = useSelector((state) => state);
  const history = useHistory();
  const { userImg, name, username, id_rol } = useSelector((state) => {
    return state.auth;
  });

  return (
    <div className="container mx-auto">
      <div className="cssHeader">
        <div className="w-screen">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <span className="text-white text-center mx-auto text-lg">
              {pageTitle}
              <div className="absolute right-0 top-2 w-1/3 float-right grid grid-cols-2">
                <div className="containerTopActions absolute right-10">
                  <div className="relative float-left mr-2 cursor-pointer">
                    {id_rol !== 2 && id_rol !== 1 && (
                      <Badge
                        badgeContent={6}
                        color="error"
                        overlap="circular"
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                      >
                        <img
                          onClick={onClickNotifications}
                          className="w-10"
                          src={notification}
                          alt="notificaciones"
                        />
                      </Badge>
                    )}
                  </div>
                  <Notifications
                    aspirantes={aspirantes}
                    isVisible={notificationsOpen}
                  />
                  <img
                    className="w-10 relative float-left mr-10 rounded-full userImgMini"
                    src={userImg}
                    alt="aspirantes"
                  />
                  <span className="text-white relative float-left ml-2 text-sm mt-0 pr-10 pb-1 pl-1 spanNameHeader">
                    {name}
                  </span>
                  <img
                    onClick={() => {
                      history.push('/account');
                    }}
                    width="15"
                    className="absolute right-1 mt-1 cursor-pointer"
                    src={editUser}
                    alt="cuenta"
                  />
                  <br />
                  <span
                    style={{ marginTop: '-15px' }}
                    className="text-white relative float-right ml-2 text-sm -mt-15 pr-0 pb-1 pl-1 spanNameUser"
                  >
                    {username}
                  </span>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
      {/*
        <img src={goBack} 
          className="top-2 absolute p-2 rounded-full left-20 cursor-pointer" width="50"/>
*/}
      <div className="sideBarMenu fixed bg-white w-16 h-screen">
        <div
          onClick={onClickMenu}
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

        {menuItems.map((item) => {
          const { route = '/', img } = item;
          return (
            <Link key={route} to={route}>
              <div
                className={
                  img.src === cerrarSesion
                    ? 'opcionCloseMenu rounded-lg bg-menu-square w-10 h-10 mx-auto my-3'
                    : 'opcionMenu rounded-lg bg-menu-square w-10 h-10 relative flex flex-column flex-wrap mx-auto my-3'
                }
              >
                <img className="mx-auto" {...img} alt={img.title} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

MenuContraido.propTypes = {
  pageTitle: PropTypes.string,
};

export default MenuContraido;
