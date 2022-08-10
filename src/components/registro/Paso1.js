import React, { Component } from 'react';
import '../../css/style/Alta.css';
import { nombre, origenDato, telefono } from '../../helpers/formIcons';
import SmartInput from '../ui/SmartInput';
import SmartSelect from '../ui/SmartSelect';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../helpers/validators';
import { parseCat } from '../../helpers/utils';
export class Paso1 extends Component {
  render() {
    const {
      formOnChange,
      fieldOnBlur,
      aspirante,
      catalogos,
      aspiranteValidity,
    } = this.props;
    return (
      <>
        <div className="mx-auto w-full p-4 grid">
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
        </div>

        <div className="mx-auto w-full p-4 grid">
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
            isValid={aspiranteValidity.id_origen_dato}
            options={parseCat(catalogos.origendedatos, 'id', 'nombre')}
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
            onBlur={(e) =>
              fieldOnBlur(e, [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)])
            }
            isValid={aspiranteValidity.telefono}
            title="Teléfono"
            inputProps={{
              maxLength: '10',
              pattern: '/d{10}$/',
              maxLength: '10',
            }}
            value={aspirante.telefono}
          />
        </div>
        <div className="cssPaso01 right-8 z-0"></div>
      </>
    );
  }
}

export default Paso1;
