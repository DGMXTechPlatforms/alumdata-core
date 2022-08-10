import React, { Component } from 'react';
import '../../App';
import '../main/Home';
import '../../App.css';
import '../modales/ModalContenido';
import TitleBlock from './TitleBlock';
import Avfemenino from './Avfemenino';
import borrarAspirante from '../../css/img/deleteDetalleAsp.svg';
import editarAspirante from '../../css/img/saveIcon.svg';
import seguimientoAspirante from '../../css/img/seguimientoDetalleAspirante.svg';
import ContBorrarAsp from '../modales/ContBorrarAsp';
import ContCambiosGuardadosAsp from '../modales/ContCambiosGuardadosAsp';
import Modal from '../modales/ModalContenido';
import { fetchConToken } from '../../helpers/fetch';
import ContSeguimiento from '../modales/ContSeguimiento';
import { contextOnBlur, contextOnChange } from '../../helpers/classFormHandler';
import ModalForm from '../modales/ModalForm';
import { connect } from 'react-redux';

export class NombreAspirante extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalEdit: false,
      isOpenModalCancel: false,
      isOpenModalSeguimiento: false,
      seguimiento: {
        loaded: false,
      },
      seguimientoV: {},
    };
  }

  formOnChange = (e) => {
    contextOnChange(e, this, 'seguimiento');
  };

  formOnBlur = (e, validators) => {
    contextOnBlur(e, validators, this, 'seguimientoV');
  };

  onAcceptModalEdit = async () => {
    await this.updateAspirante();
  };

  onCancelModalEdit = () => {
    this.setState({ isOpenModalEdit: false });
  };

  onAceptModalCancel = async () => {
    await this.deleteAspirante();
    this.setState({ isOpenModalCancel: false });
  };

  onAceptModalSeg = () => {
    this.setState({ isOpenModalSeguimiento: false });
  };

  onCancelModalCancel = () => {
    this.setState({ isOpenModalCancel: false });
  };

  contenidoModal = () => {
    return <ContCambiosGuardadosAsp />;
  };
  onCancelModalSeg = () => {
    this.setState({ isOpenModalSeguimiento: false });
  };

  deleteAspirante = async () => {
    const { idAspirante: id } = this.props.aspirante;
    const res = await (
      await fetchConToken(`aspirantes/eliminar/${id}`, null, 'PUT')
    ).json();
    if (res.ok) {
      // Confirmación
    } else {
      alert('Error: ' + res.msg);
    }
  };

  updateAspirante = async () => {
    const { aspirante } = this.props;
    const { idAspirante: id } = aspirante;
    const res = await (
      await fetchConToken(`aspirantes/${id}`, aspirante, 'PUT')
    ).json();
    if (res.ok) {
      this.setState({ isOpenModalEdit: false }, () => {
        alert('Cambios guardados');
      });
      //Show success
      //this.props.history.goBack();
    } else {
      alert('Error: ' + res.msg);
    }
  };

  createSeguimiento = async (e) => {
    e.preventDefault();
    const { aspirante } = this.props;
    const { seguimiento: a, seguimientoV: v } = this.state;
    const isValid =
      a.id_grado_interes !== '' &&
      v.id_grado_interes &&
      a.id_forma_contacto !== '' &&
      v.id_forma_contacto &&
      a.fecha_ultimo_contacto !== '' &&
      v.fecha_ultimo_contacto &&
      a.fecha_proximo_contacto !== '' &&
      v.fecha_proximo_contacto &&
      a.comentario !== '' &&
      v.comentario;
    if (isValid) {
      const res = await (
        await fetchConToken(
          `aspirantes/nuevoseguimiento`,
          { ...a, id_registro: aspirante.id },
          'POST'
        )
      ).json();
      if (res.ok) {
        alert('Seguimiento registrado exitosamente');
        this.setState({ isOpenModalSeguimiento: false }, this.props.reload);
      } else {
        alert('Error: ' + res.msg);
      }
    } else {
      alert('Faltan campos requeridos');
    }
  };

  componentDidUpdate() {
    const { aspirante } = this.props;
    const { seguimiento } = this.state;
    if (!seguimiento.loaded && aspirante.seguimientos) {
      this.setState({
        seguimiento: {
          id_forma_contacto: aspirante.seguimientos.id_forma_contacto,
          id_grado_interes: aspirante.seguimientos.id_grado_interes,
          fecha_ultimo_contacto: aspirante.seguimientos.fecha_ultimo_contacto,
          fecha_proximo_contacto: '',
          comentario: aspirante.seguimientos.comentario,
          loaded: true,
        },
        seguimientoV: {
          id_forma_contacto: true,
          id_grado_interes: true,
          fecha_ultimo_contacto: true,
          fecha_proximo_contacto: true,
          comentario: true,
        },
      });
    }
  }

  render() {
    const {
      isOpenModalEdit,
      isOpenModalCancel,
      isOpenModalSeguimiento,
      seguimiento,
      seguimientoV,
    } = this.state;
    const { aspirante, auth } = this.props;
    return (
      <div className="titleDetalleAspResp mx-auto w-full mt-16 flex justify-center items-center imgDetalle">
        <div className="flex items-center justify-center avatarDetalle">
          <Avfemenino className="relative float-left" />
        </div>
        <div className="flex items-center justify-center px-4 pt-8">
          <TitleBlock text={aspirante.nombre} />
        </div>
        <div className="flex items-center justify-center iconNombreAspirante">
          <img
            src={editarAspirante}
            width="25"
            className="mx-1 pb-2"
            onClick={() => {
              this.setState({ isOpenModalEdit: true });
            }}
            alt="editar aspirante"
          />
          {auth.id_rol !== 3 && (
            <img
              src={borrarAspirante}
              width="25"
              className="mx-1 pb-2"
              onClick={() => {
                this.setState({ isOpenModalCancel: true });
              }}
              alt="borrar aspirante"
            />
          )}
          <img
            src={seguimientoAspirante}
            width="25"
            className="mx-1 pb-2"
            onClick={() => {
              this.setState({ isOpenModalSeguimiento: true });
            }}
            alt="crear seguimiento"
          />
        </div>

        <Modal
          onClickAccept={this.onAcceptModalEdit}
          onClickCancel={this.onCancelModalEdit}
          closeModal={() => {
            this.setState({ isOpenModalEdit: false });
          }}
          open={isOpenModalEdit}
          contenido={<ContCambiosGuardadosAsp />}
        />
        <Modal
          onClickAccept={this.onAceptModalCancel}
          onClickCancel={this.onCancelModalCancel}
          closeModal={() => {
            this.setState({ isOpenModalCancel: false });
          }}
          open={isOpenModalCancel}
          contenido={<ContBorrarAsp />}
        />
        <ModalForm
          onClickAcept={this.onAceptModalSeg}
          onClickCancel={this.onCancelModalSeg}
          closeModal={() => {
            this.setState({ isOpenModalSeguimiento: false });
          }}
          open={isOpenModalSeguimiento}
        >
          <ContSeguimiento
            seguimiento={seguimiento}
            seguimientoV={seguimientoV}
            onSubmit={this.createSeguimiento}
            formOnChange={this.formOnChange}
            formOnBlur={this.formOnBlur}
          />
        </ModalForm>
      </div>
    );
  }
}

export default connect((state) => ({ auth: state.auth }))(NombreAspirante);
