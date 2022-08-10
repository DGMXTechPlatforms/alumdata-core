import React, { Component } from 'react';
import '../../css/style/Alta.css';
import plantel from '../../css/img/plantel.svg';
import cicloEscolar from '../../css/img/cicloEscolar.svg';
import nivelEstudios from '../../css/img/nivelEstudios.svg';
import programaInteres from '../../css/img/programa.svg';
import modalidad from '../../css/img/modalidad.svg';
import calendario from '../../css/img/calendario.svg';
import horario from '../../css/img/horario.svg';
import SmartSelect from '../ui/SmartSelect';
import { parseCat } from '../../helpers/utils';
import { VALIDATOR_REQUIRE } from '../../helpers/validators';

class Paso2 extends Component {
  render() {
    const {
      formOnChange,
      aspirante,
      aspiranteValidity,
      catalogos,
      fieldOnBlur,
    } = this.props;
    const {
      horarios,
      ciclosescolares,
      planteles,
      modalidades,
      programas,
      nivelesdeinteres,
    } = catalogos;

    return (
      <>
        <div className="mx-auto w-full p-4 grid">
          <SmartSelect
            title="Plantel de interés"
            imageSrc={plantel}
            name="id_plantel"
            options={parseCat(planteles, 'idPlantel', 'nombrePlantel')}
            onChange={(e) => {
              formOnChange(e);
              this.handlePlantelChange(e.target.value);
            }}
            onBlur={(e) => fieldOnBlur(e, [VALIDATOR_REQUIRE()])}
            isRequired={true}
            value={aspirante.id_plantel}
            isValid={aspiranteValidity.id_plantel}
          />
          <SmartSelect
            title="Nivel de estudios"
            imageSrc={nivelEstudios}
            name="id_nivel_interes"
            options={parseCat(nivelesdeinteres, 'id', 'nombre')}
            onChange={formOnChange}
            onBlur={(e) => fieldOnBlur(e, [VALIDATOR_REQUIRE()])}
            isRequired={true}
            value={aspirante.id_nivel_interes}
            isValid={aspiranteValidity.id_nivel_interes}
          />
          <SmartSelect
            title="Ciclo escolar"
            imageSrc={cicloEscolar}
            name="id_ciclo_escolar"
            options={parseCat(ciclosescolares, 'id', 'nombre')}
            onChange={formOnChange}
            onBlur={(e) => fieldOnBlur(e, [VALIDATOR_REQUIRE()])}
            isRequired={true}
            value={aspirante.id_ciclo_escolar}
            isValid={aspiranteValidity.id_ciclo_escolar}
          />
          <SmartSelect
            title="Día de preferencia"
            imageSrc={calendario}
            name="diadepreferencia"
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
            onBlur={(e) => fieldOnBlur(e, [VALIDATOR_REQUIRE()])}
            isRequired={true}
            value={aspirante.diadepreferencia}
            isValid={aspiranteValidity.diadepreferencia}
          />
        </div>

        <div className="mx-auto w-full p-4 grid">
          <SmartSelect
            title="Modalidad"
            imageSrc={modalidad}
            name="id_modalidad"
            options={parseCat(modalidades, 'idModalidad', 'nombreModalidad')}
            onChange={(e) => {
              formOnChange(e);
              this.handleModalidadChange(e.target.value);
            }}
            onBlur={(e) => fieldOnBlur(e, [VALIDATOR_REQUIRE()])}
            isRequired={true}
            value={aspirante.id_modalidad}
            isValid={aspiranteValidity.id_modalidad}
          />
          <SmartSelect
            title="Programa de interés"
            imageSrc={programaInteres}
            name="id_programa"
            options={parseCat(programas, 'id', 'nombre')}
            onChange={formOnChange}
            onBlur={(e) => fieldOnBlur(e, [VALIDATOR_REQUIRE()])}
            isRequired={true}
            value={aspirante.id_programa}
            isValid={aspiranteValidity.id_programa}
          />
          <SmartSelect
            title="Horario"
            imageSrc={horario}
            name="id_horario"
            options={parseCat(horarios, 'id', 'nombre')}
            onChange={formOnChange}
            onBlur={(e) => fieldOnBlur(e, [VALIDATOR_REQUIRE()])}
            isRequired={true}
            value={aspirante.id_horario}
            isValid={aspiranteValidity.id_horario}
          />
        </div>
        <div className="cssPaso02 z-0"></div>
      </>
    );
  }
}

export default Paso2;
