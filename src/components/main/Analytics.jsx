import React from 'react';
import MenuGeneral from './MenuGeneral';
import SmartSelect from '../ui/SmartSelect';
import { tabItemStyles } from '../ui/TabsAnalytics';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { connect } from 'react-redux';
import {
  parseCat,
  parseObjectDate,
  trasnformToSeries,
} from '../../helpers/utils';
import { fetchConToken } from '../../helpers/fetch';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

//rgba(223,32,39)
const Analytics = ({ catalogos }) => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <div className="container mx-auto">
      <MenuGeneral pageTitle={'Analíticos'} />
      <div
        className="analyticsOutsideContainer mx-auto mb-16 place-items-start content-start"
        style={{ marginTop: '10vh' }}
      >
        <div className="grid w-full tabsAnaliticos mt-4">
          <Box sx={{ width: '100%', typography: 'body', marginTop: 0 }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: '#EEEEEE' }}>
                <TabList onChange={handleChange}>
                  <Tab
                    value="1"
                    onChange={(e, index) => setTabIndex(index)}
                    label="Inscripciones"
                    aria-label="lab API tabs example"
                  />
                  <Tab label="Registros" value="2" />
                  <Tab label="Planteles" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Inscripciones catalogos={catalogos} />
              </TabPanel>
              <TabPanel value="2">
                <Registros catalogos={catalogos} />
              </TabPanel>
              <TabPanel value="3">
                <Planteles catalogos={catalogos} />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
        <div className="footerLogo">
          <div className="cssLogoSmartSm right-8"></div>
        </div>
      </div>
    </div>
  );
};

class Inscripciones extends React.Component {
  state = {
    filtros: {
      ciclo_escolar: '',
      modalidad: '',
    },
    charts: {},
  };

  formOnChange = async (e) => {
    this.setState(
      { filtros: { ...this.state.filtros, [e.target.name]: e.target.value } },
      async () => {
        await this.fetchAnalytics();
      }
    );
  };

  fetchAnalytics = async () => {
    const { ciclo_escolar, modalidad } = this.state.filtros;
    const { ciclosescolares } = this.props.catalogos;
    const selectedCiclo = ciclosescolares.filter((c) => c.id == ciclo_escolar);

    let id = '',
      inicio = '2022-01-01T13:59:45.000Z',
      fin = '2022-04-30T13:00:01.000Z';
    if (selectedCiclo.length > 0) {
      id = selectedCiclo[0].id;
      inicio = selectedCiclo[0].inicio;
      fin = selectedCiclo[0].fin;
    }

    const res = await (
      await fetchConToken(
        `analiticos/bar?ciclo_escolar=${id}&modalidad=${modalidad}`,
        null,
        'GET'
      )
    ).json();
    this.setState({ charts: { ...res.data.inscripciones } });
  };

  async componentDidMount() {
    await setTimeout(() => {}, 2000);
    const { ciclosescolares = [], modalidades = [] } = this.props.catalogos;
    this.setState(
      {
        filtros: {
          ...this.state.filtros,
          //ciclo_escolar: ciclosescolares[0].id,
          //modalidad: modalidades[0].idModalidad,
        },
      },
      async () => {
        await this.fetchAnalytics();
      }
    );
  }

  render() {
    const { catalogos } = this.props;
    const { modalidades = [], ciclosescolares = [] } = catalogos;
    const { filtros, charts } = this.state;

    return (
      <div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridGap: '15px',
          }}
          className="mb-8 analyticsFilters"
        >
          <SmartSelect
            title="Ciclo escolar"
            name="ciclo_escolar"
            options={parseCat(ciclosescolares, 'id', 'nombre')}
            onChange={this.formOnChange}
            value={filtros.ciclo_escolar}
          />

          <SmartSelect
            title="Modalidad"
            name="modalidad"
            onChange={this.formOnChange}
            options={parseCat(modalidades, 'idModalidad', 'nombreModalidad')}
            value={filtros.modalidad}
          />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gridGap: '15px',
          }}
          className="mb-8 analyticChartResp"
        >
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: 'bar',
              },
              title: {
                text: 'Inscritos vs Meta por Origen',
              },
              ...trasnformToSeries(charts.inscritosvsmetapororigen, [
                { name: 'Meta', key: 'meta', color: '#212121' },
                {
                  name: 'Inscritos',
                  key: 'progreso',
                  color: 'rgba(223,32,39)',
                },
              ]),
            }}
          />
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: 'column',
              },
              title: {
                text: 'Inscritos vs Meta por Plantel',
              },
              ...trasnformToSeries(charts.inscritosvsmetaporplantel, [
                { name: 'Meta', key: 'meta', color: '#212121' },
                {
                  name: 'Inscritos',
                  key: 'progreso',
                  color: 'rgba(223,32,39)',
                },
              ]),
            }}
          />
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: 'bar',
              },
              title: {
                text: 'Inscritos por Num toques',
              },
              ...trasnformToSeries(
                charts.promnumtoquesvsnuminscritosporplantel,
                [
                  {
                    name: 'Progreso',
                    key: 'progreso',
                    color: 'rgba(223,32,39)',
                  },
                  { name: '# Toques', key: 'toques', color: '#212121' },
                ]
              ),
            }}
          />
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: 'column',
              },
              title: {
                text: 'Inscritos vs Registros',
              },
              ...trasnformToSeries(charts.inscritosVSRegistros, [
                {
                  name: 'Inscritos',
                  key: 'inscritos',
                  color: 'rgba(223,32,39)',
                },
                { name: 'Registros', key: 'registros', color: '#212121' },
              ]),
            }}
          />
        </div>
      </div>
    );
  }
}

class Registros extends React.Component {
  state = {
    filtros: {
      ciclo_escolar: '',
      modalidad: '',
      grado_de_interes: '',
    },
    charts: {},
  };

  colors = {
    Cerrado: '#777777',
    Pendiente: '#0c82ed', //'#5528BF'
    Interesado: '#ffd503',
    'Inscrito Parcial': '#fca629',
    Inscrito: 'rgba(223,32,39)', //#7be500
  };

  fetchAnalytics = async () => {
    const { ciclo_escolar, modalidad, grado_de_interes } = this.state.filtros;
    const { ciclosescolares } = this.props.catalogos;
    const selectedCiclo = ciclosescolares.filter(
      (c) => c.id === parseInt(ciclo_escolar)
    );
    let id = '',
      inicio = '2022-01-01T13:59:45.000Z',
      fin = '2022-04-30T13:00:01.000Z';
    if (selectedCiclo.length > 0) {
      id = selectedCiclo[0].id;
      inicio = selectedCiclo[0].inicio;
      fin = selectedCiclo[0].fin;
    }
    const res = await (
      await fetchConToken(
        `analiticos/bar?modalidad=${modalidad}&grado_de_interes=${grado_de_interes}&ciclo_escolar=${id.toString()}`,
        null,
        'GET'
      )
    ).json();
    this.setState({ charts: { ...res.data.registros } });
  };

  formOnChange = async (e) => {
    this.setState(
      {
        filtros: {
          ...this.state.filtros,
          [e.target.name]: e.target.value,
        },
      },
      async () => {
        this.fetchAnalytics();
      }
    );
  };

  async componentDidMount() {
    const {
      ciclosescolares = [],
      modalidades = [],
      gradosinteres = [],
    } = this.props.catalogos;
    this.setState(
      {
        filtros: {
          ...this.state.filtros,
          // ciclo_escolar: ciclosescolares[0].id,
          // modalidad: modalidades[0].idModalidad,
          // grado_de_interes: gradosinteres[0].id,
        },
      },
      async () => {
        await this.fetchAnalytics();
      }
    );
  }

  render() {
    const { catalogos } = this.props;
    const {
      ciclosescolares = [],
      modalidades = [],
      gradosinteres = [],
    } = catalogos;
    const { charts, filtros } = this.state;
    const { registrosGradoDeInteres = [] } = charts;
    return (
      <div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridGap: '15px',
          }}
          className="mb-8 analyticsFilters"
        >
          <SmartSelect
            title="Ciclo escolar"
            name="ciclo_escolar"
            options={parseCat(ciclosescolares, 'id', 'nombre')}
            onChange={this.formOnChange}
            value={filtros.ciclo_escolar}
          />
          <SmartSelect
            title="Modalidad"
            name="modalidad"
            onChange={this.formOnChange}
            options={parseCat(modalidades, 'idModalidad', 'nombreModalidad')}
            value={filtros.modalidad}
          />
          <SmartSelect
            title="Grado de interés"
            name="grado_de_interes"
            onChange={this.formOnChange}
            options={parseCat(gradosinteres, 'id', 'nombre')}
            value={filtros.grado_de_interes}
          />
        </div>
        <div
          style={{ display: 'grid' }}
          className="mb-10 grid-cols-3 grid-rows-2 analyticGeneralContainer"
        >
          <div className="analyticContainer grid mx-2 my-4 p-2">
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: {
                  type: 'bar',
                },
                title: {
                  text: 'Registros vs Meta por Origen',
                },
                ...trasnformToSeries(charts.registrosvsmetapororigen, [
                  { name: 'Meta', key: 'meta', color: '#212121' },
                  {
                    name: 'Registros',
                    key: 'progreso',
                    color: 'rgb(59 130 246)',
                  },
                ]),
              }}
            />
          </div>
          <div className="analyticContainer grid mx-2 my-4 p-2">
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: {
                  type: 'bar',
                },
                title: {
                  text: 'Registros vs meta por plantel',
                },
                ...trasnformToSeries(charts.registrosvsmetaporplantel, [
                  { name: 'Meta', key: 'meta', color: '#212121' },
                  {
                    name: 'Registros',
                    key: 'progreso',
                    color: 'rgb(59 130 246)',
                  },
                ]),
              }}
            />
          </div>
          <div className="analyticContainer grid mx-2 my-4 p-2">
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: {
                  type: 'pie',
                },
                title: {
                  text: 'Registros por grado de interés',
                },
                series: [
                  {
                    name: 'Registros',
                    data: registrosGradoDeInteres.map((record) => {
                      if (record) {
                        return {
                          name: record.name,
                          y: record.registros,
                          color: this.colors[record.name],
                        };
                      }
                      return;
                    }),
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

class Planteles extends React.Component {
  state = {
    filtros: {
      ciclo_escolar: '',
      plantel: '',
      modalidad: '',
      grado_de_interes: '',
    },
    charts: {},
  };

  formOnChange = async (e) => {
    this.setState(
      { filtros: { ...this.state.filtros, [e.target.name]: e.target.value } },
      async () => {
        await this.fetchAnalytics();
      }
    );
  };

  fetchAnalytics = async () => {
    const { ciclo_escolar, plantel, modalidad, grado_de_interes } =
      this.state.filtros;
    const { ciclosescolares } = this.props.catalogos;
    const selectedCiclo = ciclosescolares.filter(
      (c) => c.id == parseInt(ciclo_escolar)
    );

    let id = '',
      inicio = '2022-01-01T13:59:45.000Z',
      fin = '2022-04-30T13:00:01.000Z';
    if (selectedCiclo.length > 0) {
      id = selectedCiclo[0].id;
      inicio = selectedCiclo[0].inicio;
      fin = selectedCiclo[0].fin;
    }
    const res = await (
      await fetchConToken(
        `analiticos/barplantel?plantel_id=${plantel}&modalidad=${modalidad}&grado_de_interes=${grado_de_interes}&ciclo_escolar=${id.toString()}`,
        null,
        'GET'
      )
    ).json();
    this.setState({ charts: { ...res.data } });
  };

  async componentDidMount() {
    const {
      ciclosescolares = [],
      planteles = [],
      modalidades = [],
      gradosinteres = [],
    } = this.props.catalogos;
    this.setState(
      {
        filtros: {
          ...this.state.filtros,
          // ciclo_escolar: ciclosescolares[0].id,
          // plantel: planteles[0].idPlantel,
          // modalidad: modalidades[0].idModalidad,
          // grado_de_interes: gradosinteres[0].id,
        },
      },
      async () => {
        await this.fetchAnalytics();
      }
    );
  }

  render() {
    const { catalogos } = this.props;
    const {
      planteles = [],
      modalidades = [],
      gradosinteres = [],
      ciclosescolares = [],
    } = catalogos;
    const { charts, filtros } = this.state;

    return (
      <>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gridGap: '15px',
          }}
          className="mb-8 analyticsFilters"
        >
          <SmartSelect
            title="Ciclo escolar"
            name="ciclo_escolar"
            options={parseCat(ciclosescolares, 'id', 'nombre')}
            onChange={this.formOnChange}
            value={filtros.ciclo_escolar}
          />
          <SmartSelect
            title="Plantel"
            name="plantel"
            onChange={this.formOnChange}
            options={parseCat(planteles, 'idPlantel', 'nombrePlantel')}
            value={filtros.plantel}
          />
          <SmartSelect
            title="Modalidad"
            name="modalidad"
            onChange={this.formOnChange}
            options={parseCat(modalidades, 'idModalidad', 'nombreModalidad')}
            value={filtros.modalidad}
          />
          <SmartSelect
            title="Grado de interés"
            name="grado_de_interes"
            onChange={this.formOnChange}
            options={parseCat(gradosinteres, 'id', 'nombre')}
            value={filtros.grado_de_interes}
          />
        </div>
        <div
          style={{ display: 'grid' }}
          className="mb-10 grid-cols-3 grid-rows-2 analyticGeneralContainer"
        >
          {/** 
          <div className="analyticContainer grid mx-2 my-4 p-2">
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: {
                  type: 'column',
                },
                title: {
                  text: 'Inscritos vs Meta por Usuario',
                },
                ...trasnformToSeries(charts.inscritosvsmetaporusuario, [
                  { name: 'Meta', key: 'meta' },
                  { name: 'Inscrtios', key: 'progreso' },
                ]),
              }}
            />
          </div>
          */}
          <div>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: {
                  type: 'column',
                },
                title: {
                  text: 'Inscritos vs Meta por Usuario',
                },
                ...trasnformToSeries(charts.inscritosvsmetaporusuario, [
                  { name: 'Meta', key: 'meta', color: '#212121' },
                  {
                    name: 'Inscritios',
                    key: 'progreso',
                    color: 'rgba(223,32,39)',
                  },
                ]),
              }}
            />
          </div>
          {/** 
          <div className="analyticContainer grid mx-2 my-4 p-2">
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: {
                  type: 'column',
                },
                title: {
                  text: 'Inscritos vs Meta por Origen de plantel',
                },
                ...trasnformToSeries(charts.inscritosvsmetapororigen, [
                  { name: 'Meta', key: 'meta' },
                  { name: 'Inscrtios', key: 'progreso' },
                ]),
              }}
            />
          </div>*/}
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: 'column',
              },
              title: {
                text: 'Inscritos vs Meta por Origen de plantel',
              },
              ...trasnformToSeries(charts.inscritosvsmetapororigen, [
                { name: 'Meta', key: 'meta', color: '#212121' },
                {
                  name: 'Inscrtios',
                  key: 'progreso',
                  color: 'rgba(223,32,39)',
                },
              ]),
            }}
          />
          {/*
          <div className="analyticContainer grid mx-2 my-4 p-2">
            
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: {
                  type: 'column',
                },
                title: {
                  text: 'Inscritos vs Meta por Origen de plantel',
                },
                ...trasnformToSeries(
                  charts.promnumtoquesvsnuminscritosporplantel,
                  [
                    { name: 'Progreso', key: 'progreso' },
                    { name: '# Toques', key: 'toques' },
                  ]
                ),
              }}
            />
            
          </div>*/}
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: 'column',
              },
              title: {
                text: 'Promedio número de toques vs inscritos por usuario',
              },
              ...trasnformToSeries(charts.promnumtoquesvsnuminscritosporuser, [
                {
                  name: 'Inscritos',
                  key: 'inscritos',
                  color: 'rgba(223,32,39)',
                },
                { name: 'Promedio toques', key: 'toques', color: '#212121' },
              ]),
            }}
          />
          {/* 
          <div className="analyticContainer grid mx-2 my-4 p-2">14</div>
          <div className="analyticContainer grid mx-2 my-4 p-2">15</div>
          */}
        </div>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              type: 'column',
            },
            title: {
              text: 'Inscritos vs Registros por Carrera',
            },
            ...trasnformToSeries(charts.inscritosVSRegistrosPorCarrera, [
              { name: 'Registros', key: 'registros', color: '#212121' },
              { name: 'Inscrtios', key: 'inscritos', color: 'rgba(223,32,39)' },
            ]),
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { catalogos: state.catalogos };
};

export default connect(mapStateToProps, {})(Analytics);
