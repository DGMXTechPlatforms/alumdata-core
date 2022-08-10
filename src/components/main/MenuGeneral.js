import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { MenuContraido } from './MenuContraido';
import MenuExpandido from './MenuExpandido';
import Notify from '../ui/Notify';
import Notifications from '../ui/Notifications';
import {
  iconoHome,
  altaAspirante,
  infoAspirante,
  analiticos,
  reportes,
  configuracion,
  miCuenta,
} from '../../helpers/formIcons';
import cerrarSesion from '../../css/img/cerrarSesion.svg';
import { startLogout } from '../../actions/auth';
import { mapMenuItems } from '../../helpers/utils';
import { toast } from 'react-toastify';

const mapStateToProps = (state) => {
  return {
    id_rol: state.auth?.id_rol || null,
  };
};

const MenuGeneral = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const dispatch = useDispatch();

  const onClickMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const onClickCerrar = () => {
    setMenuOpen(false);
  };

  const onClickNotifications = () => {
    if (!notificationOpen) {
      toast.info('🦄 Nuevo prospecto', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setNotificationOpen(!notificationOpen);
  };

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const menuItems = [
    {
      route: '/home',
      img: {
        src: iconoHome,
        width: '25',
        title: 'Menú principal',
      },
      rolesEnabled: [1, 2, 3, 4],
    },
    {
      route: '/newProspect',
      img: {
        src: altaAspirante,
        width: '30',
        title: 'Alta de aspirante',
      },
      rolesEnabled: [3, 4],
    },
    {
      route: '/prospects',
      img: {
        src: infoAspirante,
        width: '30',
        title: 'Aspirantes',
      },
      rolesEnabled: [2, 4],
    },
    {
      route: '/analytics',
      img: {
        src: analiticos,
        width: '30',
        title: 'Analíticos',
      },
      rolesEnabled: [2, 4],
    },
    {
      route: '/reports',
      img: {
        src: reportes,
        width: '30',
        title: 'Reportes',
      },
      rolesEnabled: [2, 4],
    },
    {
      route: '/config',
      img: {
        src: configuracion,
        width: '30',
        title: 'Configuración',
      },
      rolesEnabled: [1, 2],
    },
    {
      route: '/account',
      img: {
        src: miCuenta,
        width: '30',
        title: 'Mi cuenta',
      },
      rolesEnabled: [1, 2, 3, 4],
    },
  ];

  const mappedMenuItems = mapMenuItems(menuItems, props.id_rol);

  return (
    <>
      <MenuContraido
        onClickMenu={onClickMenu}
        menuItems={[
          ...mappedMenuItems,
          {
            img: {
              src: cerrarSesion,
              width: '25',
              title: 'Cerrar sesión',
              onClick: handleLogout,
            },
          },
        ]}
        pageTitle={props.pageTitle}
        onClickNotifications={onClickNotifications}
        notificationsOpen={notificationOpen}
      />
      <MenuExpandido
        onClickCerrar={onClickCerrar}
        menuItems={mappedMenuItems}
        isVisible={menuOpen}
      />
    </>
  );
};

export default connect(mapStateToProps, [])(MenuGeneral);
