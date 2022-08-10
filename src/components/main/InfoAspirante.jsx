import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuGeneral from './MenuGeneral';
import '../../css/style/Alta.css';
import nombre from '../../css/img/nombre.svg';
import origenDato from '../../css/img/dato.svg';
import telefono from '../../css/img/telefono.svg';
import plantel from '../../css/img/plantel.svg';
import cicloEscolar from '../../css/img/cicloEscolar.svg';
import nivelEstudios from '../../css/img/nivelEstudios.svg';
import programaInteres from '../../css/img/programa.svg';
import modalidad from '../../css/img/modalidad.svg';
import calendario from '../../css/img/calendario.svg';
import horario from '../../css/img/horario.svg';
import ultimaAccion from '../../css/img/ultimaAccion.svg';
import TitleSection from '../ui/TitleSection';
import NombreAspirante from '../ui/NombreAspirante';
import { fetchConToken } from '../../helpers/fetch';
import SmartSelect from '../ui/SmartSelect';
import SmartInput from '../ui/SmartInput';
import { contextOnChange } from '../../helpers/classFormHandler';
import { parseCat } from '../../helpers/utils';
import { connect } from 'react-redux';

class InfoAspirante extends Component {
  constructor(props) {
    super(props);
    this.pageTitle = 'Detalle de Aspirante';
    this.state = {
      detalle: {},
    };
  }

  fetchInfo = async () => {
    const id = this.props.match.params.id;
    const res = await (
      await fetchConToken(`aspirantes/${id}`, null, 'GET')
    ).json();
    if (res.ok) {
      const detalle = res.detalle[0];
      this.setState({
        detalle: { ...detalle, ...detalle.registro, idAspirante: detalle.id },
      });
    } else {
      alert('Error: ' + res.msg);
    }
  };

  formOnChange = (e) => {
    contextOnChange(e, this, 'detalle');
  };

  /*handlePlantelChange = (value) => {
    const { catalogos, aspirante } = this.props;
    const nivelInteres = catalogos.nivelesdeinteres.filter(
      (i) => i.idPlantel === parseInt(value)
    );
    const programas = catalogos.programas.filter((i) => {
      return (
        i.idPlantel === parseInt(value) &&
        i.idModalidad === parseInt(aspirante.idModalidad)
      );
    });
    this.setState({ nivelInteres, programas });
  };

  handleModalidadChange = (value) => {
    const { catalogos, aspirante } = this.props;
    const programas = catalogos.programas.filter((i) => {
      return (
        i.idModalidad === parseInt(value) &&
        i.idPlantel === parseInt(aspirante.idPlantel)
      );
    });
    this.setState({ programas });
  };*/

  componentDidMount() {
    this.fetchInfo();
  }

  render() {
    const { detalle: aspirante } = this.state;
    const { catalogos } = this.props;
    const {
      origendedatos,
      planteles,
      modalidades,
      nivelesdeinteres,
      formascontacto,
      allprogramas,
      ciclosescolares,
      horarios,
    } = catalogos;
    const seguimiento = aspirante.seguimientos ? aspirante.seguimientos : {};
    const { formOnChange } = this;
    return (
      <>
        <div className="container mx-auto">
          <MenuGeneral pageTitle={this.pageTitle} />
          <NombreAspirante aspirante={aspirante} reload={this.fetchInfo} />

          <div className="detalleAspiranteResp w-5/6 mx-auto grid grid-cols-3 relative mb-4 place-items-start content-start">
            {/* Cliente */}
            <div
              className="mx-auto w-full p-4 grid rowInfo pt-0"
              style={{ top: 0 }}
            >
              <TitleSection title="Información de Aspirante" />
              <div className="grid-flow-col mx-auto relative mt-6 mb-12 place-items-start content-start w-full">
                <SmartInput
                  imageSrc={nombre}
                  imageWidth="30"
                  isRequired={true}
                  name="nombre"
                  title="Nombre"
                  onChange={(e) => {
                    formOnChange(e);
                  }}
                  value={aspirante.nombre}
                />
                <SmartInput
                  imageSrc={nombre}
                  imageWidth="30"
                  isRequired={true}
                  name="apellido_paterno"
                  title="Apellido Paterno"
                  onChange={(e) => {
                    formOnChange(e);
                  }}
                  value={aspirante.apellido_paterno}
                />
                <SmartInput
                  imageSrc={nombre}
                  imageWidth="30"
                  isRequired={true}
                  name="apellido_materno"
                  title="Apellido Materno"
                  onChange={(e) => {
                    formOnChange(e);
                  }}
                  value={aspirante.apellido_materno}
                />
                <SmartSelect
                  title="Origen del dato"
                  imageSrc={origenDato}
                  imageWidth="30"
                  isRequired={true}
                  placeholder="--"
                  name="id_origen_dato"
                  onChange={(e) => {
                    formOnChange(e);
                  }}
                  inputProps={{ disabled: true }}
                  options={parseCat(origendedatos, 'id', 'nombre')}
                  value={aspirante.id_origen_dato}
                />
                <SmartInput
                  imageSrc={telefono}
                  imageWidth="30"
                  isRequired={true}
                  name="telefono"
                  onChange={(e) => {
                    formOnChange(e);
                  }}
                  title="Teléfono"
                  inputProps={{ maxLength: '10', pattern: '/d{10}$/' }}
                  value={aspirante.telefono}
                />
              </div>
            </div>

            {/* Producto */}
            <div
              className="mx-auto w-full p-4 grid rowInfo pt-0"
              style={{ top: 0 }}
            >
              <TitleSection title="Producto" />
              <div className="grid-flow-col mx-auto relative mt-6 mb-12 place-items-start content-start w-full">
                <SmartSelect
                  title="Plantel de interés"
                  imageSrc={plantel}
                  name="id_plantel"
                  options={parseCat(planteles, 'idPlantel', 'nombrePlantel')}
                  onChange={(e) => {
                    formOnChange(e);
                    this.handlePlantelChange(e.target.value);
                  }}
                  isRequired={true}
                  value={aspirante.id_plantel}
                />
                <SmartSelect
                  title="Modalidad"
                  imageSrc={modalidad}
                  name="id_modalidad"
                  options={parseCat(
                    modalidades,
                    'idModalidad',
                    'nombreModalidad'
                  )}
                  onChange={(e) => {
                    formOnChange(e);
                    this.handleModalidadChange(e.target.value);
                  }}
                  isRequired={true}
                  value={aspirante.id_modalidad}
                />
                <SmartSelect
                  title="Nivel de estudios"
                  imageSrc={nivelEstudios}
                  name="id_nivel_interes"
                  options={parseCat(nivelesdeinteres, 'id', 'nombre')}
                  onChange={formOnChange}
                  isRequired={true}
                  value={aspirante.id_nivel_interes}
                />
                <SmartSelect
                  title="Programa de interés"
                  imageSrc={programaInteres}
                  name="id_programa"
                  options={parseCat(allprogramas, 'id', 'nombre')}
                  onChange={formOnChange}
                  isRequired={true}
                  value={aspirante.id_programa}
                />
                <SmartSelect
                  title="Ciclo escolar"
                  imageSrc={cicloEscolar}
                  name="id_ciclo_escolar"
                  options={parseCat(ciclosescolares, 'id', 'nombre')}
                  onChange={formOnChange}
                  isRequired={true}
                  value={aspirante.id_ciclo_escolar}
                />
                <SmartSelect
                  title="Día de preferencia"
                  imageSrc={calendario}
                  name="dia_preferencia"
                  options={parseCat(
                    [
                      { dia: 'Lunes' },
                      { dia: 'Martes' },
                      { dia: 'Miércoles' },
                      { dia: 'Jueves' },
                      { dia: 'Viernes' },
                    ],
                    'dia',
                    'dia'
                  )}
                  onChange={formOnChange}
                  isRequired={true}
                  value={aspirante.dia_preferencia}
                />
                <SmartSelect
                  title="Horario"
                  imageSrc={horario}
                  name="id_horario"
                  options={parseCat(horarios, 'id', 'nombre')}
                  onChange={formOnChange}
                  isRequired={true}
                  value={aspirante.id_horario}
                />
              </div>
            </div>

            {/* Seguimiento */}
            <div
              className="mx-auto w-full p-4 grid rowInfo pt-0"
              style={{ top: 0 }}
            >
              <TitleSection title="Último Seguimiento" />
              <div className="grid-flow-col mx-auto relative mt-6 mb-12 place-items-start content-start w-full">
                <div className="inputForm">
                  <SmartInput
                    title="Fecha de primer contacto"
                    name="fecha_primer_contacto"
                    required={true}
                    imageSrc={calendario}
                    type="date"
                    onChange={formOnChange}
                    inputProps={{ disabled: true }}
                    placeholder="Fecha de primer contacto"
                    value={seguimiento?.fecha_primer_contacto}
                  />
                </div>
                <div className="inputForm">
                  <SmartInput
                    title="Fecha de próximo contacto"
                    name="fecha_proximo_contacto"
                    required={true}
                    imageSrc={calendario}
                    type="date"
                    onChange={formOnChange}
                    inputProps={{ disabled: true }}
                    placeholder="Fecha de primer contacto"
                    value={seguimiento?.fecha_proximo_contacto}
                  />
                </div>
                <div className="inputForm">
                  <SmartInput
                    title="Fecha de último contacto"
                    required={true}
                    imageSrc={calendario}
                    type="date"
                    value={seguimiento?.fecha_ultimo_contacto}
                    inputProps={{ readOnly: true }}
                  />
                </div>
                <div className="inputForm">
                  <SmartSelect
                    title="Última acción realizada"
                    imageSrc={ultimaAccion}
                    name="id_forma_contacto"
                    options={parseCat(formascontacto, 'id', 'nombre')}
                    onChange={formOnChange}
                    isRequired={true}
                    inputProps={{ disabled: true }}
                    value={seguimiento.id_forma_contacto}
                  />
                </div>
                <div className="inputForm">
                  <label className="text-basic-gray text-base labelForm">
                    <span className="text-smartPurple pr-1">*</span>Comentarios
                    a considerar del aspirante
                  </label>
                  <textarea
                    required
                    disabled
                    className="font-sans bg-transparent text-sm appearance-none relative block w-full mt-6 mb-4 px-3 py-3 border border-borders-gray placeholder-gray-500 text-gray-600 rounded-lg focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10"
                    placeholder="Feria universitaria"
                    value={seguimiento.comentario}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="footerLogo">
            <div className="cssLogoSmartSm right-8"></div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ catalogos }) => {
  return {
    catalogos: catalogos,
  };
};

export default connect(mapStateToProps)(InfoAspirante);
