import React from 'react';
import '../../css/style/Alta.css';
import calendario from '../../css/img/calendario.svg';
import ultimaAccion from '../../css/img/ultimaAccion.svg';
import nivelInteres from '../../css/img/nivelInteres.svg';
import SmartInput from '../ui/SmartInput';
import SmartSelect from '../ui/SmartSelect';
import { parseCat, parseObjectDate } from '../../helpers/utils';
import { VALIDATOR_REQUIRE } from '../../helpers/validators';

const Paso3 = ({
  aspirante,
  aspiranteValidity,
  formOnChange,
  fieldOnBlur,
  catalogos,
}) => {
  const today = parseObjectDate(new Date(), 4);
  return (
    <>
      <div className="mx-auto w-full p-4">
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
          inputProps={{ max: today }}
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
          inputProps={{ min: today }}
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
      </div>

      <div className="mx-auto w-full p-4 grid">
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
          inputProps={{ max: today }}
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
      <div className="cssPaso03 right-8 z-0"></div>
    </>
  );
};

export default Paso3;
