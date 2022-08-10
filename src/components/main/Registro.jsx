import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuGeneral from './MenuGeneral';
import Paso1 from '../registro/Paso1';
import Paso2 from '../registro/Paso2';
import Paso3 from '../registro/Paso3';
import ProgressBar from '../ui/ProgressBar';
import SmartButton from '../ui/SmartButton';
import Modal from '../modales/Modal';
import { contextOnChange, contextOnBlur } from '../../helpers/classFormHandler';
import TitleBlock from '../ui/TitleBlock';
import Paso4 from '../registro/Paso4';
import { fetchConToken } from '../../helpers/fetch';
import { validateBoolObject } from '../../helpers/utils';

class Registro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aspirante: {
        //PASO 1
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        telefono: '',
        id_origen_dato: '',
        //PASO 2
        id_plantel: '',
        id_ciclo_escolar: '',
        id_nivel_interes: '',
        id_modalidad: '',
        id_programa: '',
        id_horario: '',
        diadepreferencia: '',
        //PASO 3
        fecha_primer_contacto: '',
        fecha_proximo_contacto: '',
        fecha_ultimo_contacto: '',
        id_forma_contacto: '',
        comentario: '',
        id_grado_interes: '',
      },
      aspiranteValidity: {},
      isOpenModal: false,
      step: 1,
    };
  }

  validateChangeStep = (step, goBack) => {
    const { aspirante: a, aspiranteValidity: v } = this.state;
    if (!goBack) {
      switch (step) {
        case 1:
          return (
            a.nombre !== '' &&
            v.nombre &&
            a.apellido_paterno !== '' &&
            v.apellido_paterno &&
            a.apellido_materno !== '' &&
            v.apellido_materno &&
            a.telefono !== '' &&
            v.telefono &&
            a.id_origen_dato !== '' &&
            v.id_origen_dato
          );
        case 2:
          return (
            a.id_plantel !== '' &&
            v.id_plantel &&
            a.id_ciclo_escolar !== '' &&
            v.id_ciclo_escolar &&
            a.id_nivel_interes !== '' &&
            v.id_nivel_interes &&
            a.id_modalidad !== '' &&
            v.id_modalidad &&
            a.id_programa !== '' &&
            v.id_programa &&
            a.id_horario !== '' &&
            v.id_horario &&
            a.diadepreferencia !== '' &&
            v.diadepreferencia
          );
        case 3:
          return (
            a.fecha_primer_contacto !== '' &&
            v.fecha_primer_contacto &&
            a.fecha_proximo_contacto !== '' &&
            v.fecha_proximo_contacto &&
            a.fecha_ultimo_contacto !== '' &&
            v.fecha_ultimo_contacto &&
            a.id_forma_contacto !== '' &&
            v.id_forma_contacto &&
            a.comentario !== '' &&
            v.comentario &&
            a.id_grado_interes !== '' &&
            v.id_grado_interes
          );
        case 4:
          let isValid = true;
          Object.keys(v).forEach((k) => {
            isValid *= v[k];
          });
          return isValid;
        default:
          return;
      }
    }
    return true;
  };

  changeStep = async (goBack = false) => {
    const { step } = this.state;
    if (this.validateChangeStep(step, goBack)) {
      this.setState({
        step: goBack ? (step === 1 ? 1 : step - 1) : step === 4 ? 4 : step + 1,
      });
      if (step === 4 && !goBack) {
        const { aspirante: data, aspiranteValidity } = this.state;
        if (validateBoolObject(aspiranteValidity)) {
          const res = await (
            await fetchConToken(
              'aspirantes/new',
              { ...data, id_tipo_ciclo_escolar: 3 },
              'POST'
            )
          ).json();
          if (res.ok) {
            this.setState({ isOpenModal: true, newUser: {} });
          } else {
            alert('Error: ' + res.msg);
          }
        } else {
          alert('Por favor llena los campos faltantes o con errores');
        }
      }
    } else {
      alert('Por favor llena los campos faltantes');
    }
  };

  formOnChange = (e) => {
    contextOnChange(e, this, 'aspirante');
  };

  onAceptModal = () => {
    this.setState({
      aspirante: {
        //PASO 1
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        telefono: '',
        id_origen_dato: '',
        //PASO 2
        id_plantel: '',
        id_ciclo_escolar: '',
        id_nivel_interes: '',
        id_modalidad: '',
        id_programa: '',
        id_horario: '',
        diadepreferencia: '',
        //PASO 3
        fecha_primer_contacto: '',
        fecha_proximo_contacto: '',
        fecha_ultimo_contacto: '',
        id_forma_contacto: '',
        comentario: '',
        id_grado_interes: '',
      },
      isOpenModal: false,
      step: 1,
    });
  };

  fieldOnBlur = (e, validators) => {
    contextOnBlur(e, validators, this, 'aspiranteValidity');
  };

  onCancelModal = () => {};

  renderStep = () => {
    const {
      niveldeinteresFilter,
      programasFilter,
      populateSelect,
      fieldOnBlur,
    } = this;
    const { step, aspirante, aspiranteValidity } = this.state;
    const { catalogos } = this.props;
    switch (step) {
      case 1:
        return (
          <Paso1
            aspirante={aspirante}
            aspiranteValidity={aspiranteValidity}
            catalogos={catalogos}
            fieldOnBlur={fieldOnBlur}
            formOnChange={this.formOnChange}
          />
        );
      case 2:
        return (
          <Paso2
            selectOptions={this.selectOptions}
            programasFilter={programasFilter}
            aspiranteValidity={aspiranteValidity}
            catalogos={{ ...catalogos }}
            niveldeinteresFilter={niveldeinteresFilter}
            populateSelect={populateSelect}
            aspirante={aspirante}
            fieldOnBlur={fieldOnBlur}
            formOnChange={this.formOnChange}
          />
        );
      case 3:
        return (
          <Paso3
            aspirante={aspirante}
            formOnChange={this.formOnChange}
            fieldOnBlur={fieldOnBlur}
            aspiranteValidity={aspiranteValidity}
            catalogos={{ ...catalogos }}
          />
        );
      case 4:
        return (
          <Paso4
            catalogos={{ ...catalogos }}
            programasFilter={programasFilter}
            niveldeinteresFilter={niveldeinteresFilter}
            populateSelect={populateSelect}
            aspirante={aspirante}
            aspiranteValidity={aspiranteValidity}
            formOnChange={this.formOnChange}
            fieldOnBlur={fieldOnBlur}
          />
        );
      default:
        return;
    }
  };

  componentDidMount() {
    const { aspirante } = this.state;
    const aspiranteValidity = {};
    Object.keys(aspirante).forEach((k) => {
      aspiranteValidity[`${k}`] = true;
    });
    this.setState({ aspiranteValidity });
  }

  render() {
    const { step, isOpenModal } = this.state;

    return (
      <div className="container mx-auto">
        <MenuGeneral pageTitle="Alta de aspirante" />
        <div className="topRowForm w-4/5 mx-auto relative my-4 place-items-start content-start">
          <TitleBlock text={'Nuevo aspirante'} />
          <ProgressBar step={step} />
          <div
            className={`grid grid-cols-${
              step === 4 ? 3 : 2
            } rowForm grid-flow-col mx-auto relative mt-6 mb-12 place-items-start content-start`}
          >
            {this.renderStep()}
          </div>
        </div>
        <div className="mx-auto w-4/5 flex flex-col flex-wrap">
          <div className="w-2/3 z-10 buttonForm right-18 bottom-16 buttonsAntSig">
            <SmartButton
              onClick={() => {
                this.changeStep();
              }}
              type="submit"
              className="w-1/3 font-sans float-right text-lg appearance-none relative block mt-6 mb-4 mx-2 px-12 py-3 border border-transparent text-white bg-smartPurple rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-smartPurple hover:bg-cyan-700 sm:text-base"
            >
              Siguiente
            </SmartButton>
            {step > 1 && (
              <SmartButton
                onClick={() => {
                  this.changeStep(true);
                }}
                type="submit"
                className="w-1/3 font-sans float-right text-lg appearance-none relative block mt-6 mb-4 mx-2 px-12 py-3 border border-transparent text-white bg-smartPurple rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-smartPurple hover:bg-cyan-700 sm:text-base"
              >
                Anterior
              </SmartButton>
            )}
          </div>
        </div>

        <div className="footerLogo">
          <div className="cssLogoSmartSm right-8"></div>
        </div>
        <Modal
          onConfirm={this.onAceptModal}
          onCancel={this.onCancelModal}
          closeModal={() => {
            this.setState({ isOpenModal: false });
            this.props.history.push('/');
          }}
          title="¡Aspirante creado exitosamente!"
          text="El aspirante se ha guardado correctamente."
          open={isOpenModal}
          mode="success"
        />
      </div>
    );
  }
}

const mapStateToProps = ({ catalogos }) => {
  return {
    catalogos: catalogos,
  };
};

export default connect(mapStateToProps)(Registro);
