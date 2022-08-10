import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../App';
import './Home';
import '../../App.css';
import SmartSelect from '../ui/SmartSelect';
import SmartInput from '../ui/SmartInput';
import MenuGeneral from '../main/MenuGeneral';

import { setCurrentAspirantes } from './../../reducers/actions/aspirantes.actions';
import FlipCard from '../ui/FlipCard';
import { parseCat } from '../../helpers/utils';
import { nombreMD, origenDato } from '../../helpers/formIcons';
import { filtrarAspirantes } from '../../helpers/fiiltrarAspirantes';

export class Aspirantes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aspirantes: [],
      usuarios: [],
      filtros: {
        nombre: '',
        startFechaProximoContacto: null,
        endFechaProximoContacto: null,
        grado_de_interes: '',
        ordenarAlfabeticamente: false,
      },
    };
  }
  async componentDidMount() {
    const { setCurrentAspirantes } = this.props;

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-token': localStorage.token,
      },
    };

    try {
      const response = await fetch(
        'https://smarteducation-backend.herokuapp.com/api/aspirantes/all',
        requestOptions
      );

      const json = await response.json();

      this.setState({
        aspirantes: json.aspirantesdata,
      });
      setCurrentAspirantes(json.aspirantesdata);
    } catch (err) {}
  }

  formOnChange = async (e) => {
    this.setState({
      filtros: { ...this.state.filtros, [e.target.name]: e.target.value },
    });
  };

  formatedDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  render() {
    const { aspirantes, filtros } = this.state;
    const { gradosinteres = [] } = this.props.catalogos;

    let aspirantesFiltered = filtrarAspirantes(aspirantes, filtros);

    return (
      <div className="mx-auto">
        <MenuGeneral />{' '}
        <div className="cardsContainerProspects mx-auto mb-2 h-4/5  my-16  ">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gridGap: '15px',
            }}
            className="  mb-2 cardsContainerProspects-filters analyticsFilters"
          >
            <SmartInput
              title="Nombre"
              name="nombre"
              onChange={this.formOnChange}
              imageSrc={nombreMD}
              placeholder=""
              value={filtros.nombre || ''}
              isValid={true}
            />
            <SmartSelect
              title="Grado de Interés"
              name="grado_de_interes"
              imageSrc={origenDato}
              onChange={this.formOnChange}
              options={parseCat(gradosinteres, 'nombre', 'nombre')}
              value={filtros.grado_de_interes}
            />
            {/*<SmartSelect
              title="Fecha de Próximo Contacto"
              name="fechaProximoContacto"
              imageSrc={fechaMD}
              onChange={this.formOnChange}
              options={[
                { key: 0, value: 'Enero' },
                { key: 1, value: 'Febrero' },
                { key: 2, value: 'Marzo' },
                { key: 3, value: 'Abril' },
                { key: 4, value: 'Mayo' },
                { key: 5, value: 'Junio' },
                { key: 6, value: 'Julio' },
                { key: 7, value: 'Agosto' },
                { key: 8, value: 'Septiembre' },
                { key: 9, value: 'Octubre' },
                { key: 10, value: 'Noviembre' },
                { key: 11, value: 'Diciembre' },
              ]}
              value={filtros.fechaProximoContacto}
            />
          <DateRangeInput
              onSelect={(value, state) => {
                this.setState({
                  filtros: {
                    ...this.state.filtros,
                    fechaProximoContacto: value,
                  },
                });
              }}
              name={'fechaProximoContacto'}
              title="Fecha de próximo contacto"
              value={filtros.fechaProximoContacto}
            />*/}

            <SmartInput
              title="De: "
              name="startFechaProximoContacto"
              required={true}
              type="date"
              onChange={this.formOnChange}
              placeholder="Fecha de primer contacto"
              value={filtros.fechaProximoContacto}
              isValid={true}
            />
            <SmartInput
              title="A: "
              name="endFechaProximoContacto"
              required={true}
              type="date"
              onChange={this.formOnChange}
              placeholder="Fecha de primer contacto"
              value={filtros.fechaProximoContacto}
              isValid={true}
            />
          </div>
          <div className=" flex flex-row basis-4 flex-wrap justify-start">
            {aspirantesFiltered.map((a) => {
              return <FlipCard key={a.id} user={a} />;
            })}
          </div>
        </div>
        <div className="footerLogo">
          <div className="cssLogoSmartSm right-8"></div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth, catalogos }) => {
  return {
    auth: auth,
    catalogos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentAspirantes: (aspirantes) =>
      dispatch(setCurrentAspirantes(aspirantes)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Aspirantes);
