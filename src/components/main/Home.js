import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import '../../App';
import './Home';
import '../../App.css';
import FlipCard from '../ui/FlipCard';
import FlipCardUser from '../ui/FlipCardUser';
import MenuGeneral from '../main/MenuGeneral';

import { setCurrentAspirantes } from './../../reducers/actions/aspirantes.actions';
import { setCurrentUsuarios } from './../../reducers/actions/usuarios.actions';
import { fetchConToken } from '../../helpers/fetch';
import { nombreMD, origenDato } from '../../helpers/formIcons';
import SmartInput from '../ui/SmartInput';
import SmartSelect from '../ui/SmartSelect';
import { parseCat } from '../../helpers/utils';
import { filtrarAspirantes } from '../../helpers/fiiltrarAspirantes';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.pageTitle = 'Home';
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
    const { setCurrentAspirantes, setCurrentUsuarios } = this.props;
    let users = [];
    const res = await (await fetchConToken('aspirantes/', null, 'GET')).json();

    if (this.props.auth.id_rol === 4 || this.props.auth.id_rol === 2) {
      users = await (
        await fetchConToken('user?roles=Basica&ciclo=4', null, 'GET')
      ).json();
    } else if (this.props.auth.id_rol === 1) {
      users = await (await fetchConToken('user?ciclo=4', null, 'GET')).json();
    }

    this.setState({
      usuarios: users.data.usuarios,
      aspirantes: res.data.aspirantes,
    });

    setCurrentUsuarios(users.data.usuarios);
    setCurrentAspirantes(
      res.data.aspirantes.map((a) => {
        a.fecha_proximo_contacto = moment(a.fecha_proximo_contacto);
        a.fecha_primer_contacto = moment(a.fecha_primer_contacto);
        a.fecha_ultimo_contacto = moment(a.fecha_primer_contacto);
        a.createdAt = moment(a.createdAt);
        a.updatedAt = moment(a.updatedAt);
        return a;
      })
    );
  }

  formOnChange = async (e) => {
    this.setState({
      filtros: { ...this.state.filtros, [e.target.name]: e.target.value },
    });
  };

  render() {
    const { auth, catalogos } = this.props;
    const { gradosinteres } = catalogos;
    const { aspirantes, usuarios, filtros } = this.state;

    return (
      <div className="mx-auto">
        <MenuGeneral pageTitle={this.pageTitle} />
        {auth.id_rol === 4 || auth.id_rol === 1 || auth.id_rol === 2 ? (
          <div className="cardsContainer mx-auto h-4/5 my-16 flex flex-row basis-4 flex-wrap justify-start">
            {usuarios?.map((u) => (
              <FlipCardUser key={u.id} user={u} />
            ))}
          </div>
        ) : (
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
              {filtrarAspirantes(aspirantes, filtros).map((a) => {
                return <FlipCard key={a.id} user={a} />;
              })}
            </div>
          </div>
        )}
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
    catalogos: catalogos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentAspirantes: (aspirantes) =>
      dispatch(setCurrentAspirantes(aspirantes)),
    setCurrentUsuarios: (usuarios) => dispatch(setCurrentUsuarios(usuarios)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
