import React from 'react';
import '../../App.css';
import '../../App';
import fotoPerfil from '../../css/img/fotoPerfil.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

const MenuExpandido = (props) => {
  const { onClickCerrar, isVisible, menuItems, user } = props;

  return (
    <div className="container mx-auto">
      <div
        className="cssMenuExpandido bg-menu-color shadow-md w-1/4 h-full p-5 z-10 inset-0 ease-in-out duration-300"
        style={{ left: isVisible ? '4rem' : '-55%' }}
      >
        <span
          onClick={onClickCerrar}
          className="text-basic-gray relative float-right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
        <div className="userMenuContainer mt-6">
          <div className="logoSmartMenu"></div>
          <img
            src={user.userImg || fotoPerfil}
            width="40%"
            className="mx-auto rounded-full"
            alt="user"
          />
          <h2 className="mx-auto mt-3 text-center text-basic-gray font-bold text-lg">
            {user.name}
          </h2>
          <p className="mx-auto mt-1 text-center text-basic-gray font-normal text-base">
            {user.rol}
          </p>
        </div>
        <div className="menuExpand mx-auto my-8 text-smartDark">
          {menuItems.map((item) => {
            const { route = '/', img } = item;
            return (
              <Link key={route} to={route}>
                <div className="elementoMenuExpandido my-3">
                  <img {...img} className="float-left" alt={img.title} />
                  <span className="float-left mx-2 my-0.5">{img.title}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="cssLogoDgmxMenu right-8"></div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(MenuExpandido);
