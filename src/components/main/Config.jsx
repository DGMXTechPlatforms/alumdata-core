import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuGeneral from './MenuGeneral';
import SmartInput from '../ui/SmartInput';
import { contraseñaMD, emailMD, nombreMD } from '../../helpers/formIcons';
import TitleBlock from '../ui/TitleBlock';
import TitleSection from '../ui/TitleSection';
import SmartButton from '../ui/SmartButton';
import CardUser from '../ui/CardUser';
import { fetchConToken } from '../../helpers/fetch';
import { contextOnBlur, contextOnChange } from '../../helpers/classFormHandler';
import ModalForm from '../modales/ModalForm';
import Modal from '../modales/Modal';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MIN,
  VALIDATOR_REQUIRE,
} from '../../helpers/validators';
import { validateBoolObject } from '../../helpers/utils';
import SmartSelect from '../ui/SmartSelect';
import { connect } from 'react-redux';

class Config extends Component {
  constructor(props) {
    super(props);
    this.pageTitle = 'Configuración';
    this.state = {
      newUser: {
        id_rol: 3,
        estado: 1,
        /*
        nombre: '',
        email: '',
        password: '',
        */
        //meta_inscritos: 0,
      },
      newUserV: {},
      users: [],
      modalOpen: false,
      modalSuccessOpen: false,
      modalDelOpen: false,
      modalDisableOpen: false,
      currentUser: {},
      currentUserV: {},
    };
  }

  onChangeHandler = (e) => {
    contextOnChange(e, this, 'newUser');
  };

  onChangeCurrentHandler = (e) => {
    contextOnChange(e, this, 'currentUser');
  };

  formOnBlur = (e, validators, stateOb) => {
    contextOnBlur(e, validators, this, stateOb);
  };

  createUser = async (e) => {
    e.preventDefault();
    const { newUser, newUserV } = this.state;
    if (validateBoolObject(newUserV)) {
      const res = await (
        await fetchConToken(
          'auth/signup',
          { ...newUser, username: newUser.email, clave: newUser.password },
          'POST'
        )
      ).json();
      if (res.status === 'success') {
        this.setState({ modalSuccessOpen: true, newUser: {} }, this.fetchUsers);
      } else {
        alert('Error: ' + res.msg);
      }
    } else {
      alert('Error: Hay algunos errores en el formulario');
    }
  };

  updateUser = async (e) => {
    e.preventDefault();
    const { currentUser, currentUserV } = this.state;
    if (validateBoolObject(currentUserV)) {
      const res = await (
        await fetchConToken(`user/${currentUser.id}`, currentUser, 'PUT')
      ).json();
      if (res.status === 'success') {
        this.setState({ modalSuccessOpen: true, newUser: {} });
      } else {
        alert('Error: ' + res.msg);
      }
    } else {
      alert('Error: Hay algunos errores en el formulario');
    }
  };

  fetchUsers = async () => {
    const users =
      (await (await fetchConToken('user/', {}, 'GET')).json())?.usuarios || [];

    console.log(users);
    this.setState({ users });
  };

  onDeleteUser = async () => {
    const { currentUser } = this.state;
    const res = await (
      await fetchConToken('auth/delete', currentUser, 'DELETE')
    ).json();
    if (res.ok) {
    } else {
      alert('Error: ' + res.msg);
    }
  };

  onDisableUser = async () => {
    const { currentUser } = this.state;
    const res = await (
      await fetchConToken('auth/block', { id: currentUser.id }, 'DELETE')
    ).json();
    if (res.ok) {
    } else {
      alert('Error: ' + res.msg);
    }
  };

  fetchUser = async () => {};

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    const {
      users,
      newUser,
      newUserV,
      modalOpen,
      modalDelOpen,
      modalDisableOpen,
      modalSuccessOpen,
      currentUser,
      currentUserV,
    } = this.state;
    const { id_rol } = this.props.auth;
    return (
      <div className="container mx-auto">
        <MenuGeneral pageTitle={this.pageTitle} />
        <div className="topRowForm w-3/5 h-3/5 mx-auto relative mt-4 mb-16 place-items-start content-start">
          <TitleBlock text={this.pageTitle} />
          <div className="grid grid-cols-2 w-full">
            <div className="grid w-full px-10">
              <TitleSection title="Nuevo usuario" />
              <form onSubmit={this.createUser}>
                <SmartInput
                  title="Nombre"
                  name="nombre"
                  imageSrc={nombreMD}
                  isRequired={true}
                  onChange={this.onChangeHandler}
                  onBlur={(e) => {
                    this.formOnBlur(e, [VALIDATOR_REQUIRE()], 'newUserV');
                  }}
                  placeholder="Jhon Doe"
                  value={newUser.nombre}
                  isValid={newUserV.nombre}
                />
                <SmartInput
                  title="Correo"
                  name="email"
                  imageSrc={emailMD}
                  isRequired={true}
                  placeholder="jhondoe@email.com"
                  onChange={this.onChangeHandler}
                  onBlur={(e) => {
                    this.formOnBlur(
                      e,
                      [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()],
                      'newUserV'
                    );
                  }}
                  type="email"
                  value={newUser.email}
                  isValid={newUserV.email}
                />
                <SmartInput
                  title="Contraseña"
                  name="password"
                  imageSrc={contraseñaMD}
                  isRequired={true}
                  placeholder="*****"
                  onChange={this.onChangeHandler}
                  onBlur={(e) => {
                    this.formOnBlur(e, [VALIDATOR_REQUIRE()], 'newUserV');
                  }}
                  type="password"
                  value={newUser.password}
                  isValid={newUserV.password}
                />
                {parseInt(id_rol) === 1 && (
                  <SmartSelect
                    title="Rol"
                    name="id_rol"
                    imageSrc={contraseñaMD}
                    isRequired={true}
                    onChange={this.onChangeHandler}
                    value={newUser.id_rol}
                    options={[
                      {
                        key: 1,
                        value: 'DG Admin',
                      },
                      {
                        key: 2,
                        value: 'DG Exec',
                      },
                      {
                        key: 3,
                        value: 'DG Basic',
                      },
                      {
                        key: 4,
                        value: 'DG Pro',
                      },
                    ]}
                  />
                )}
                <div className="grid grid-cols-2 gap-4">
                  <SmartInput
                    title="Metas Registro"
                    name="meta_registros"
                    imageSrc={nombreMD}
                    isRequired={true}
                    type="number"
                    onChange={this.onChangeHandler}
                    onBlur={(e) => {
                      this.formOnBlur(
                        e,
                        [VALIDATOR_REQUIRE(), VALIDATOR_MIN(1)],
                        'newUserV'
                      );
                    }}
                    placeholder="50"
                    inputProps={{ min: 1 }}
                    value={newUser.meta_registros}
                    isValid={newUserV.meta_registros}
                  />
                  <SmartInput
                    title="Metas Inscritos"
                    name="meta_inscritos"
                    imageSrc={nombreMD}
                    isRequired={true}
                    type="number"
                    onChange={this.onChangeHandler}
                    onBlur={(e) => {
                      this.formOnBlur(
                        e,
                        [VALIDATOR_REQUIRE(), VALIDATOR_MIN(1)],
                        'newUserV'
                      );
                    }}
                    placeholder="50"
                    inputProps={{ min: 1 }}
                    value={newUser.meta_inscritos}
                    isValid={newUserV.meta_inscritos}
                  />
                </div>
                <SmartButton
                  title="Crear usuario"
                  className={'w-2/3 mx-auto'}
                />
              </form>
            </div>
            <div className="grid w-full px-10" onClick={() => {}}>
              <TitleSection title="Lista de usuarios" />
              <div style={{ height: '50vh', overflowY: 'auto' }}>
                {users.map((user) => {
                  return (
                    <CardUser
                      user={user}
                      onEdit={() => {
                        this.setState({ currentUser: user, modalOpen: true });
                      }}
                      onDelete={() => {
                        this.setState({
                          currentUser: user,
                          modalDelOpen: true,
                        });
                      }}
                      onLock={() => {
                        this.setState({
                          currentUser: user,
                          modalDisableOpen: true,
                        });
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="footerLogo">
          <div className="cssLogoSmartSm right-8"></div>
        </div>
        <ModalForm
          closeModal={() => {
            this.setState({ modalOpen: false });
          }}
          title="Editar usuario"
          open={modalOpen}
        >
          <form onSubmit={this.updateUser}>
            <SmartInput
              title="Nombre"
              name="nombre"
              imageSrc={nombreMD}
              isRequired={true}
              onChange={this.onChangeCurrentHandler}
              onBlur={(e) => {
                this.formOnBlur(e, [VALIDATOR_REQUIRE()], 'currentUserV');
              }}
              placeholder="Jhon Doe"
              value={currentUser.nombre}
              isValid={currentUserV.nombre}
            />
            <SmartInput
              title="Nuevo correo electrónico"
              name="email"
              imageSrc={emailMD}
              isRequired={true}
              placeholder="jhondoe@email.com"
              onChange={this.onChangeCurrentHandler}
              onBlur={(e) => {
                this.formOnBlur(
                  e,
                  [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()],
                  'currentUserV'
                );
              }}
              type="email"
              value={currentUser.email}
              isValid={currentUserV.email}
            />
            <SmartInput
              title="Nueva contraseña"
              name="password"
              imageSrc={contraseñaMD}
              isRequired={true}
              placeholder="*****"
              onChange={this.onChangeCurrentHandler}
              onBlur={(e) => {
                this.formOnBlur(e, [VALIDATOR_REQUIRE()], 'currentUserV');
              }}
              type="password"
              value={currentUser.password}
              isValid={currentUserV.password}
            />
            <p className="text-base text-basic-gray mt-2 text-center">
              Al confirmar, el usuario recibirá un correo electrónico de
              confirmación.
            </p>
            <SmartButton title="Confirmar" className={'w-2/3 mx-auto'} />
          </form>
        </ModalForm>
        <Modal
          closeModal={() => {
            this.setState({ modalSuccessOpen: false });
          }}
          onConfirm={() => {
            this.setState({ modalSuccessOpen: false }, () => {
              this.fetchUsers();
            });
          }}
          open={modalSuccessOpen}
          mode="success"
          title="¡Usuario creado exitosamente!"
          text="El nuevo usuario recibirá un correo electrónico de confirmación"
        />
        <Modal
          closeModal={() => {
            this.setState({ modalDelOpen: false });
          }}
          open={modalDelOpen}
          mode="confirm"
          title="¿Realmente desea eliminar este usuario?"
          text="Ésta accion no puede deshacerse."
          onConfirm={this.onDeleteUser}
        />
        <Modal
          closeModal={() => {
            this.setState({ modalDisableOpen: false });
          }}
          open={modalDisableOpen}
          mode="confirm"
          title="¿Realmente desea desactivar a este usuario?"
          onConfirm={this.onDisableUser}
        />
      </div>
    );
  }
}

Config.propTypes = {};

export default connect((state) => ({
  auth: state.auth,
  catalogos: state.catalogos,
}))(Config);
