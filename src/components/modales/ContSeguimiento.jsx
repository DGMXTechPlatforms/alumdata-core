import '../../css/style/Alta.css';
import PropTypes from 'prop-types';
import SmartInput from '../ui/SmartInput';
import UpdateModal from '../../css/img/updateModal.svg';
import calendario from '../../css/img/calendario.svg';
import ultimaAccion from '../../css/img/ultimaAccion.svg';
import nivelInteres from '../../css/img/nivelInteres.svg';
import SmartSelect from '../ui/SmartSelect';
import { parseCat, parseObjectDate } from '../../helpers/utils';
import { connect } from 'react-redux';
import SmartButton from '../ui/SmartButton';
import { VALIDATOR_REQUIRE } from '../../helpers/validators';

const ContSeguimiento = ({
  formOnChange,
  formOnBlur,
  catalogos,
  seguimiento,
  seguimientoV,
  onSubmit,
}) => {
  const { gradosinteres, formascontacto } = catalogos;
  return (
    <form onSubmit={onSubmit} className="modalSeguimiento">
      <div className="mx-auto tituloModal text-xl text-center text-normalPurple mt-6">
        Seguimiento de aspirante
      </div>
      <p className="text-base text-basic-gray mt-2 text-center px-12">
        Historial del aspirante
      </p>
      <img className="mx-auto my-4" src={UpdateModal} width="35%" />
      <div className="">
        <SmartSelect
          title="Proxima acción a realizar"
          imageSrc={ultimaAccion}
          name="id_forma_contacto"
          options={parseCat(formascontacto, 'id', 'nombre')}
          onChange={formOnChange}
          onBlur={(e) => {
            formOnBlur(e, [VALIDATOR_REQUIRE()]);
          }}
          isRequired={true}
          value={seguimiento.id_forma_contacto}
          isValid={seguimientoV.id_forma_contacto}
        />
      </div>
      <div className="">
        <SmartSelect
          title="Grado de interés"
          imageSrc={nivelInteres}
          value={seguimiento.id_grado_interes}
          name="id_grado_interes"
          options={parseCat(gradosinteres, 'id', 'nombre')}
          onChange={formOnChange}
          onBlur={(e) => {
            formOnBlur(e, [VALIDATOR_REQUIRE()]);
          }}
          isRequired={true}
          isValid={seguimientoV.id_grado_interes}
        />
      </div>
      <div className="">
        <SmartInput
          title="Fecha de último contacto"
          required={true}
          imageSrc={calendario}
          type="date"
          onChange={formOnChange}
          onBlur={(e) => {
            formOnBlur(e, [VALIDATOR_REQUIRE()]);
          }}
          inputProps={{ max: parseObjectDate(new Date(), 4) }}
          placeholder="Fecha de último contacto"
          name="fecha_ultimo_contacto"
          value={seguimiento.fecha_ultimo_contacto}
          isValid={seguimientoV.fecha_ultimo_contacto}
        />
      </div>
      <div className="">
        <SmartInput
          title="Fecha de próximo contacto"
          required={true}
          imageSrc={calendario}
          type="date"
          onChange={formOnChange}
          onBlur={(e) => {
            formOnBlur(e, [VALIDATOR_REQUIRE()]);
          }}
          inputProps={{ min: parseObjectDate(new Date(), 4) }}
          placeholder="Fecha de próximo contacto"
          name="fecha_proximo_contacto"
          value={seguimiento.fecha_proximo_contacto}
          isValid={seguimientoV.fecha_proximo_contacto}
        />
      </div>
      <div className="input-form">
        <label className="text-basic-gray text-base labelForm">
          Comentarios de la visita
        </label>
        <textarea
          required
          className="font-sans bg-transparent text-sm appearance-none relative block w-full mt-6 mb-4 p-2 pb-8 border border-borders-gray placeholder-gray-500 text-gray-600 rounded-lg focus:outline-none focus:ring-smartDark focus:border-smartDark focus:z-10"
          placeholder="Comentarios"
          name="comentario"
          onChange={formOnChange}
          value={seguimiento.comentario}
        />
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <SmartButton theme="small" type="submit">
          Guardar
        </SmartButton>
      </div>
    </form>
  );
};

ContSeguimiento.propTyoes = {
  formOnChange: PropTypes.func,
};

const mapStateToProps = (state) => {
  return { catalogos: state.catalogos };
};

export default connect(mapStateToProps, {})(ContSeguimiento);
