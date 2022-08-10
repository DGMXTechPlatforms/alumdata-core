import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuGeneral from './MenuGeneral';
import SmartInput from '../ui/SmartInput';
import {
  emailMD,
  nombreMD,
  puestoMD,
  inscritosMD,
  prospectosMD,
  telefonoMD,
} from '../../helpers/formIcons';
import LicenciaFoto from '../../css/img/girlPhoto.jpg';
import TitleBlock from '../ui/TitleBlock';
import { connect } from 'react-redux';
import { contextOnChange } from '../../helpers/classFormHandler';

class InfoLicencia extends Component {
  constructor(props) {
    super(props);
    this.pageTitle = 'Detalle de licencia';
    this.state = {
      newUser: {
        id_rol: 3,
        estado: 1,
      },
      users: [],
      currentUser: {
        nombre: '',
        nombreRol: '',
        email: '',
        telefono: '',
        cantidadProspectos: '',
        cantidadInscritos: '',
      },
    };
  }

  componentDidMount = () => {
    const { usuarios, match } = this.props;
    const currentUserId = parseInt(match.params.id);

    const currentUser = usuarios.filter((usuario) => {
      return usuario.id === currentUserId;
    })[0];

    const {
      nombre,
      nombreRol,
      email,
      cantidadProspectos,
      cantidadInscritos,
      imagen,
      telefono,
    } = currentUser;

    let propectosString = '';
    let inscritosString = '';

    if (cantidadInscritos > 1) {
      inscritosString = 'inscritos';
    } else if (cantidadInscritos == 1) {
      inscritosString = 'inscrito';
    }
    if (cantidadProspectos > 1) {
      propectosString = 'prospectos';
    } else if (cantidadProspectos == 1) {
      propectosString = 'prospecto';
    }
    this.setState({
      currentUser: {
        nombre,
        nombreRol: `Licencia ${nombreRol}`,
        email,
        telefono,
        cantidadProspectos:
          cantidadProspectos > 0
            ? `${cantidadProspectos} ${propectosString}`
            : 'No hay prospectos',
        cantidadInscritos:
          cantidadInscritos > 0
            ? `${cantidadInscritos} ${inscritosString}`
            : 'No hay inscritos',
        imagen,
      },
    });
  };
  formOnChange = (e) => {
    contextOnChange(e, this, 'detalle');
  };

  render() {
    const { currentUser } = this.state;
    return (
      <div className="container mx-auto">
        <MenuGeneral pageTitle={this.pageTitle} />
        <div className="contenidoLicencia topRowForm w-2/5 h-3/5 mx-auto relative mt-4 mb-16 place-items-start content-start">
          <TitleBlock text={this.pageTitle} />
          <div className="grid w-full">
            <div className="grid w-full px-10 detalleLicencia">
              <form>
                <img
                  src={
                    currentUser.imagen !== null
                      ? currentUser.imagen
                      : LicenciaFoto
                  }
                  width="30%"
                  className="mx-auto rounded-full detalleImagenLicencia"
                />
                <SmartInput
                  title="Nombre"
                  name="nombre"
                  imageSrc={nombreMD}
                  isRequired={true}
                  //onChange={this.onChangeHandler}
                  placeholder="Johanna Doe"
                  type="text"
                  value={currentUser.nombre}
                />
                <SmartInput
                  title="Tipo de licencia"
                  name="Licencia"
                  imageSrc={puestoMD}
                  isRequired={true}
                  placeholder="Licencia profesional"
                  //onChange={this.onChangeHandler}
                  type="text"
                  value={currentUser.nombreRol}
                />
                <SmartInput
                  title="Correo electrónico"
                  name="Correo electrónico"
                  imageSrc={emailMD}
                  isRequired={true}
                  placeholder="johannadoe@email.com"
                  //onChange={this.onChangeHandler}
                  type="text"
                  value={currentUser.email}
                />
                <SmartInput
                  title="Teléfono"
                  name="Teléfono"
                  imageSrc={telefonoMD}
                  isRequired={true}
                  placeholder="55 5503 0493"
                  onChange={this.onChangeHandler}
                  type="text"
                  value={currentUser.telefono}
                />
                <SmartInput
                  title="Número de prospectos"
                  name="Número de prospectos"
                  imageSrc={prospectosMD}
                  isRequired={true}
                  placeholder="7 prospectos"
                  //onChange={this.onChangeHandler}
                  type="text"
                  value={currentUser.cantidadProspectos}
                />
                <SmartInput
                  title="Cantidad de inscritos"
                  name="Cantidad de inscritos"
                  imageSrc={inscritosMD}
                  isRequired={true}
                  placeholder="3 inscritos"
                  //onChange={this.onChangeHandler}
                  type="text"
                  value={currentUser.cantidadInscritos}
                />
              </form>
            </div>
          </div>
        </div>
        <div className="footerLogo">
          <div className="cssLogoSmartSm right-8"></div>
        </div>
      </div>
    );
  }
}

InfoLicencia.propTypes = {};

const mapStateToProps = ({ usuarios }) => {
  return {
    usuarios,
  };
};

export default connect(mapStateToProps)(InfoLicencia);
