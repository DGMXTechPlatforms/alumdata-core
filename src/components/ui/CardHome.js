import React from 'react';
import '../../App';
import '../main/Home';
import './CardHome';
import './Avfemenino';
import '../../App.css';
import Avfemenino from './Avfemenino';
import Nombres from '../../css/img/persona.svg';
import Fechas from '../../css/img/calendario.svg';
import Plantel from '../../css/img/plantel.svg';
import nivelInteres from '../../css/img/nivelInteres.svg';
import { connect } from 'react-redux';

const CardHome = ({ user, catalogos, estilos, onHover }) => {
  const {
    nombre,
    apellido_paterno,
    apellido_materno,
    fecha_proximo_contacto,
    nombrePlantel = 'PLANTEL FALTANTE',
    id_grado_interes,
    gradoInteres,
  } = user;
  const bgBorder = catalogos.gradosinteres.filter(
    (g) => g.id === id_grado_interes
  )[0].color;

  //${isFront? 'cardFront': 'cardBack'}
  return (
    <div
      className="h-full px-5 my-4 py-6 mx-4 cardHome items-start justify-start"
      style={{ cursor: 'pointer' }}
    >
      <Avfemenino bgBorder={bgBorder} />
      <div className="flex flex-col mx-auto">
        <div className="text-basic-gray mx-auto text-left w-full px-2 py-1 mt-2">
          <span className=" float-left relative font-semibold text-sm spanInfoCard">
            <img
              alt=""
              src={Nombres}
              width="25"
              className="mx-1 relative float-left"
            />
            {[nombre, apellido_paterno, apellido_materno].join(' ')}
          </span>
        </div>
        <div className="text-basic-gray mx-auto text-left w-full px-2 py-1 mt-0">
          <span className=" float-left relative font-light text-sm mt-2 spanInfoCard">
            <img
              alt=""
              src={Fechas}
              width="25"
              className="mx-1 relative float-left"
            />
            Próximo contacto:
            <br />
            {fecha_proximo_contacto}
          </span>
        </div>
        <div className="text-basic-gray mx-auto text-left w-full px-2 py-1 mt-0">
          <span className=" float-left relative font-light text-sm mt-2 spanInfoCard">
            <img
              alt=""
              src={Plantel}
              width="25"
              className="mx-1 -my-1 relative float-left"
            />
            {nombrePlantel}
          </span>
        </div>
        <div className="text-basic-gray mx-auto text-left w-full px-2 py-1 mt-0">
          <span className=" float-left relative font-light text-sm mt-2 spanInfoCard">
            <img
              alt=""
              src={nivelInteres}
              width="25"
              className="mx-1 -my-1 relative float-left"
            />
            {gradoInteres}
          </span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ catalogos: state.catalogos });

export default connect(mapStateToProps)(CardHome);
