import React from 'react';
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
import nivelInteres from '../../css/img/nivelInteres.svg';
import ultimaAccion from '../../css/img/ultimaAccion.svg';
import TitleSection from '../ui/TitleSection';
import SmartSelect from '../ui/SmartSelect';
import SmartInput from '../ui/SmartInput';
import { parseCat } from '../../helpers/utils';
import { VALIDATOR_REQUIRE } from '../../helpers/validators';

const Paso4 = ({
  aspirante,
  catalogos,
  formOnChange,
  fieldOnBlur,
  aspiranteValidity,
}) => {
  const {
    horarios,
    planteles,
    nivelesdeinteres,
    ciclosescolares,
    modalidades,
    allprogramas,
  } = catalogos;
  return (
    <>
      {/* Cliente */}
      <div className="mx-auto w-full p-4 grid rowForm pt-0" style={{ top: 0 }}>
        <TitleSection title="Cliente" />
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
          onBlur={(e) => fieldOnBlur(e, [VALIDATOR_REQUIRE()])}
          isValid={aspiranteValidity.nombre}
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
          onBlur={(e) => fieldOnBlur(e, [VALIDATOR_REQUIRE()])}
          isValid={aspiranteValidity.apellido_paterno}
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
          onBlur={(e) => fieldOnBlur(e, [VALIDATOR_REQUIRE()])}
          isValid={aspiranteValidity.apellido_materno}
        />
        <SmartSelect
          imageSrc={origenDato}
          title="Origen del dato"
          isRequired={true}
          placeholder="--"
          name="id_origen_dato"
          onChange={(e) => {
            formOnChange(e);
          }}
          onBlur={(e) => fieldOnBlur(e, [VALIDATOR_REQUIRE()])}
          options={parseCat(catalogos.origendedatos, 'id', 'nombre')}
          value={aspirante.id_origen_dato}
          isValid={aspiranteValidity.id_origen_dato}
        />
        <SmartInput
          imageSrc={telefono}
          imageWidth="30"
          isRequired={true}
          name="telefono"
          onChange={(e) => {
            formOnChange(e);
          }}
          onBlur={(e) => fieldOnBlur(e, [VALIDATOR_REQUIRE()])}
          isValid={aspiranteValidity.telefono}
          title="Teléfono"
          inputProps={{ maxLength: '10', pattern: '/d{10}$/' }}
          value={aspirante.telefono}
        />
      </div>

      {/* Producto */}
      <div className="mx-auto w-full p-4 grid rowForm pt-0" style={{ top: 0 }}>
        <TitleSection title="Producto" />
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
          options={parseCat(allprogramas, 'id', 'nombre')}
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
          options={parseCat(horarios, 'id', 'horario')}
          onChange={formOnChange}
          onBlur={(e) => fieldOnBlur(e, [VALIDATOR_REQUIRE()])}
          isRequired={true}
          value={aspirante.id_horario}
          isValid={aspiranteValidity.id_horario}
        />
      </div>

      {/* Seguimiento */}
      <div className="mx-auto w-full p-4 grid rowForm pt-0" style={{ top: 0 }}>
        <TitleSection title="Seguimiento" />
        <SmartInput
          title="Fecha de primer contacto"
          name="fecha_primer_contacto"
          required={true}
          imageSrc={calendario}
          type="date"
          onChange={formOnChange}
          onBlur={(e) => fieldOnBlur(e, [VALIDATOR_REQUIRE()])}
          placeholder="Fecha de primer contacto"
          value={aspirante.fecha_primer_contacto}
          isValid={aspiranteValidity.fecha_primer_contacto}
        />
        <SmartInput
          title="Fecha de próximo contacto"
          name="fecha_proximo_contacto"
          required={true}
          imageSrc={calendario}
          type="date"
          onChange={formOnChange}
          onBlur={(e) => fieldOnBlur(e, [VALIDATOR_REQUIRE()])}
          placeholder="Fecha de primer contacto"
          value={aspirante.fecha_proximo_contacto}
          isValid={aspiranteValidity.fecha_proximo_contacto}
        />
        <SmartSelect
          title="Grado de interés"
          imageSrc={nivelInteres}
          value={aspirante.id_grado_interes}
          isValid={aspiranteValidity.id_grado_interes}
          name="id_grado_interes"
          options={parseCat(catalogos.gradosinteres, 'id', 'nombre')}
          onChange={formOnChange}
          onBlur={(e) => fieldOnBlur(e, [VALIDATOR_REQUIRE()])}
          isRequired={true}
        />
        <SmartInput
          title="Fecha de último contacto"
          name="fecha_ultimo_contacto"
          required={true}
          imageSrc={calendario}
          type="date"
          onChange={formOnChange}
          onBlur={(e) => fieldOnBlur(e, [VALIDATOR_REQUIRE()])}
          placeholder="Fecha de primer contacto"
          value={aspirante.fecha_ultimo_contacto}
          isValid={aspiranteValidity.fecha_ultimo_contacto}
        />
        <SmartSelect
          title="Última acción realizada"
          imageSrc={ultimaAccion}
          name="id_forma_contacto"
          options={parseCat(catalogos.formascontacto, 'id', 'nombre')}
          onChange={formOnChange}
          onBlur={(e) => fieldOnBlur(e, [VALIDATOR_REQUIRE()])}
          isRequired={true}
          value={aspirante.id_forma_contacto}
          isValid={aspiranteValidity.id_forma_contacto}
        />
        <div className="inputForm">
          <label className="text-basic-gray text-base labelForm">
            <span className="text-smartPurple pr-1">*</span>Comentarios a
            considerar del aspirante
          </label>
          <textarea
            required
            name="comentario"
            onChange={(e) => {
              formOnChange(e);
            }}
            onBlur={(e) => fieldOnBlur(e, [VALIDATOR_REQUIRE()])}
            value={aspirante.comentario}
            isValid={aspiranteValidity.comentario}
            className="font-sans bg-transparent text-sm appearance-none relative block w-full mt-6 mb-4 px-3 py-3 border border-borders-gray placeholder-gray-500 text-gray-600 rounded-lg focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10"
            placeholder="Comentario del aspirante"
          />
        </div>
      </div>
      <div className="cssPaso04 right-8 z-0"></div>
    </>
  );
};

export default Paso4;
